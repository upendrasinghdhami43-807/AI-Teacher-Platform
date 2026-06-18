"""
AI Teacher Platform — Stage 2 Configuration
All settings loaded from environment variables via pydantic-settings.
"""

from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── Application ──────────────────────────────────────────
    APP_NAME: str = "AI Teacher Platform"
    APP_VERSION: str = "2.0.0"
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "change-me-in-production"
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
    ]

    # ── Database ─────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/ai_teacher_db"
    DATABASE_POOL_SIZE: int = 10

    # ── Redis ────────────────────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_CACHE_TTL_SECONDS: int = 604800  # 7 days
    REDIS_RATE_LIMIT_WINDOW: int = 3600

    # ── AI Providers ─────────────────────────────────────────
    AI_PRIMARY_PROVIDER: str = "gemini"
    AI_FALLBACK_PROVIDER: Optional[str] = "groq"

    GEMINI_API_KEY: str = ""
    GEMINI_DIRECTOR_MODEL: str = "gemini-2.5-flash-lite"
    GEMINI_SCRIPT_MODEL: str = "gemini-2.5-flash"
    GEMINI_BOARD_MODEL: str = "gemini-2.5-flash-lite"
    GEMINI_MEMORY_MODEL: str = "gemini-2.5-flash-lite"
    GEMINI_QUESTION_MODEL: str = "gemini-2.5-flash"

    GROQ_API_KEY: Optional[str] = None
    GROQ_BOARD_MODEL: str = "llama-3.1-8b-instant"
    GROQ_MEMORY_MODEL: str = "llama-3.1-8b-instant"

    OPENAI_API_KEY: Optional[str] = None
    OPENAI_SCRIPT_MODEL: str = "gpt-4o"

    # ── Voice / TTS ──────────────────────────────────────────
    AZURE_SPEECH_KEY: str = ""
    AZURE_SPEECH_REGION: str = "eastasia"
    AZURE_VOICE_ENGLISH: str = "en-US-AriaNeural"
    AZURE_VOICE_NEPALI: str = "ne-NP-HemkalaNeural"
    AZURE_VOICE_HINDI: str = "hi-IN-SwaraNeural"
    AZURE_VOICE_NEENGLISH_NE: str = "ne-NP-HemkalaNeural"
    AZURE_VOICE_NEENGLISH_EN: str = "en-US-JennyNeural"

    # ── Storage ──────────────────────────────────────────────
    STORAGE_TYPE: str = "local"
    STORAGE_LOCAL_PATH: str = "./storage"
    AWS_S3_BUCKET: Optional[str] = None
    AWS_ACCESS_KEY: Optional[str] = None
    AWS_SECRET_KEY: Optional[str] = None

    # ── Cost Control ─────────────────────────────────────────
    FREE_PLAN_DAILY_AI_LESSONS: int = 5
    BASIC_PLAN_DAILY_AI_LESSONS: int = -1  # unlimited
    MAX_LESSON_TOKENS_INPUT: int = 4000
    MAX_LESSON_TOKENS_OUTPUT: int = 3000
    ENABLE_SEMANTIC_CACHE: bool = True
    LESSON_CACHE_TTL_HOURS: int = 168  # 7 days

    # ── WebSocket ────────────────────────────────────────────
    WS_HEARTBEAT_INTERVAL: int = 30
    WS_MAX_SESSION_DURATION: int = 3600


# Singleton settings instance
settings = Settings()
