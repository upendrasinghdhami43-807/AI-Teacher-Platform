"""
Async database connection using SQLAlchemy 2.0 + asyncpg.
Provides: async engine, session factory, get_db dependency, init_db coroutine.
"""

import structlog
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from config import settings

logger = structlog.get_logger(__name__)

# Async engine with asyncpg driver
engine = create_async_engine(
    settings.DATABASE_URL,
    pool_size=settings.DATABASE_POOL_SIZE,
    pool_pre_ping=True,
    echo=settings.DEBUG and settings.APP_ENV == "development",
)

# Session factory
async_session_factory = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db():
    """FastAPI dependency — yields an async database session."""
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db():
    """Create all tables on startup (dev only). In production, use Alembic."""
    from models.base import Base  # noqa: F401
    import models.student  # noqa: F401
    import models.lesson  # noqa: F401
    import models.memory  # noqa: F401

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    logger.info("database.initialized", url=settings.DATABASE_URL.split("@")[-1])
