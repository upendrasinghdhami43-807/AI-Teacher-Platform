"""Tests for DirectorAI planner."""

import json
import sys
from pathlib import Path
from unittest.mock import AsyncMock, patch

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from ai_engine.director.planner import DirectorAI
from ai_engine.director.schemas import LessonPlan
from ai_engine.grade.levels import GradeLevel


@pytest.fixture
def director(mock_cache):
    return DirectorAI(cache=mock_cache)


@pytest.fixture
def mock_plan_response():
    return {
        "lesson_title": "Understanding Gravity",
        "topic": "Gravity",
        "grade": "class_11_science",
        "language": "ne_en",
        "level": "medium",
        "estimated_total_seconds": 120,
        "total_sections": 2,
        "sections": [
            {
                "section_id": 1,
                "title": "What is Gravity?",
                "section_type": "introduction",
                "duration_seconds": 60,
                "key_points": ["Universal force", "Pulls objects down"],
                "board_hint": "Write definition",
                "voice_hint": "Simple language",
                "include_formula": False,
                "formula_hint": "",
            },
            {
                "section_id": 2,
                "title": "Gravity Formula",
                "section_type": "concept",
                "duration_seconds": 60,
                "key_points": ["F = mg", "g = 9.8 m/s²"],
                "board_hint": "Show formula",
                "voice_hint": "Use ball example",
                "include_formula": True,
                "formula_hint": "F = mg",
            },
        ],
        "prerequisite_note": "Basic forces",
        "exam_relevance": "NEB Physics",
    }


@pytest.mark.asyncio
async def test_plan_returns_valid_lesson_plan(director, mock_plan_response, mock_cache):
    """DirectorAI.plan() must return a valid LessonPlan."""
    with patch("ai_engine.director.planner.get_ai_provider") as mock_get:
        provider = AsyncMock()
        provider.complete_json.return_value = mock_plan_response
        mock_get.return_value = provider

        plan = await director.plan(
            topic="Gravity",
            grade=GradeLevel.CLASS_11_SCIENCE,
            language="ne_en",
            level="medium",
        )

        assert isinstance(plan, LessonPlan)
        assert plan.total_sections > 0
        assert plan.cache_key != ""


@pytest.mark.asyncio
async def test_plan_sections_count_matches(director, mock_plan_response, mock_cache):
    """len(plan.sections) must equal plan.total_sections."""
    with patch("ai_engine.director.planner.get_ai_provider") as mock_get:
        provider = AsyncMock()
        provider.complete_json.return_value = mock_plan_response
        mock_get.return_value = provider

        plan = await director.plan(
            topic="Gravity",
            grade=GradeLevel.CLASS_11_SCIENCE,
            language="ne_en",
            level="medium",
        )

        assert len(plan.sections) == plan.total_sections


@pytest.mark.asyncio
async def test_cache_hit_skips_ai_call(mock_cache, mock_plan_response):
    """Second identical call should hit cache (AI provider called only once)."""
    # Pre-fill cache
    cached_data = json.dumps(mock_plan_response)
    mock_cache.get.return_value = cached_data

    director = DirectorAI(cache=mock_cache)

    with patch("ai_engine.director.planner.get_ai_provider") as mock_get:
        provider = AsyncMock()
        mock_get.return_value = provider

        plan = await director.plan(
            topic="Gravity",
            grade=GradeLevel.CLASS_11_SCIENCE,
            language="ne_en",
            level="medium",
        )

        # AI should NOT have been called
        provider.complete_json.assert_not_called()
        assert isinstance(plan, LessonPlan)
