"""
Memory Summarizer — LLM compresses session into ~200 token JSON.
Cost: ~$0.0001 per session update.
"""

import structlog

from config import settings
from services.ai_provider import get_ai_provider

logger = structlog.get_logger(__name__)

MEMORY_SYSTEM_PROMPT = """You are a student memory compression engine.

Your job: Given the current memory state and a new session summary, produce an UPDATED memory JSON.

OUTPUT FORMAT: Output ONLY valid JSON matching this schema. No markdown. No preamble.

{
  "student_id": "string",
  "preferred_language": "en|ne|hi|ne_en",
  "last_grade": "string",
  "last_level": "basic|medium|advanced",
  "weak_topics": ["topic1", "topic2"],
  "strong_topics": ["topic1", "topic2"],
  "last_topics": ["newest_topic", "second", "third", "fourth", "fifth"],
  "learning_style_note": "One sentence about learning pattern (only if pattern is clear)",
  "avg_questions_per_session": float,
  "prefers_visual": boolean,
  "total_sessions": integer,
  "avg_session_duration_min": float,
  "recommended_level": "basic|medium|advanced",
  "recommended_next_topics": ["suggested1", "suggested2"]
}

RULES:
- weak_topics: add if student asked many questions about the topic. Max 10 items.
- strong_topics: add if session was quick and complete. Max 10 items.
- last_topics: FIFO rotation — newest first, max 5 items.
- recommended_level: infer from performance ("basic" if struggling, "advanced" if excelling)
- total_sessions: increment by 1
- Keep ALL existing data unless explicitly overridden by new session data
- Output ONLY the JSON object, nothing else
"""


async def summarize_session(
    current_memory: dict,
    session_data: dict,
) -> dict:
    """
    Compress a session into an updated memory summary.

    Args:
        current_memory: Current StudentMemorySummary dict (or empty dict).
        session_data: Data about the just-completed session.

    Returns:
        Updated memory summary dict.
    """
    user_prompt = f"""CURRENT MEMORY STATE:
{current_memory if current_memory else "No existing memory — this is the student's first session."}

NEW SESSION DATA:
- Topic: {session_data.get('topic', 'unknown')}
- Grade: {session_data.get('grade', 'unknown')}
- Language: {session_data.get('language', 'ne_en')}
- Level: {session_data.get('level', 'medium')}
- Questions Asked: {session_data.get('question_count', 0)}
- Duration (minutes): {session_data.get('duration_minutes', 0)}
- Completion: {session_data.get('completion_percent', 0)}%
- Student ID: {session_data.get('student_id', '')}

Update the memory JSON based on this new session. Output ONLY the JSON object.
"""

    try:
        provider = get_ai_provider(settings.AI_PRIMARY_PROVIDER)
        result = await provider.complete_json(
            system_prompt=MEMORY_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            model=settings.GEMINI_MEMORY_MODEL,
            max_tokens=500,
            temperature=0.1,  # Very deterministic compression
        )

        logger.info(
            "memory.summarized",
            student_id=session_data.get("student_id"),
            topic=session_data.get("topic"),
        )

        return result

    except Exception as e:
        logger.error("memory.summarize_error", error=str(e))
        # Return current memory unchanged on failure
        return current_memory
