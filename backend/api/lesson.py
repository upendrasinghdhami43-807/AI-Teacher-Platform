"""
AI Teacher Lesson API — Stage 2B.

POST /api/v1/ai-teacher/lesson
Returns a complete LessonSession JSON (or streams via SSE if needed later).
For Stage 2B, this is a mock/simulation endpoint that works without real AI
API keys — generates realistic demo data for frontend testing.
"""

import asyncio
import json
import math
import time
import uuid
from typing import Optional

import structlog
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from ai_engine.personas.data import get_persona
from config import settings

logger = structlog.get_logger(__name__)
router = APIRouter(prefix="/ai-teacher", tags=["ai-teacher"])


class LessonRequestBody(BaseModel):
    """Request body for lesson generation."""
    persona_id: str = "ai_teacher"
    topic: str
    grade: str = "class_11_science"
    language: str = "ne_en"
    level: str = "medium"
    context_text: Optional[str] = None
    context_image_url: Optional[str] = None


class PersonaResponse(BaseModel):
    """Persona info for the frontend."""
    id: str
    name: str
    tagline: str
    is_locked: bool
    locked_config: Optional[dict] = None
    active: bool
    badge_text: Optional[str] = None


@router.get("/personas")
async def list_personas():
    """List all available teacher personas."""
    from ai_engine.personas.data import PERSONAS
    return {
        "personas": [
            PersonaResponse(
                id=p.id,
                name=p.name,
                tagline=p.tagline,
                is_locked=p.is_locked,
                locked_config=p.locked_config.model_dump() if p.locked_config else None,
                active=p.active,
                badge_text=p.badge_text,
            ).model_dump()
            for p in PERSONAS
        ]
    }


@router.post("/lesson")
async def generate_lesson(body: LessonRequestBody):
    """
    Generate a full AI lesson session.

    Stage 2B: Returns mock/demo data that exercises the full pipeline schema.
    When real API keys are configured, this will call the 3-model pipeline.
    """
    session_id = f"sess_{uuid.uuid4().hex[:12]}"
    persona = get_persona(body.persona_id)

    # Resolve language/level from persona if locked
    language = body.language
    level = body.level
    if persona.is_locked and persona.locked_config:
        language = persona.locked_config.language
        level = persona.locked_config.level

    # Resolve "recommended" level
    resolved_level = level
    level_reason = None
    if level == "recommended":
        # In real pipeline, Decision Agent resolves this
        grade_level_map = {
            "class_10": "basic",
            "class_11_science": "medium",
            "class_11_management": "basic",
            "class_12_science": "advanced",
            "bachelors": "advanced",
        }
        resolved_level = grade_level_map.get(body.grade, "medium")
        level_reason = f"Based on {body.grade.replace('_', ' ')} curriculum, {resolved_level} depth is appropriate for '{body.topic}'"

    # Generate demo lesson plan
    wpm = settings.LESSON_SPEAKING_RATE_WPM
    max_duration = settings.LESSON_MAX_DURATION_SECONDS

    # Create sections based on topic
    sections = _generate_demo_sections(body.topic, resolved_level, max_duration, wpm)

    total_estimated = sum(s["estimatedSeconds"] for s in sections)

    # Duration enforcement
    was_trimmed = False
    trimmed_sections = []
    if total_estimated > max_duration:
        # Drop optional sections first
        core_sections = [s for s in sections if s["priority"] == "core"]
        optional_sections = [s for s in sections if s["priority"] == "optional"]
        trimmed_sections = [s["id"] for s in optional_sections]
        sections = core_sections
        was_trimmed = True
        total_estimated = sum(s["estimatedSeconds"] for s in sections)

    # Generate scripts
    scripts = []
    for section in sections:
        word_budget = int(section["estimatedSeconds"] * wpm / 60)
        script_text = _generate_demo_script(
            body.topic, section["title"], section["keyPoints"],
            language, body.grade, word_budget
        )
        word_count = len(script_text.split())
        scripts.append({
            "sectionId": section["id"],
            "text": script_text,
            "wordCount": word_count,
            "estimatedSeconds": int(word_count * 60 / wpm),
        })

    # Generate board elements
    board_elements = []
    section_offset_ms = 0
    for i, section in enumerate(sections):
        section_duration_ms = section["estimatedSeconds"] * 1000
        elements = _generate_demo_board(
            body.topic, section, section_offset_ms, section_duration_ms
        )
        board_elements.extend(elements)
        section_offset_ms += section_duration_ms

    # Compute actual total duration from word counts
    actual_duration = sum(s["estimatedSeconds"] for s in scripts)
    if actual_duration > max_duration:
        actual_duration = max_duration
        was_trimmed = True

    lesson_session = {
        "id": session_id,
        "request": {
            "personaId": body.persona_id,
            "topic": body.topic,
            "grade": body.grade,
            "language": language,
            "level": level,
            "contextText": body.context_text,
            "contextImageUrl": body.context_image_url,
            "maxDurationSeconds": max_duration,
        },
        "plan": {
            "resolvedLevel": resolved_level,
            "levelResolutionReason": level_reason,
            "sections": sections,
            "totalEstimatedSeconds": total_estimated,
        },
        "scripts": scripts,
        "board": board_elements,
        "totalDurationSeconds": min(actual_duration, max_duration),
        "wasTrimmed": was_trimmed,
        "trimmedSections": trimmed_sections,
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    logger.info(
        "lesson.generated",
        session_id=session_id,
        topic=body.topic,
        persona=body.persona_id,
        duration=actual_duration,
        sections=len(sections),
        was_trimmed=was_trimmed,
    )

    return lesson_session


def _generate_demo_sections(topic: str, level: str, max_duration: int, wpm: int) -> list:
    """Generate demo lesson plan sections for a topic."""
    # Determine section count based on level
    if level == "basic":
        section_count = 3
    elif level == "advanced":
        section_count = 5
    else:
        section_count = 4

    time_per_section = max_duration // section_count

    section_templates = [
        {
            "title": f"Introduction to {topic}",
            "keyPoints": [
                f"What is {topic}?",
                "Why is it important?",
                "Real-world applications",
            ],
            "priority": "core",
            "visualizationHints": ["heading", "definition", "bullet_list"],
        },
        {
            "title": f"Core Concepts of {topic}",
            "keyPoints": [
                "Fundamental principles",
                "Key definitions and terminology",
                "Mathematical formulations",
            ],
            "priority": "core",
            "visualizationHints": ["heading", "definition", "equation"],
        },
        {
            "title": f"Visual Understanding — {topic}",
            "keyPoints": [
                "Graphical representation",
                "Geometric relationships",
                "Data visualization",
            ],
            "priority": "core",
            "visualizationHints": ["graph", "shape", "table"],
        },
        {
            "title": f"Applications & Examples — {topic}",
            "keyPoints": [
                "Practical examples",
                "Problem-solving approach",
                "Common exam questions",
            ],
            "priority": "optional",
            "visualizationHints": ["equation", "definition", "bullet_list"],
        },
        {
            "title": f"Summary & Key Takeaways — {topic}",
            "keyPoints": [
                "Key formulas to remember",
                "Important definitions",
                "Quick revision checklist",
            ],
            "priority": "optional",
            "visualizationHints": ["heading", "bullet_list", "equation"],
        },
    ]

    sections = []
    for i in range(min(section_count, len(section_templates))):
        t = section_templates[i]
        sections.append({
            "id": f"section_{i + 1}",
            "title": t["title"],
            "keyPoints": t["keyPoints"],
            "priority": t["priority"],
            "estimatedSeconds": time_per_section,
            "visualizationHints": t["visualizationHints"],
        })

    return sections


def _generate_demo_script(
    topic: str, section_title: str, key_points: list,
    language: str, grade: str, word_budget: int
) -> str:
    """Generate demo script text for a section."""
    points_text = "; ".join(key_points)

    if language == "ne_en":
        return (
            f"Alright students, let's talk about {section_title}. "
            f"Yo section ma hami {topic} ko baare ma detail ma discuss garne chhaun. "
            f"Key points haru chhan: {points_text}. "
            f"Yeslai ramro sanga bujhnu important chha kinaki yo {grade.replace('_', ' ')} "
            f"ko exam ma frequently aaucha. "
            f"So let's dive deeper into each of these concepts."
        )
    elif language == "ne":
        return (
            f"विद्यार्थीहरू, अब हामी {section_title} बारे पढ्ने छौं। "
            f"{topic} को यो भाग धेरै महत्त्वपूर्ण छ। "
            f"मुख्य कुराहरू: {points_text}। "
            f"यो {grade.replace('_', ' ')} मा अक्सर सोधिन्छ।"
        )
    elif language == "hi":
        return (
            f"छात्रों, आइए {section_title} के बारे में बात करते हैं। "
            f"यह {topic} का एक महत्वपूर्ण हिस्सा है। "
            f"मुख्य बिंदु: {points_text}। "
            f"यह {grade.replace('_', ' ')} की परीक्षा में बार-बार पूछा जाता है।"
        )
    else:
        return (
            f"Alright students, let's explore {section_title}. "
            f"In this section, we'll cover the key aspects of {topic}. "
            f"The main points are: {points_text}. "
            f"Understanding these concepts is crucial for your {grade.replace('_', ' ')} "
            f"examinations, where this topic frequently appears. "
            f"Let's break down each concept step by step."
        )


def _generate_demo_board(
    topic: str, section: dict, offset_ms: int, duration_ms: int
) -> list:
    """Generate demo board elements for a section."""
    elements = []
    hints = section.get("visualizationHints", [])
    key_points = section.get("keyPoints", [])
    section_id = section["id"]
    spacing = max(duration_ms // (len(hints) + len(key_points) + 1), 500)
    current_ms = offset_ms
    y_pos = 5

    # Title element
    elements.append({
        "id": f"{section_id}_title",
        "sectionId": section_id,
        "type": "heading",
        "appearAtMs": current_ms,
        "color": "default",
        "position": {"x": 5, "y": y_pos},
        "content": section["title"],
    })
    current_ms += spacing
    y_pos += 12

    for i, point in enumerate(key_points):
        hint = hints[i] if i < len(hints) else "text"

        if hint == "definition":
            elements.append({
                "id": f"{section_id}_def_{i}",
                "sectionId": section_id,
                "type": "definition",
                "appearAtMs": current_ms,
                "color": "blue",
                "position": {"x": 5, "y": y_pos},
                "content": point,
                "underline": True,
            })
        elif hint == "equation":
            latex_map = {
                "Mathematical formulations": r"F = ma \quad \text{(Newton's 2nd Law)}",
                "Key formulas to remember": r"\int_a^b f(x)\,dx = F(b) - F(a)",
                "Problem-solving approach": r"\frac{d}{dx}(x^n) = nx^{n-1}",
            }
            elements.append({
                "id": f"{section_id}_eq_{i}",
                "sectionId": section_id,
                "type": "equation",
                "appearAtMs": current_ms,
                "color": "orange",
                "position": {"x": 10, "y": y_pos},
                "latex": latex_map.get(point, r"E = mc^2"),
                "label": point,
            })
        elif hint == "graph":
            elements.append({
                "id": f"{section_id}_graph_{i}",
                "sectionId": section_id,
                "type": "graph",
                "appearAtMs": current_ms,
                "color": "blue",
                "position": {"x": 55, "y": y_pos},
                "graphType": "function",
                "fn": "x^2",
                "domain": [-5, 5],
                "axisLabels": {"x": "x", "y": "f(x)"},
            })
        elif hint == "shape":
            elements.append({
                "id": f"{section_id}_shape_{i}",
                "sectionId": section_id,
                "type": "shape",
                "appearAtMs": current_ms,
                "color": "green",
                "position": {"x": 55, "y": y_pos},
                "shape": "triangle",
                "dimensions": {"width": 120, "height": 100},
                "label": "Triangle ABC",
                "fillColor": "rgba(99,102,241,0.1)",
                "strokeColor": "#6366F1",
            })
        elif hint == "chemistry":
            elements.append({
                "id": f"{section_id}_chem_{i}",
                "sectionId": section_id,
                "type": "chemistry",
                "appearAtMs": current_ms,
                "color": "orange",
                "position": {"x": 10, "y": y_pos},
                "reaction": "2H₂ + O₂ → 2H₂O",
            })
        elif hint == "table":
            elements.append({
                "id": f"{section_id}_table_{i}",
                "sectionId": section_id,
                "type": "table",
                "appearAtMs": current_ms,
                "color": "default",
                "position": {"x": 5, "y": y_pos},
                "headers": ["Property", "Value", "Unit"],
                "rows": [
                    ["Mass", "5.0", "kg"],
                    ["Velocity", "10", "m/s"],
                    ["Force", "50", "N"],
                ],
            })
        elif hint == "bullet_list":
            elements.append({
                "id": f"{section_id}_bullets_{i}",
                "sectionId": section_id,
                "type": "bullet_list",
                "appearAtMs": current_ms,
                "color": "default",
                "position": {"x": 5, "y": y_pos},
                "items": key_points,
            })
        else:
            elements.append({
                "id": f"{section_id}_text_{i}",
                "sectionId": section_id,
                "type": "text",
                "appearAtMs": current_ms,
                "color": "default",
                "position": {"x": 5, "y": y_pos},
                "content": point,
            })

        current_ms += spacing
        y_pos += 15

    return elements
