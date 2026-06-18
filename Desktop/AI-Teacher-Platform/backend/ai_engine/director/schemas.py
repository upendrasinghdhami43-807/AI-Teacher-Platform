"""Director AI schemas — Lesson planning structures."""

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class SectionType(str, Enum):
    """Types of lesson sections."""
    INTRODUCTION = "introduction"
    CONCEPT = "concept"
    DERIVATION = "derivation"
    EXAMPLE = "example"
    VISUAL = "visual"
    PRACTICE = "practice"
    SUMMARY = "summary"


class LessonSection(BaseModel):
    """A single section in a lesson plan."""
    section_id: int
    title: str
    section_type: SectionType
    duration_seconds: int = Field(ge=15, le=180)
    key_points: list[str] = Field(min_length=1, max_length=6)
    board_hint: str
    voice_hint: str
    include_formula: bool = False
    formula_hint: str = ""


class LessonPlan(BaseModel):
    """Complete lesson plan produced by the Director AI."""
    lesson_title: str
    topic: str
    grade: str
    language: str
    level: str
    estimated_total_seconds: int
    total_sections: int
    sections: list[LessonSection]
    prerequisite_note: str = ""
    exam_relevance: str = ""
    cache_key: str = ""
