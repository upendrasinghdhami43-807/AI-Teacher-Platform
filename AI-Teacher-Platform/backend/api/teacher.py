"""Teacher API endpoints — lesson start, history, memory, grades."""

import json
import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ai_engine.grade.levels import GradeLevel
from ai_engine.grade.registry import GRADE_REGISTRY
from ai_engine.memory.retriever import retrieve_memory
from ai_engine.memory.summarizer import summarize_session
from ai_engine.memory.updater import upsert_memory
from database.connection import get_db
from middleware.auth import get_current_student
from models.lesson import LectureHistory, LessonSession
from models.student import Student
from schemas.teacher import (
    GradeInfo,
    MemoryUpdateRequest,
    SessionResponse,
    StartLessonRequest,
    StartLessonResponse,
)

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.post("/start", response_model=StartLessonResponse, status_code=201)
async def start_lesson(
    req: StartLessonRequest,
    student: Student = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    """Create a lesson session and return session_id for WebSocket connection."""
    # Validate grade
    try:
        GradeLevel(req.grade)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid grade: {req.grade}",
        )

    # Validate language
    if req.language not in ("en", "ne", "hi", "ne_en"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid language: {req.language}",
        )

    # Create session
    session_id = str(uuid.uuid4())
    session = LessonSession(
        id=session_id,
        student_id=student.id,
        topic=req.topic,
        grade=req.grade,
        language=req.language,
        level=req.level,
    )
    db.add(session)
    await db.commit()

    return StartLessonResponse(
        session_id=session_id,
        websocket_url=f"/ws/classroom/{session_id}",
    )


@router.get("/session/{session_id}", response_model=SessionResponse)
async def get_session(
    session_id: str,
    student: Student = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    """Get lesson session status and metadata."""
    result = await db.execute(
        select(LessonSession).where(LessonSession.id == session_id)
    )
    session = result.scalar_one_or_none()

    if session is None:
        raise HTTPException(status_code=404, detail="Session not found")

    return SessionResponse(
        session_id=session.id,
        topic=session.topic,
        grade=session.grade,
        language=session.language,
        level=session.level,
        status=session.status,
        created_at=session.created_at.isoformat(),
        duration_seconds=session.duration_seconds,
        completion_percent=session.completion_percent,
    )


@router.get("/history")
async def get_history(
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=10, ge=1, le=50),
    student: Student = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    """Get paginated lecture history for the authenticated student."""
    # Count total
    count_result = await db.execute(
        select(func.count(LectureHistory.id)).where(
            LectureHistory.student_id == student.id
        )
    )
    total = count_result.scalar() or 0

    # Fetch page
    offset = (page - 1) * per_page
    result = await db.execute(
        select(LectureHistory)
        .where(LectureHistory.student_id == student.id)
        .order_by(LectureHistory.created_at.desc())
        .offset(offset)
        .limit(per_page)
    )
    items = result.scalars().all()

    return {
        "items": [
            {
                "session_id": item.session_id,
                "topic": item.topic,
                "grade": item.grade,
                "created_at": item.created_at.isoformat(),
            }
            for item in items
        ],
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": (total + per_page - 1) // per_page,
    }


@router.get("/replay/{session_id}")
async def replay_lesson(
    session_id: str,
    student: Student = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    """Return stored lesson data for replay — zero LLM cost."""
    result = await db.execute(
        select(LectureHistory).where(LectureHistory.session_id == session_id)
    )
    history = result.scalar_one_or_none()

    if history is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    return {
        "session_id": history.session_id,
        "topic": history.topic,
        "grade": history.grade,
        "lesson_plan": history.lesson_plan_json,
        "scripts": history.script_json,
        "boards": history.board_json,
        "audio_urls": history.audio_urls,
    }


@router.post("/memory/update")
async def update_memory(
    req: MemoryUpdateRequest,
    background_tasks: BackgroundTasks,
    student: Student = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    """Trigger background memory summarization after session."""
    # Get session data
    result = await db.execute(
        select(LessonSession).where(LessonSession.id == req.session_id)
    )
    session = result.scalar_one_or_none()

    if session is None:
        raise HTTPException(status_code=404, detail="Session not found")

    # Queue background task
    background_tasks.add_task(
        _update_memory_bg,
        student_id=student.id,
        session_data={
            "topic": session.topic,
            "grade": session.grade,
            "language": session.language,
            "level": session.level,
            "question_count": session.question_count,
            "duration_minutes": session.duration_seconds / 60,
            "completion_percent": session.completion_percent,
            "student_id": student.id,
        },
    )

    return {"status": "memory update queued"}


@router.get("/memory")
async def get_memory(
    student: Student = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
):
    """Get current student memory summary."""
    memory = await retrieve_memory(student.id, db)
    return memory if memory else {}


@router.get("/grades")
async def get_grades():
    """Return all grade levels for frontend selector dropdowns. No auth required."""
    grades = []
    for grade_level, ctx in GRADE_REGISTRY.items():
        grades.append(
            GradeInfo(
                value=grade_level.value,
                label=ctx.display_name,
                tier=ctx.tier,
                exam_board=ctx.exam_board,
                subjects=ctx.subjects_available,
            ).model_dump()
        )
    return grades


async def _update_memory_bg(student_id: str, session_data: dict):
    """Background task: summarize session and update memory."""
    from database.connection import async_session_factory

    async with async_session_factory() as db:
        try:
            current_memory = await retrieve_memory(student_id, db)
            updated = await summarize_session(current_memory, session_data)
            await upsert_memory(student_id, updated, db)
        except Exception as e:
            import structlog
            logger = structlog.get_logger(__name__)
            logger.error("memory_bg.error", student_id=student_id, error=str(e))
