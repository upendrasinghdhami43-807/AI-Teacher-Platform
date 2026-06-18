"""Tests for the Grade Intelligence System."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from ai_engine.grade.complexity import get_grade_prompt_context
from ai_engine.grade.levels import GradeLevel
from ai_engine.grade.registry import GRADE_REGISTRY


def test_all_grades_in_registry():
    """All GradeLevel enum values must be present in GRADE_REGISTRY."""
    for grade in GradeLevel:
        assert grade in GRADE_REGISTRY, f"Missing: {grade.value}"


def test_registry_has_13_grades():
    """GRADE_REGISTRY must have exactly 13 entries."""
    assert len(GRADE_REGISTRY) == 13


def test_prompt_context_contains_topic():
    """get_grade_prompt_context output must contain the topic string."""
    output = get_grade_prompt_context(GradeLevel.CLASS_11_SCIENCE, "Photosynthesis")
    assert "Photosynthesis" in output


def test_prompt_context_contains_grade_name():
    """Output must contain the grade display_name."""
    output = get_grade_prompt_context(GradeLevel.CLASS_11_SCIENCE, "test")
    assert "Class 11 Science (NEB)" in output


def test_class_8_is_basic():
    """CLASS_8 must have basic difficulty and simple vocabulary."""
    ctx = GRADE_REGISTRY[GradeLevel.CLASS_8]
    assert ctx.recommended_difficulty == "basic"
    assert ctx.vocabulary_complexity == "simple"


def test_bachelor_4_is_advanced():
    """BACHELOR_4 must have advanced difficulty and technical vocabulary."""
    ctx = GRADE_REGISTRY[GradeLevel.BACHELOR_4]
    assert ctx.recommended_difficulty == "advanced"
    assert ctx.vocabulary_complexity == "technical"


def test_class_11_science_references_ioe():
    """CLASS_11_SCIENCE curriculum_note must mention IOE entrance exam."""
    ctx = GRADE_REGISTRY[GradeLevel.CLASS_11_SCIENCE]
    assert "IOE" in ctx.curriculum_note


def test_class_10_references_see():
    """CLASS_10 curriculum_note must mention SEE exam."""
    ctx = GRADE_REGISTRY[GradeLevel.CLASS_10]
    assert "SEE" in ctx.curriculum_note


def test_grade_tiers():
    """Check that tier assignments are correct."""
    assert GRADE_REGISTRY[GradeLevel.CLASS_8].tier == "school"
    assert GRADE_REGISTRY[GradeLevel.CLASS_11_SCIENCE].tier == "higher_secondary"
    assert GRADE_REGISTRY[GradeLevel.BACHELOR_1].tier == "bachelor"


def test_all_grades_have_subjects():
    """Every grade must have at least 2 subjects."""
    for grade, ctx in GRADE_REGISTRY.items():
        assert len(ctx.subjects_available) >= 2, f"{grade.value} has < 2 subjects"
