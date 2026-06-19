"""Student memory ORM model — stores compressed AI memory as JSON text."""

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base, TimestampMixin


class StudentMemory(Base, TimestampMixin):
    """
    Compressed student learning memory.
    Stored as Text (not JSON column) for maximum DB portability.
    Contains: weak_topics, strong_topics, last_topics, recommended_level, etc.
    """

    __tablename__ = "student_memory"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("students.id", ondelete="CASCADE"),
        unique=True,
        index=True,
    )
    summary_json: Mapped[str] = mapped_column(Text, default="{}", server_default="{}")
