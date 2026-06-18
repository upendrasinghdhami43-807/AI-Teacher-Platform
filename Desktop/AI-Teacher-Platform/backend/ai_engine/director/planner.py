"""
DirectorAI — Lesson planner with semantic caching.
Plans lessons but does NOT explain content.
"""

import hashlib
import json
from typing import Optional

import structlog

from ai_engine.director.prompts import DIRECTOR_SYSTEM_PROMPT, build_director_user_prompt
from ai_engine.director.schemas import LessonPlan
from ai_engine.grade.complexity import get_grade_prompt_context
from ai_engine.grade.levels import GradeLevel
from config import settings
from services.ai_provider import get_ai_provider
from services.cache import CacheService

logger = structlog.get_logger(__name__)


class DirectorAI:
    """Plans structured lesson content — the first stage of the AI pipeline."""

    def __init__(self, cache: CacheService):
        self._cache = cache

    def _build_cache_key(
        self, topic: str, grade: str, language: str, level: str
    ) -> str:
        """Build deterministic cache key from lesson parameters."""
        raw = f"plan:{topic.lower().strip()}:{grade}:{language}:{level}"
        return hashlib.md5(raw.encode()).hexdigest()

    async def plan(
        self,
        topic: str,
        grade: GradeLevel,
        language: str,
        level: str,
        student_memory: Optional[dict] = None,
        # STAGE 4: Skip planning, use provided structure
        pre_structured_content: Optional[dict] = None,
    ) -> LessonPlan:
        """
        Generate a lesson plan for the given topic and grade.

        Steps:
        1. Check Redis cache for existing plan
        2. Build grade context + user prompt
        3. Call AI provider with low temperature (structured planning)
        4. Validate with Pydantic
        5. Cache result (memory NOT in cache key — plans are reusable)
        6. Return LessonPlan
        """
        cache_key = self._build_cache_key(topic, grade.value, language, level)
        redis_key = f"director:{cache_key}"

        # Step 1: Check cache
        if settings.ENABLE_SEMANTIC_CACHE:
            cached = await self._cache.get(redis_key)
            if cached:
                logger.info("director.cache_hit", topic=topic, grade=grade.value)
                plan_data = json.loads(cached)
                plan_data["cache_key"] = cache_key
                return LessonPlan(**plan_data)

        # Step 2: Build prompts
        grade_context = get_grade_prompt_context(grade, topic)
        user_prompt = build_director_user_prompt(
            topic=topic,
            grade_context=grade_context,
            language=language,
            level=level,
            student_memory=student_memory,
        )

        # Step 3: Call AI
        provider = get_ai_provider(settings.AI_PRIMARY_PROVIDER)
        result = await provider.complete_json(
            system_prompt=DIRECTOR_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            model=settings.GEMINI_DIRECTOR_MODEL,
            max_tokens=settings.MAX_LESSON_TOKENS_OUTPUT,
            temperature=0.3,  # Low temperature for structured planning
        )

        # Inject metadata
        result["grade"] = grade.value
        result["language"] = language
        result["level"] = level
        result["topic"] = topic
        result["cache_key"] = cache_key

        # Fix total_sections if AI got it wrong
        if "sections" in result:
            result["total_sections"] = len(result["sections"])
            result["estimated_total_seconds"] = sum(
                s.get("duration_seconds", 30) for s in result["sections"]
            )

        # Step 4: Validate
        plan = LessonPlan(**result)

        logger.info(
            "director.plan_generated",
            topic=topic,
            grade=grade.value,
            sections=plan.total_sections,
            duration=plan.estimated_total_seconds,
        )

        # Step 5: Cache (without student memory — plans are reusable)
        cache_data = plan.model_dump()
        cache_data.pop("cache_key", None)  # Don't cache the cache_key itself
        ttl = settings.LESSON_CACHE_TTL_HOURS * 3600
        await self._cache.set(redis_key, json.dumps(cache_data), ttl=ttl)

        return plan
