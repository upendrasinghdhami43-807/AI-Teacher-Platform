"""
AI Teacher Orchestrator — Master Coordinator.

Runs the full AI pipeline as an AsyncGenerator yielding WebSocket events.
All modules are coordinated through this class — no module calls another directly.

Architecture:
  Memory → Director → [per section: Script → (Board + Voice parallel)] → Save
"""

import asyncio
import time
from typing import AsyncGenerator, Optional

import structlog
from sqlalchemy.ext.asyncio import AsyncSession

from ai_engine.board.mapper import BoardMapperAI
from ai_engine.director.planner import DirectorAI
from ai_engine.director.schemas import LessonPlan
from ai_engine.grade.complexity import get_grade_prompt_context
from ai_engine.grade.levels import GradeLevel
from ai_engine.memory.retriever import retrieve_memory
from ai_engine.memory.summarizer import summarize_session
from ai_engine.memory.updater import upsert_memory
from ai_engine.script.generator import ScriptWriterAI
from ai_engine.voice.tts import VoiceEngine
from config import settings
from services.ai_provider import get_ai_provider
from services.cache import CacheService
from services.storage import StorageService

logger = structlog.get_logger(__name__)


class AITeacherOrchestrator:
    """
    Master coordinator for the AI teaching pipeline.

    Streams sections as they generate — Section 1 starts playing
    while Section 2 is still generating.
    """

    def __init__(self, cache: CacheService, storage: StorageService):
        self._director = DirectorAI(cache)
        self._script_writer = ScriptWriterAI()
        self._board_mapper = BoardMapperAI()
        self._voice_engine = VoiceEngine(storage)
        self._cache = cache
        self._storage = storage

    async def run(
        self,
        session_id: str,
        student_id: str,
        topic: str,
        grade: GradeLevel,
        language: str,
        level: str,
        db_session: AsyncSession,
        # STAGE 3: PDF teaching
        source_type: Optional[str] = None,
        uploaded_file_url: Optional[str] = None,
    ) -> AsyncGenerator[dict, None]:
        """
        Execute the full AI teaching pipeline.

        Yields WebSocket events as each stage completes.
        Section 1 audio starts playing while Section 2 generates.
        """
        start_time = time.time()
        section_results = []

        try:
            # STEP 1: Retrieve student memory
            memory = await retrieve_memory(student_id, db_session)

            # STEP 2: Resolve level ("recommended" → actual from memory)
            resolved_level = level
            if level == "recommended":
                resolved_level = memory.get("recommended_level", "medium")

            # STEP 3: Director plans the lesson
            plan: LessonPlan = await self._director.plan(
                topic=topic,
                grade=grade,
                language=language,
                level=resolved_level,
                student_memory=memory if memory else None,
            )

            # STEP 4: Yield LessonStartEvent
            yield {
                "event": "lesson_start",
                "session_id": session_id,
                "lesson_title": plan.lesson_title,
                "total_sections": plan.total_sections,
                "estimated_seconds": plan.estimated_total_seconds,
                "grade": plan.grade,
                "language": plan.language,
                "level": plan.level,
                "prerequisite_note": plan.prerequisite_note,
                "exam_relevance": plan.exam_relevance,
            }

            # STEP 5: Process each section
            for section in plan.sections:
                # 5a: Yield SectionStartEvent
                yield {
                    "event": "section_start",
                    "session_id": session_id,
                    "section_id": section.section_id,
                    "section_title": section.title,
                    "section_type": section.section_type.value,
                    "total_sections": plan.total_sections,
                }

                # 5b: Generate script
                script = await self._script_writer.generate(
                    section=section,
                    topic=topic,
                    grade=grade,
                    language=language,
                    level=resolved_level,
                )

                # 5c: Board + Voice in PARALLEL
                board_task = self._board_mapper.map(script)
                voice_task = self._voice_engine.synthesize_section(
                    segments=script.voice_segments,
                    language=language,
                    section_id=section.section_id,
                    session_id=session_id,
                )
                board_actions, audio_url = await asyncio.gather(
                    board_task, voice_task
                )

                # 5d: Yield BoardUpdateEvent
                yield {
                    "event": "board_update",
                    "session_id": session_id,
                    "section_id": section.section_id,
                    "board_actions": board_actions.model_dump(),
                    "clear_before": board_actions.clear_before,
                }

                # 5e: Yield VoiceReadyEvent
                voice_segments_data = [vs.model_dump() for vs in script.voice_segments]
                duration_seconds = script.estimated_duration_seconds
                yield {
                    "event": "voice_ready",
                    "session_id": session_id,
                    "section_id": section.section_id,
                    "audio_url": audio_url,
                    "duration_seconds": duration_seconds,
                    "voice_segments": voice_segments_data,
                }

                # 5f: Yield TeacherSpeakingEvent
                caption_segments = [
                    {"text": vs.text, "lang": vs.lang}
                    for vs in script.voice_segments
                ]
                yield {
                    "event": "teacher_speaking",
                    "session_id": session_id,
                    "section_id": section.section_id,
                    "caption_segments": caption_segments,
                }

                # 5g: Collect results for replay storage
                section_results.append({
                    "section_id": section.section_id,
                    "script": script.model_dump(),
                    "board": board_actions.model_dump(),
                    "audio_url": audio_url,
                })

                # 5h: Yield to event loop
                await asyncio.sleep(0)

            # STEP 6: Yield LessonCompleteEvent
            total_duration = int(time.time() - start_time)
            yield {
                "event": "lesson_complete",
                "session_id": session_id,
                "total_sections": plan.total_sections,
                "total_duration_seconds": total_duration,
                "lesson_cache_key": plan.cache_key,
            }

            # STEP 7: Save lesson async (non-blocking)
            asyncio.create_task(
                self._save_lesson_async(
                    session_id=session_id,
                    student_id=student_id,
                    topic=topic,
                    grade=grade.value,
                    plan=plan,
                    section_results=section_results,
                    duration_seconds=total_duration,
                    db_session=db_session,
                )
            )

        except Exception as e:
            logger.error(
                "orchestrator.pipeline_error",
                session_id=session_id,
                error=str(e),
            )
            yield {
                "event": "error",
                "session_id": session_id,
                "error_code": "GENERATION_ERROR",
                "message": "Lesson generation encountered an error. Please try again.",
                "details": str(e) if settings.DEBUG else "",
            }

    async def handle_question(
        self,
        session_id: str,
        lesson_id: str,
        question: str,
        current_section: str,
        lesson_context: dict,
        db_session: AsyncSession,
    ) -> AsyncGenerator[dict, None]:
        """
        Handle a mid-lesson student question.
        Short Q&A pipeline — does NOT restart lesson.
        """
        try:
            grade = lesson_context.get("grade", "class_11_science")
            language = lesson_context.get("language", "ne_en")
            topic = lesson_context.get("topic", "")

            grade_context = get_grade_prompt_context(
                GradeLevel(grade) if grade else GradeLevel.CLASS_11_SCIENCE,
                topic,
            )

            system_prompt = f"""You are an AI Teacher answering a student's mid-lesson question.
{grade_context}

Answer concisely in {language}. Include:
- A clear answer in the student's language
- A brief board text (English) for whiteboard display
- A one-sentence resume message to transition back to the lesson

Output ONLY valid JSON:
{{
  "answer_voice": "spoken answer in student's language",
  "answer_board": "short English text for whiteboard",
  "resume_message": "Let's continue with..."
}}"""

            user_prompt = f"""Topic: {topic}
Current Section: {current_section}
Student's Question: {question}

Answer the question and help the student understand."""

            provider = get_ai_provider(settings.AI_PRIMARY_PROVIDER)
            result = await provider.complete_json(
                system_prompt=system_prompt,
                user_prompt=user_prompt,
                model=settings.GEMINI_QUESTION_MODEL,
                max_tokens=400,
                temperature=0.5,
            )

            # Create board action for the answer
            board_action = {
                "action_id": 99,
                "type": "write_text",
                "text": f"Q: {result.get('answer_board', question)}",
                "font_size": 20,
                "color": "#F59E0B",
                "position": {"x": 50, "y": 620},
                "animation": "fade_in",
                "delay_ms": 0,
                "duration_ms": 500,
            }

            # Synthesize answer voice
            from ai_engine.script.schemas import VoiceSegment

            answer_segments = [
                VoiceSegment(
                    lang="ne" if language in ("ne", "ne_en") else "en",
                    text=result.get("answer_voice", ""),
                    pause_after_ms=300,
                )
            ]
            audio_url = await self._voice_engine.synthesize_section(
                segments=answer_segments,
                language=language,
                section_id=99,
                session_id=session_id,
            )

            yield {
                "event": "question_answer",
                "session_id": session_id,
                "answer": result.get("answer_voice", ""),
                "board_action": board_action,
                "audio_url": audio_url,
                "resume_message": result.get("resume_message", "Let's continue..."),
            }

        except Exception as e:
            logger.error("orchestrator.question_error", error=str(e))
            yield {
                "event": "error",
                "session_id": session_id,
                "error_code": "GENERATION_ERROR",
                "message": "Failed to answer question. Please try again.",
                "details": str(e) if settings.DEBUG else "",
            }

    async def _save_lesson_async(
        self,
        session_id: str,
        student_id: str,
        topic: str,
        grade: str,
        plan: LessonPlan,
        section_results: list[dict],
        duration_seconds: int,
        db_session: AsyncSession,
    ):
        """Background task: save lesson data for replay. Non-blocking."""
        try:
            from models.lesson import LectureHistory, LessonSession
            from sqlalchemy import select

            # Update session status
            result = await db_session.execute(
                select(LessonSession).where(LessonSession.id == session_id)
            )
            session = result.scalar_one_or_none()
            if session:
                session.status = "completed"
                session.duration_seconds = duration_seconds
                session.completion_percent = 100
                session.lesson_plan_json = plan.model_dump()

            # Save lecture history for replay
            scripts = [sr["script"] for sr in section_results]
            boards = [sr["board"] for sr in section_results]
            audio_urls = {
                str(sr["section_id"]): sr["audio_url"]
                for sr in section_results
            }

            history = LectureHistory(
                session_id=session_id,
                student_id=student_id,
                topic=topic,
                grade=grade,
                script_json=scripts,
                board_json=boards,
                audio_urls=audio_urls,
                lesson_plan_json=plan.model_dump(),
            )
            db_session.add(history)
            await db_session.commit()

            logger.info("orchestrator.lesson_saved", session_id=session_id)

        except Exception as e:
            logger.error(
                "orchestrator.save_error",
                session_id=session_id,
                error=str(e),
            )
