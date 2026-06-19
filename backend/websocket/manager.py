"""WebSocket Connection Manager — per-session tracking."""

import json
from typing import Optional

import structlog
from starlette.websockets import WebSocket

logger = structlog.get_logger(__name__)


class ClassroomConnectionManager:
    """Manages WebSocket connections for classroom sessions."""

    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}
        self.session_contexts: dict[str, dict] = {}

    async def connect(self, session_id: str, websocket: WebSocket):
        """Accept and register a WebSocket connection."""
        await websocket.accept()
        self.active_connections[session_id] = websocket
        logger.info("ws.connected", session_id=session_id)

    def disconnect(self, session_id: str):
        """Remove a WebSocket connection."""
        self.active_connections.pop(session_id, None)
        self.session_contexts.pop(session_id, None)
        logger.info("ws.disconnected", session_id=session_id)

    async def send(self, session_id: str, data: dict):
        """Send a JSON message to a specific session."""
        ws = self.active_connections.get(session_id)
        if ws:
            try:
                await ws.send_json(data)
            except Exception as e:
                logger.warning(
                    "ws.send_error", session_id=session_id, error=str(e)
                )

    async def broadcast_error(self, session_id: str, message: str):
        """Send an error event to a session."""
        await self.send(
            session_id,
            {
                "event": "error",
                "session_id": session_id,
                "error_code": "INTERNAL_ERROR",
                "message": message,
                "details": "",
            },
        )

    def set_context(self, session_id: str, context: dict):
        """Store lesson context for a session."""
        self.session_contexts[session_id] = context

    def get_context(self, session_id: str) -> dict:
        """Retrieve lesson context for a session."""
        return self.session_contexts.get(session_id, {})

    def is_connected(self, session_id: str) -> bool:
        """Check if a session has an active connection."""
        return session_id in self.active_connections


# Singleton instance
connection_manager = ClassroomConnectionManager()
