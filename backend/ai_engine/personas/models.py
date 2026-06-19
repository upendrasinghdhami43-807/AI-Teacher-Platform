"""Teacher Persona data models."""

from typing import Optional
from pydantic import BaseModel


class LockedConfig(BaseModel):
    """Fixed configuration for locked personas."""
    language: str = "ne_en"
    level: str = "recommended"


class TeacherPersona(BaseModel):
    """A teacher persona profile."""
    id: str
    name: str
    tagline: str
    is_locked: bool = False
    locked_config: Optional[LockedConfig] = None
    style_prompt_key: Optional[str] = None
    voice_id: Optional[str] = None
    active: bool = True
    badge_text: Optional[str] = None
