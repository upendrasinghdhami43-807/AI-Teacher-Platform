"""Board Mapper AI schemas — whiteboard action instructions."""

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class BoardActionType(str, Enum):
    """Types of whiteboard actions."""
    WRITE_TITLE = "write_title"
    WRITE_TEXT = "write_text"
    WRITE_FORMULA = "write_formula"
    DRAW_LINE = "draw_line"
    DRAW_ARROW = "draw_arrow"
    DRAW_CIRCLE = "draw_circle"
    DRAW_RECT = "draw_rect"
    DRAW_DIAGRAM = "draw_diagram"
    HIGHLIGHT = "highlight"
    UNDERLINE = "underline"
    ERASE_AREA = "erase_area"
    CLEAR_ALL = "clear_all"


class Position(BaseModel):
    """Board coordinate (0-1200 x, 0-750 y)."""
    x: int = Field(ge=0, le=1200)
    y: int = Field(ge=0, le=750)


class Size(BaseModel):
    """Dimension for shapes and areas."""
    w: int = Field(ge=0, le=1200)
    h: int = Field(ge=0, le=750)


class BoardAction(BaseModel):
    """A single whiteboard instruction for the frontend to execute."""
    action_id: int
    type: BoardActionType
    text: Optional[str] = None
    font_size: Optional[int] = 24
    font_weight: Optional[str] = "normal"
    color: Optional[str] = "#F1F5F9"
    latex: Optional[str] = None
    position: Optional[Position] = None
    size: Optional[Size] = None
    from_pos: Optional[Position] = None  # For arrows/lines
    to_pos: Optional[Position] = None
    label: Optional[str] = None
    diagram_type: Optional[str] = None  # "force_diagram" | "circuit" | "graph" | "table"
    diagram_data: Optional[dict] = None
    animation: str = "write_in"  # "write_in" | "fade_in" | "draw_in" | "instant"
    delay_ms: int = 0
    duration_ms: int = 500


class SectionBoardActions(BaseModel):
    """All board actions for one lesson section."""
    section_id: int
    clear_before: bool = True
    actions: list[BoardAction]
    estimated_animation_ms: int = 0
