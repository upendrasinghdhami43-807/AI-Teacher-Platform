"""WebSocket event dataclasses — all 8 event types."""

import time
from dataclasses import asdict, dataclass, field
from typing import Optional


@dataclass
class BaseEvent:
    event: str
    session_id: str

    def to_ws_dict(self) -> dict:
        return asdict(self)


@dataclass
class LessonStartEvent(BaseEvent):
    event: str = "lesson_start"
    lesson_title: str = ""
    total_sections: int = 0
    estimated_seconds: int = 0
    grade: str = ""
    language: str = ""
    level: str = ""
    prerequisite_note: str = ""
    exam_relevance: str = ""


@dataclass
class SectionStartEvent(BaseEvent):
    event: str = "section_start"
    section_id: int = 0
    section_title: str = ""
    section_type: str = ""
    total_sections: int = 0


@dataclass
class BoardUpdateEvent(BaseEvent):
    event: str = "board_update"
    section_id: int = 0
    board_actions: dict = field(default_factory=dict)
    clear_before: bool = True


@dataclass
class VoiceReadyEvent(BaseEvent):
    event: str = "voice_ready"
    section_id: int = 0
    audio_url: Optional[str] = None
    duration_seconds: float = 0.0
    voice_segments: list = field(default_factory=list)


@dataclass
class TeacherSpeakingEvent(BaseEvent):
    event: str = "teacher_speaking"
    section_id: int = 0
    caption_segments: list = field(default_factory=list)


@dataclass
class QuestionAnswerEvent(BaseEvent):
    event: str = "question_answer"
    answer: str = ""
    board_action: dict = field(default_factory=dict)
    audio_url: Optional[str] = None
    resume_message: str = ""


@dataclass
class LessonCompleteEvent(BaseEvent):
    event: str = "lesson_complete"
    total_sections: int = 0
    total_duration_seconds: int = 0
    lesson_cache_key: str = ""


@dataclass
class ErrorEvent(BaseEvent):
    event: str = "error"
    error_code: str = ""
    message: str = ""
    details: str = ""


@dataclass
class HeartbeatEvent(BaseEvent):
    event: str = "heartbeat"
    timestamp: float = field(default_factory=time.time)
