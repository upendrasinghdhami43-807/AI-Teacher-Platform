"""Voice Engine schemas."""

from pydantic import BaseModel


class VoiceResult(BaseModel):
    """Result from voice synthesis."""
    audio_url: str | None = None
    duration_seconds: float = 0.0
    error: str | None = None
