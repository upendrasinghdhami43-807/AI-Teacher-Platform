"""
ScriptWriterAI — generates board content + voice script per section.
Uses the highest quality model (GEMINI_SCRIPT_MODEL) for natural speech.
"""

from typing import Optional

import structlog

from ai_engine.director.schemas import LessonSection
from ai_engine.grade.complexity import get_grade_prompt_context
from ai_engine.grade.levels import GradeLevel
from ai_engine.script.prompts import build_script_user_prompt, get_script_system_prompt
from ai_engine.script.schemas import ScriptSection
from config import settings
from services.ai_provider import get_ai_provider

logger = structlog.get_logger(__name__)


class ScriptWriterAI:
    """Generates board content and voice scripts for each lesson section."""

    async def generate(
        self,
        section: LessonSection,
        topic: str,
        grade: GradeLevel,
        language: str,
        level: str,
        # STAGE 5: Persona style injection
        style_prompt: Optional[str] = None,
    ) -> ScriptSection:
        """
        Generate a complete script for one lesson section.

        Produces:
        1. Board content (always English)
        2. Voice segments (in student's language with lang tags for TTS)
        """
        # Build grade context
        grade_context = get_grade_prompt_context(grade, topic)

        # Build prompts
        system_prompt = get_script_system_prompt(language)

        # Stage 5: Inject persona style before grade context
        if style_prompt:
            system_prompt = f"{style_prompt}\n\n{system_prompt}"

        user_prompt = build_script_user_prompt(
            section=section.model_dump(),
            topic=topic,
            grade_context=grade_context,
            language=language,
            level=level,
        )

        # Call AI with higher temperature for natural speech
        provider = get_ai_provider(settings.AI_PRIMARY_PROVIDER)
        result = await provider.complete_json(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            model=settings.GEMINI_SCRIPT_MODEL,
            max_tokens=settings.MAX_LESSON_TOKENS_OUTPUT,
            temperature=0.7,  # Slightly creative for natural speech
        )

        # Ensure section_id matches
        result["section_id"] = section.section_id
        result["section_title"] = section.title

        # Validate with Pydantic
        script = ScriptSection(**result)

        logger.info(
            "script.generated",
            section_id=section.section_id,
            title=section.title,
            board_items=len(script.board_content),
            voice_segments=len(script.voice_segments),
        )

        return script
