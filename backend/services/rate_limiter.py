"""
Per-student daily lesson rate limiter using Redis atomic counters.
"""

from datetime import datetime, timezone

import structlog

from config import settings
from services.cache import CacheService

logger = structlog.get_logger(__name__)


async def check_rate_limit(
    student_id: str,
    plan: str,
    cache: CacheService,
) -> tuple[bool, str]:
    """
    Check if student has remaining AI lessons for today.

    Args:
        student_id: The student's UUID.
        plan: Student's plan ("free", "basic", "pro").
        cache: CacheService instance.

    Returns:
        (allowed: bool, message: str)
    """
    # Determine limit based on plan
    if plan == "free":
        daily_limit = settings.FREE_PLAN_DAILY_AI_LESSONS
    elif plan == "basic":
        daily_limit = settings.BASIC_PLAN_DAILY_AI_LESSONS
    else:
        daily_limit = -1  # pro = unlimited

    # -1 means unlimited
    if daily_limit == -1:
        return True, "Unlimited lessons available"

    # Build rate limit key with today's UTC date
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    key = f"rate:student:{student_id}:lessons:{today}"

    # Atomic increment with 24-hour TTL
    count = await cache.increment(key, expire=86400)

    if count > daily_limit:
        logger.info(
            "rate_limit.exceeded",
            student_id=student_id,
            plan=plan,
            count=count,
            limit=daily_limit,
        )
        return (
            False,
            f"Daily lesson limit reached ({daily_limit} lessons/day on {plan} plan). "
            "Upgrade your plan for unlimited lessons.",
        )

    remaining = daily_limit - count
    return True, f"{remaining} lessons remaining today"
