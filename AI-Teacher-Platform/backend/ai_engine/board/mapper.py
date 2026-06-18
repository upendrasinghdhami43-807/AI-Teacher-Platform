"""
BoardMapperAI — converts ScriptSection board content into precise
BoardAction JSON that the frontend WhiteboardCanvas renders.
"""

import structlog

from ai_engine.board.prompts import BOARD_MAPPER_SYSTEM_PROMPT, build_board_user_prompt
from ai_engine.board.schemas import SectionBoardActions
from ai_engine.board.validator import validate_board_actions
from ai_engine.script.schemas import ScriptSection
from config import settings
from services.ai_provider import get_ai_provider

logger = structlog.get_logger(__name__)


class BoardMapperAI:
    """Maps script board content to precise whiteboard actions with coordinates."""

    async def map(self, script: ScriptSection) -> SectionBoardActions:
        """
        Convert a ScriptSection's board_content into coordinate-bound BoardActions.

        Steps:
        1. Build user prompt from script's board_content
        2. Call AI with very low temperature (deterministic layout)
        3. Validate and clamp all coordinates
        4. Return SectionBoardActions
        """
        user_prompt = build_board_user_prompt(
            section_id=script.section_id,
            section_title=script.section_title,
            board_content=[bc.model_dump() for bc in script.board_content],
            key_concept=script.key_concept,
        )

        # Use cheapest model with very low temperature
        provider = get_ai_provider(settings.AI_PRIMARY_PROVIDER)
        result = await provider.complete_json(
            system_prompt=BOARD_MAPPER_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            model=settings.GEMINI_BOARD_MODEL,
            max_tokens=2000,
            temperature=0.2,  # Very deterministic layout
        )

        # Ensure section_id matches
        result["section_id"] = script.section_id

        # Validate and clamp all coordinates
        board_actions = validate_board_actions(result)

        logger.info(
            "board.mapped",
            section_id=script.section_id,
            actions=len(board_actions.actions),
            animation_ms=board_actions.estimated_animation_ms,
        )

        return board_actions
