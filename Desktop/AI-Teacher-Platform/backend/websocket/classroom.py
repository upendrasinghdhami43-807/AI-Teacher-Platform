"""
WebSocket endpoint — /ws/classroom/{session_id}

Handles: start_lesson, ask_question, end_lesson, heartbeat
"""

import asyncio
import json
import time

import structlog
from starlette.websockets import WebSocket, WebSocketDisconnect

from ai_engine.grade.levels import GradeLevel
from ai_engine.orchestrator import AITeacherOrchestrator
from config import settings
from database.connection import async_session_factory
from services.cache import cache_service
from services.rate_limiter import check_rate_limit
from services.storage import storage_service
from websocket.manager import connection_manager

logger = structlog.get_logger(__name__)


async def classroom_websocket(websocket: WebSocket):
    """WebSocket endpoint handler for classroom sessions."""
    session_id = websocket.path_params.get("session_id", "unknown")

    await connection_manager.connect(session_id, websocket)

    # Send initial connected event
    await connection_manager.send(session_id, {
        "event": "connected",
        "session_id": session_id,
        "message": "Connected to AI Teacher classroom",
    })

    orchestrator = AITeacherOrchestrator(
        cache=cache_service,
        storage=storage_service,
    )

    try:
        while True:
            # Receive message
            raw = await websocket.receive_text()
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                await connection_manager.send(session_id, {
                    "event": "error",
                    "session_id": session_id,
                    "error_code": "INVALID_JSON",
                    "message": "Invalid JSON message",
                    "details": "",
                })
                continue

            action = data.get("action", "")

            if action == "heartbeat":
                await connection_manager.send(session_id, {
                    "event": "heartbeat",
                    "session_id": session_id,
                    "timestamp": time.time(),
                })

            elif action == "start_lesson":
                await _handle_start_lesson(
                    session_id, data, orchestrator
                )

            elif action == "ask_question":
                await _handle_ask_question(
                    session_id, data, orchestrator
                )

            elif action == "end_lesson":
                await connection_manager.send(session_id, {
                    "event": "lesson_ended",
                    "session_id": session_id,
                    "message": "Lesson ended by student",
                })
                break

            else:
                await connection_manager.send(session_id, {
                    "event": "error",
                    "session_id": session_id,
                    "error_code": "UNKNOWN_ACTION",
                    "message": f"Unknown action: {action}",
                    "details": "",
                })

    except WebSocketDisconnect:
        logger.info("ws.client_disconnected", session_id=session_id)

    except Exception as e:
        logger.error("ws.error", session_id=session_id, error=str(e))
        await connection_manager.broadcast_error(
            session_id, "An unexpected error occurred"
        )

    finally:
        connection_manager.disconnect(session_id)


async def _handle_start_lesson(
    session_id: str,
    data: dict,
    orchestrator: AITeacherOrchestrator,
):
    """Handle start_lesson WebSocket action."""
    topic = data.get("topic", "").strip()
    grade_str = data.get("grade", "class_11_science")
    language = data.get("language", "ne_en")
    level = data.get("level", "medium")
    student_id = data.get("student_id", "anonymous")

    # Validate topic
    if not topic:
        await connection_manager.send(session_id, {
            "event": "error",
            "session_id": session_id,
            "error_code": "EMPTY_TOPIC",
            "message": "Please enter a topic before starting a lesson.",
            "details": "",
        })
        return

    # Validate grade
    try:
        grade = GradeLevel(grade_str)
    except ValueError:
        await connection_manager.send(session_id, {
            "event": "error",
            "session_id": session_id,
            "error_code": "GRADE_INVALID",
            "message": "Invalid grade selected. Please refresh and try again.",
            "details": "",
        })
        return

    # Check rate limit
    allowed, message = await check_rate_limit(
        student_id, "free", cache_service
    )
    if not allowed:
        await connection_manager.send(session_id, {
            "event": "error",
            "session_id": session_id,
            "error_code": "RATE_LIMIT",
            "message": message,
            "details": "",
        })
        return

    # Store context
    connection_manager.set_context(session_id, {
        "topic": topic,
        "grade": grade_str,
        "language": language,
        "level": level,
        "student_id": student_id,
    })

    # Run orchestrator pipeline
    async with async_session_factory() as db_session:
        async for event in orchestrator.run(
            session_id=session_id,
            student_id=student_id,
            topic=topic,
            grade=grade,
            language=language,
            level=level,
            db_session=db_session,
        ):
            # Update context with current section
            if event.get("event") == "section_start":
                ctx = connection_manager.get_context(session_id)
                ctx["current_section"] = event.get("section_title", "")
                connection_manager.set_context(session_id, ctx)

            await connection_manager.send(session_id, event)
            await asyncio.sleep(0)  # Yield to event loop


async def _handle_ask_question(
    session_id: str,
    data: dict,
    orchestrator: AITeacherOrchestrator,
):
    """Handle ask_question WebSocket action."""
    question = data.get("question", "").strip()
    current_section = data.get("current_section", "")
    lesson_id = data.get("lesson_id", session_id)

    if not question:
        return

    context = connection_manager.get_context(session_id)

    async with async_session_factory() as db_session:
        async for event in orchestrator.handle_question(
            session_id=session_id,
            lesson_id=lesson_id,
            question=question,
            current_section=current_section or context.get("current_section", ""),
            lesson_context=context,
            db_session=db_session,
        ):
            await connection_manager.send(session_id, event)
