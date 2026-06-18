"""Tests for Student Memory system."""

import json
import sys
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from ai_engine.memory.retriever import retrieve_memory
from ai_engine.memory.updater import upsert_memory


@pytest.fixture
def mock_db():
    """Mock async database session."""
    db = AsyncMock()
    return db


@pytest.mark.asyncio
async def test_retrieve_returns_empty_for_unknown(mock_db):
    """retrieve_memory should return empty dict for unknown student_id."""
    # Mock no result found
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db.execute.return_value = mock_result

    memory = await retrieve_memory("unknown-student-id", mock_db)
    assert memory == {}


@pytest.mark.asyncio
async def test_retrieve_returns_parsed_json(mock_db):
    """retrieve_memory should parse summary_json and return dict."""
    mock_memory = MagicMock()
    mock_memory.summary_json = json.dumps({
        "weak_topics": ["trigonometry"],
        "strong_topics": ["algebra"],
        "recommended_level": "medium",
    })
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_memory
    mock_db.execute.return_value = mock_result

    memory = await retrieve_memory("test-student", mock_db)
    assert "weak_topics" in memory
    assert "algebra" in memory["strong_topics"]


@pytest.mark.asyncio
async def test_upsert_creates_new_record(mock_db):
    """upsert_memory should create new record for new student."""
    # Mock no existing record
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db.execute.return_value = mock_result

    summary = {"weak_topics": ["physics"], "total_sessions": 1}
    await upsert_memory("new-student", summary, mock_db)

    # Should have added a new record
    mock_db.add.assert_called_once()
    mock_db.commit.assert_called_once()


@pytest.mark.asyncio
async def test_upsert_updates_existing_record(mock_db):
    """upsert_memory should update existing record for known student."""
    existing = MagicMock()
    existing.summary_json = "{}"
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = existing
    mock_db.execute.return_value = mock_result

    summary = {"weak_topics": ["chemistry"], "total_sessions": 5}
    await upsert_memory("existing-student", summary, mock_db)

    # Should have updated existing, not added new
    mock_db.add.assert_not_called()
    assert existing.summary_json != "{}"
    mock_db.commit.assert_called_once()
