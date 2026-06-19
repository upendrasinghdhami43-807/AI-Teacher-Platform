"""
Board action validator — clamps AI output to valid coordinate bounds.
Run after every Board Mapper call.
"""

import structlog

from ai_engine.board.schemas import SectionBoardActions

logger = structlog.get_logger(__name__)


def clamp(value: int, min_val: int, max_val: int) -> int:
    """Clamp a value to [min_val, max_val]."""
    return max(min_val, min(value, max_val))


def validate_board_actions(data: dict) -> SectionBoardActions:
    """
    Validate and fix board actions from AI output.

    Fixes:
    - Clamps position.x to 0–1200, position.y to 0–750
    - Clamps from_pos and to_pos the same way
    - Clamps font_size to 14–64
    - Clamps delay_ms to 0–5000, duration_ms to 100–3000
    - Recalculates estimated_animation_ms
    """
    fixes_applied = 0

    for action in data.get("actions", []):
        # Clamp position
        if "position" in action and action["position"]:
            pos = action["position"]
            orig_x, orig_y = pos.get("x", 0), pos.get("y", 0)
            pos["x"] = clamp(pos.get("x", 0), 0, 1200)
            pos["y"] = clamp(pos.get("y", 0), 0, 750)
            if pos["x"] != orig_x or pos["y"] != orig_y:
                fixes_applied += 1

        # Clamp from_pos
        if "from_pos" in action and action["from_pos"]:
            fp = action["from_pos"]
            fp["x"] = clamp(fp.get("x", 0), 0, 1200)
            fp["y"] = clamp(fp.get("y", 0), 0, 750)

        # Clamp to_pos
        if "to_pos" in action and action["to_pos"]:
            tp = action["to_pos"]
            tp["x"] = clamp(tp.get("x", 0), 0, 1200)
            tp["y"] = clamp(tp.get("y", 0), 0, 750)

        # Clamp font_size
        if "font_size" in action and action["font_size"] is not None:
            action["font_size"] = clamp(action["font_size"], 14, 64)

        # Clamp timing
        if "delay_ms" in action:
            action["delay_ms"] = clamp(action.get("delay_ms", 0), 0, 5000)
        if "duration_ms" in action:
            action["duration_ms"] = clamp(action.get("duration_ms", 500), 100, 3000)

    # Recalculate estimated_animation_ms
    total_ms = sum(
        action.get("delay_ms", 0) + action.get("duration_ms", 500)
        for action in data.get("actions", [])
    )
    data["estimated_animation_ms"] = total_ms

    if fixes_applied > 0:
        logger.info(
            "board.validator.fixes_applied",
            section_id=data.get("section_id"),
            fixes=fixes_applied,
        )

    return SectionBoardActions(**data)
