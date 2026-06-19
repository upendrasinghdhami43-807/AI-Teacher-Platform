"""Student ORM model."""

import uuid

from sqlalchemy import Enum, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from models.base import Base, TimestampMixin


class Student(Base, TimestampMixin):
    """Student user account."""

    __tablename__ = "students"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    grade: Mapped[str | None] = mapped_column(String(50), nullable=True)
    school: Mapped[str | None] = mapped_column(String(255), nullable=True)
    plan: Mapped[str] = mapped_column(
        Enum("free", "basic", "pro", name="student_plan"),
        default="free",
        server_default="free",
    )
    status: Mapped[str] = mapped_column(
        Enum("active", "inactive", "suspended", name="student_status"),
        default="active",
        server_default="active",
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")
