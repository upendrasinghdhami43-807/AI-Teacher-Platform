"""GradeContext dataclass — rich curriculum metadata per grade level."""

from dataclasses import dataclass, field

from ai_engine.grade.levels import GradeLevel


@dataclass(frozen=True)
class GradeContext:
    """Full curriculum context for a single grade level.

    Injected into every AI prompt to calibrate vocabulary, depth,
    formula complexity, examples, and exam relevance.
    """

    grade: GradeLevel
    display_name: str
    tier: str  # "school" | "higher_secondary" | "bachelor"
    exam_board: str  # "SEE" | "NEB" | "TU/PU/KU"
    recommended_difficulty: str  # "basic" | "medium" | "advanced"
    vocabulary_complexity: str  # "simple" | "intermediate" | "technical"
    curriculum_note: str  # Injected into every AI prompt
    subjects_available: list[str] = field(default_factory=list)
    typical_exam_patterns: list[str] = field(default_factory=list)
    example_style: str = ""
