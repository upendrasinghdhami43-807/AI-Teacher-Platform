"""Lesson session, AI message, and lecture history ORM models."""

import uuid

from sqlalchemy import Enum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base, TimestampMixin


class LessonSession(Base, TimestampMixin):
    """A single AI teacher lesson session."""

    __tablename__ = "lesson_sessions"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    student_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("students.id", ondelete="SET NULL"), nullable=True
    )
    topic: Mapped[str] = mapped_column(String(1000))
    grade: Mapped[str | None] = mapped_column(String(50), nullable=True)
    language: Mapped[str] = mapped_column(String(10), default="ne_en")
    level: Mapped[str] = mapped_column(String(20), default="medium")
    status: Mapped[str] = mapped_column(
        Enum("started", "completed", "abandoned", name="session_status"),
        default="started",
        server_default="started",
    )
    lesson_plan_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    question_count: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    duration_seconds: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    completion_percent: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    cache_key: Mapped[str | None] = mapped_column(
        String(500), nullable=True, index=True
    )
    total_prompt_tokens: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    total_completion_tokens: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    estimated_cost_usd: Mapped[float] = mapped_column(Float, default=0.0, server_default="0.0")


class AIMessage(Base, TimestampMixin):
    """A single message in a lesson chat session."""

    __tablename__ = "ai_messages"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    session_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("lesson_sessions.id", ondelete="CASCADE")
    )
    role: Mapped[str] = mapped_column(
        Enum("user", "assistant", name="message_role")
    )
    message: Mapped[str] = mapped_column(Text)
    metadata_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)


class LectureHistory(Base, TimestampMixin):
    """Stored lesson data for replay (no LLM cost on replay)."""

    __tablename__ = "lecture_history"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    session_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("lesson_sessions.id"), unique=True
    )
    student_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("students.id", ondelete="SET NULL"), nullable=True
    )
    topic: Mapped[str] = mapped_column(String(1000))
    grade: Mapped[str | None] = mapped_column(String(50), nullable=True)
    script_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    board_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    audio_urls: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    lesson_plan_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
