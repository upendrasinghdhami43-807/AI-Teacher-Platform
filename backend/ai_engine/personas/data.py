"""Seed data for teacher personas — exactly 2 for Stage 2B."""

from ai_engine.personas.models import TeacherPersona, LockedConfig

PERSONAS = [
    TeacherPersona(
        id="ai_teacher",
        name="AI Teacher",
        tagline="Adapts to you — pick your language, level & pace",
        is_locked=False,
        active=True,
        style_prompt_key="default",
        voice_id="default",
    ),
    TeacherPersona(
        id="bhupesh_sir",
        name="Bhupesh Sir",
        tagline="Fixed teaching style — full immersion, no setup",
        is_locked=True,
        locked_config=LockedConfig(language="ne_en", level="recommended"),
        active=True,
        badge_text="Coming Soon — Style Locked",
        style_prompt_key="TODO",
        voice_id="TODO",
    ),
]


def get_persona(persona_id: str) -> TeacherPersona:
    """Get persona by ID. Falls back to ai_teacher."""
    for p in PERSONAS:
        if p.id == persona_id:
            return p
    return PERSONAS[0]
