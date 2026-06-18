"""Upsert student memory to database."""

import json

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.memory import StudentMemory

logger = structlog.get_logger(__name__)


async def upsert_memory(student_id: str, summary: dict, db: AsyncSession) -> None:
    """
    Create or update student memory record.

    Args:
        student_id: Student UUID.
        summary: Memory summary dict to store.
        db: Async database session.
    """
    try:
        result = await db.execute(
            select(StudentMemory).where(StudentMemory.student_id == student_id)
        )
        existing = result.scalar_one_or_none()

        summary_json = json.dumps(summary, ensure_ascii=False)

        if existing:
            existing.summary_json = summary_json
            logger.info("memory.updated", student_id=student_id)
        else:
            new_memory = StudentMemory(
                student_id=student_id,
                summary_json=summary_json,
            )
            db.add(new_memory)
            logger.info("memory.created", student_id=student_id)

        await db.commit()

    except Exception as e:
        await db.rollback()
        logger.error("memory.upsert_error", student_id=student_id, error=str(e))
        raise
