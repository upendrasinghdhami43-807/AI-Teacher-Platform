"""
Redis Cache Service.
Rule: Cache errors NEVER crash the application — all operations wrapped in try/except.
"""

from typing import Optional

import redis.asyncio as redis
import structlog

from config import settings

logger = structlog.get_logger(__name__)


class CacheService:
    """Redis-backed cache with error-resilient operations."""

    def __init__(self):
        self._redis: Optional[redis.Redis] = None

    async def _get_client(self) -> redis.Redis:
        """Lazy-init Redis client."""
        if self._redis is None:
            self._redis = redis.from_url(
                settings.REDIS_URL,
                decode_responses=True,
                socket_connect_timeout=5,
            )
        return self._redis

    async def get(self, key: str) -> Optional[str]:
        """Get a value by key. Returns None on miss or error."""
        try:
            client = await self._get_client()
            return await client.get(key)
        except Exception as e:
            logger.warning("cache.get.error", key=key, error=str(e))
            return None

    async def set(self, key: str, value: str, ttl: Optional[int] = None) -> bool:
        """Set a key-value pair with optional TTL in seconds."""
        try:
            client = await self._get_client()
            if ttl:
                await client.setex(key, ttl, value)
            else:
                await client.set(key, value)
            return True
        except Exception as e:
            logger.warning("cache.set.error", key=key, error=str(e))
            return False

    async def delete(self, key: str) -> bool:
        """Delete a key."""
        try:
            client = await self._get_client()
            await client.delete(key)
            return True
        except Exception as e:
            logger.warning("cache.delete.error", key=key, error=str(e))
            return False

    async def exists(self, key: str) -> bool:
        """Check if a key exists."""
        try:
            client = await self._get_client()
            return bool(await client.exists(key))
        except Exception as e:
            logger.warning("cache.exists.error", key=key, error=str(e))
            return False

    async def increment(self, key: str, expire: Optional[int] = None) -> int:
        """Atomic increment. Used for rate limiting."""
        try:
            client = await self._get_client()
            val = await client.incr(key)
            if expire and val == 1:
                await client.expire(key, expire)
            return val
        except Exception as e:
            logger.warning("cache.increment.error", key=key, error=str(e))
            return 0

    async def ping(self) -> bool:
        """Health check."""
        try:
            client = await self._get_client()
            return await client.ping()
        except Exception:
            return False

    async def close(self):
        """Close the Redis connection."""
        if self._redis:
            await self._redis.close()
            self._redis = None


# Singleton
cache_service = CacheService()
