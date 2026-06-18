"""Script Writer AI schemas — board content and voice segments."""

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class BoardContentType(str, Enum):
    """Types of board content."""
    TITLE = "title"
    BODY = "body"
    FORMULA = "formula"
    EXAMPLE = "example"
    LIST = "list"
    DIAGRAM = "diagram"
    HIGHLIGHT = "highlight"


class BoardContent(BaseModel):
    """Content item for the whiteboard — always in English."""
    type: BoardContentType
    text: str
    sub_items: list[str] = Field(default_factory=list)
    formula_latex: str = ""


class VoiceSegment(BaseModel):
    """A segment of teacher speech with language tag for TTS routing."""
    lang: str  # "en" | "ne" | "hi" — per segment for TTS routing
    text: str
    pause_after_ms: int = 200


class ScriptSection(BaseModel):
    """Complete script for one lesson section."""
    section_id: int
    section_title: str
    board_content: list[BoardContent]
    voice_segments: list[VoiceSegment]
    estimated_duration_seconds: int
    key_concept: str  # One-sentence summary
