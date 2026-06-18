"""Tests for Board Validator."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from ai_engine.board.validator import validate_board_actions


def test_clamps_out_of_bounds_x():
    """Position x > 1200 must be clamped to 1200."""
    data = {
        "section_id": 1,
        "clear_before": True,
        "actions": [
            {
                "action_id": 1,
                "type": "write_text",
                "text": "Test",
                "position": {"x": 9999, "y": 100},
                "delay_ms": 0,
                "duration_ms": 500,
            }
        ],
    }
    result = validate_board_actions(data)
    assert result.actions[0].position.x <= 1200


def test_clamps_out_of_bounds_y():
    """Position y > 750 must be clamped to 750."""
    data = {
        "section_id": 1,
        "clear_before": True,
        "actions": [
            {
                "action_id": 1,
                "type": "write_text",
                "text": "Test",
                "position": {"x": 100, "y": 9999},
                "delay_ms": 0,
                "duration_ms": 500,
            }
        ],
    }
    result = validate_board_actions(data)
    assert result.actions[0].position.y <= 750


def test_recalculates_animation_ms():
    """estimated_animation_ms must equal sum of delay_ms + duration_ms."""
    data = {
        "section_id": 1,
        "clear_before": True,
        "estimated_animation_ms": 0,
        "actions": [
            {
                "action_id": 1,
                "type": "write_title",
                "text": "Title",
                "position": {"x": 50, "y": 30},
                "delay_ms": 100,
                "duration_ms": 600,
            },
            {
                "action_id": 2,
                "type": "write_text",
                "text": "Body",
                "position": {"x": 50, "y": 120},
                "delay_ms": 500,
                "duration_ms": 400,
            },
        ],
    }
    result = validate_board_actions(data)
    expected = (100 + 600) + (500 + 400)
    assert result.estimated_animation_ms == expected


def test_clamps_font_size():
    """Font size must be clamped to 14–64."""
    data = {
        "section_id": 1,
        "clear_before": True,
        "actions": [
            {
                "action_id": 1,
                "type": "write_text",
                "text": "Tiny",
                "font_size": 5,
                "position": {"x": 50, "y": 100},
                "delay_ms": 0,
                "duration_ms": 500,
            },
            {
                "action_id": 2,
                "type": "write_text",
                "text": "Huge",
                "font_size": 200,
                "position": {"x": 50, "y": 200},
                "delay_ms": 0,
                "duration_ms": 500,
            },
        ],
    }
    result = validate_board_actions(data)
    assert result.actions[0].font_size >= 14
    assert result.actions[1].font_size <= 64


def test_clamps_timing():
    """delay_ms clamped to 0-5000, duration_ms to 100-3000."""
    data = {
        "section_id": 1,
        "clear_before": True,
        "actions": [
            {
                "action_id": 1,
                "type": "write_text",
                "text": "Test",
                "position": {"x": 50, "y": 100},
                "delay_ms": -100,
                "duration_ms": 50,
            },
        ],
    }
    result = validate_board_actions(data)
    assert result.actions[0].delay_ms >= 0
    assert result.actions[0].duration_ms >= 100
