"""Teacher API request/response schemas."""

from typing import Optional

from pydantic import BaseModel, Field


class StartLessonRequest(BaseModel):
    topic: str = Field(min_length=1, max_length=500)
    grade: str = Field(default="class_11_science")
    language: str = Field(default="ne_en", pattern="^(en|ne|hi|ne_en)$")
    level: str = Field(default="recommended", pattern="^(basic|medium|advanced|recommended)$")


class StartLessonResponse(BaseModel):
    session_id: str
    websocket_url: str
    status: str = "ready"


class SessionResponse(BaseModel):
    session_id: str
    topic: str
    grade: Optional[str] = None
    language: str
    level: str
    status: str
    created_at: str
    duration_seconds: int = 0
    completion_percent: int = 0


class MemoryUpdateRequest(BaseModel):
    session_id: str
    feedback_score: Optional[int] = Field(default=None, ge=1, le=5)


class GradeInfo(BaseModel):
    value: str
    label: str
    tier: str
    exam_board: str
    subjects: list[str]
