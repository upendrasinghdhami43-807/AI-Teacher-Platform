"""Tests for API endpoints."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pytest
from httpx import ASGITransport, AsyncClient

from main import app


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.mark.asyncio
async def test_health_returns_200(client):
    """GET /api/v1/health should return 200 with status ok."""
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


@pytest.mark.asyncio
async def test_grades_returns_13_items(client):
    """GET /api/v1/teacher/grades should return 13 grade items."""
    response = await client.get("/api/v1/teacher/grades")
    assert response.status_code == 200
    grades = response.json()
    assert len(grades) == 13


@pytest.mark.asyncio
async def test_start_without_auth_returns_401(client):
    """POST /api/v1/teacher/start without auth should return 401/403."""
    response = await client.post(
        "/api/v1/teacher/start",
        json={"topic": "test", "grade": "class_11_science"},
    )
    assert response.status_code in (401, 403)


@pytest.mark.asyncio
async def test_root_returns_service_info(client):
    """GET / should return service info."""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["stage"] == 2
    assert data["status"] == "running"


@pytest.mark.asyncio
async def test_grades_structure(client):
    """Each grade item should have value, label, tier, exam_board, subjects."""
    response = await client.get("/api/v1/teacher/grades")
    grades = response.json()
    for grade in grades:
        assert "value" in grade
        assert "label" in grade
        assert "tier" in grade
        assert "exam_board" in grade
        assert "subjects" in grade
