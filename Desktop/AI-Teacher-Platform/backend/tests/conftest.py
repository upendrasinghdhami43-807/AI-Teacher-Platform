"""Test fixtures for AI Teacher Platform tests."""

import asyncio
import json
import sys
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock

import pytest

# Ensure backend is on path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))


@pytest.fixture
def mock_ai_provider():
    """Mock AI provider returning realistic LessonPlan data."""
    provider = AsyncMock()

    # Default lesson plan response
    provider.complete_json.return_value = {
        "lesson_title": "Understanding Newton's Third Law",
        "topic": "Newton's Third Law",
        "grade": "class_11_science",
        "language": "ne_en",
        "level": "medium",
        "estimated_total_seconds": 120,
        "total_sections": 2,
        "sections": [
            {
                "section_id": 1,
                "title": "What is Newton's Third Law?",
                "section_type": "introduction",
                "duration_seconds": 60,
                "key_points": ["Action-reaction pairs", "Equal and opposite forces"],
                "board_hint": "Write law statement",
                "voice_hint": "Use rocket example",
                "include_formula": True,
                "formula_hint": "F₁ = -F₂",
            },
            {
                "section_id": 2,
                "title": "Real World Examples",
                "section_type": "example",
                "duration_seconds": 60,
                "key_points": ["Swimming", "Rocket propulsion"],
                "board_hint": "Draw force arrows",
                "voice_hint": "Nepal context",
                "include_formula": False,
                "formula_hint": "",
            },
        ],
        "prerequisite_note": "Know Newton's First and Second Laws",
        "exam_relevance": "Frequently asked in NEB Board and IOE entrance",
    }

    provider.complete_text.return_value = "ok"

    return provider


@pytest.fixture
def mock_cache():
    """Mock CacheService — get returns None by default, set returns True."""
    cache = AsyncMock()
    cache.get.return_value = None
    cache.set.return_value = True
    cache.delete.return_value = True
    cache.exists.return_value = False
    cache.increment.return_value = 1
    cache.ping.return_value = True
    return cache
