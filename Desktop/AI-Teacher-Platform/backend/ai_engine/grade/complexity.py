"""
Grade-to-complexity function.
Returns a grade-specific instruction block (~200 tokens) injected
into every AI prompt in every module.
"""

from ai_engine.grade.levels import GradeLevel
from ai_engine.grade.registry import GRADE_REGISTRY


def get_grade_prompt_context(grade: GradeLevel, topic: str) -> str:
    """
    Build the grade context block for AI prompt injection.

    Args:
        grade: The student's grade level.
        topic: The topic being taught.

    Returns:
        A formatted string (~200 tokens) with grade calibration instructions.

    Rule: No module receives an AI prompt without this context injected.
    """
    ctx = GRADE_REGISTRY.get(grade)

    if ctx is None:
        # Fallback for unknown grade — use CLASS_11_SCIENCE as default
        ctx = GRADE_REGISTRY[GradeLevel.CLASS_11_SCIENCE]

    patterns = ", ".join(ctx.typical_exam_patterns) if ctx.typical_exam_patterns else "N/A"

    return f"""GRADE CONTEXT:
Grade: {ctx.display_name}
Exam Board: {ctx.exam_board}
Vocabulary Level: {ctx.vocabulary_complexity}
Curriculum Note: {ctx.curriculum_note}
Topic Being Taught: {topic}
Example Style: {ctx.example_style}
Typical Exam Patterns: {patterns}

Calibrate ALL content — vocabulary, depth, formula complexity,
and examples — to this grade level. A {ctx.display_name} student
must be able to understand every word and concept you produce."""
