"""Retrieve student memory from database."""

import json

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.memory import StudentMemory

logger = structlog.get_logger(__name__)


async def retrieve_memory(student_id: str, db: AsyncSession) -> dict:
    """
    Fetch student memory from the database.

    Returns empty dict if student has no memory record.
    """
    try:
        result = await db.execute(
            select(StudentMemory).where(StudentMemory.student_id == student_id)
        )
        memory = result.scalar_one_or_none()

        if memory is None:
            logger.debug("memory.not_found", student_id=student_id)
            return {}

        summary = json.loads(memory.summary_json) if memory.summary_json else {}
        logger.debug(
            "memory.retrieved",
            student_id=student_id,
            topics_count=len(summary.get("last_topics", [])),
        )
        return summary

    except Exception as e:
        logger.warning("memory.retrieve_error", student_id=student_id, error=str(e))
        return {}
