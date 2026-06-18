"""Student Memory schemas."""

from pydantic import BaseModel, Field


class StudentMemorySummary(BaseModel):
    """Compressed student learning memory — ~200 tokens max."""
    student_id: str = ""
    preferred_language: str = "ne_en"
    last_grade: str = "class_11_science"
    last_level: str = "medium"
    weak_topics: list[str] = Field(default_factory=list, max_length=10)
    strong_topics: list[str] = Field(default_factory=list, max_length=10)
    last_topics: list[str] = Field(default_factory=list, max_length=5)
    learning_style_note: str = ""
    avg_questions_per_session: float = 0.0
    prefers_visual: bool = False
    total_sessions: int = 0
    avg_session_duration_min: float = 0.0
    recommended_level: str = "medium"
    recommended_next_topics: list[str] = Field(default_factory=list)
