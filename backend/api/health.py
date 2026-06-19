"""Health check endpoints."""

from fastapi import APIRouter
from sqlalchemy import text

from config import settings
from database.connection import engine
from services.cache import cache_service

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health():
    """Basic health check."""
    return {"status": "ok", "version": settings.APP_VERSION}


@router.get("/db")
async def health_db():
    """Test database connection."""
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}


@router.get("/redis")
async def health_redis():
    """Test Redis connection."""
    try:
        is_ok = await cache_service.ping()
        if is_ok:
            return {"status": "ok", "redis": "connected"}
        return {"status": "error", "redis": "ping failed"}
    except Exception as e:
        return {"status": "error", "redis": str(e)}


@router.get("/ai")
async def health_ai():
    """Test AI provider with a minimal call."""
    try:
        from services.ai_provider import get_ai_provider

        provider = get_ai_provider(settings.AI_PRIMARY_PROVIDER)
        result = await provider.complete_text(
            system_prompt="Reply with only the word 'ok'.",
            user_prompt="Health check.",
            model=settings.GEMINI_DIRECTOR_MODEL,
            max_tokens=5,
            temperature=0.0,
        )
        return {"status": "ok", "test_response": result.strip()[:20]}
    except Exception as e:
        return {"status": "error", "ai": str(e)}
