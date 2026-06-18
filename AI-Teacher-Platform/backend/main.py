"""
AI Teacher Platform — Stage 2 Backend Engine
FastAPI application entry point.
"""

from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api.router import api_router
from config import settings
from database.connection import init_db
from middleware.logging import LoggingMiddleware
from services.cache import cache_service
from services.storage import storage_service
from websocket.classroom import classroom_websocket

logger = structlog.get_logger(__name__)

# Configure structlog
structlog.configure(
    processors=[
        structlog.stdlib.add_log_level,
        structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup/shutdown lifecycle."""
    # Startup
    logger.info("app.starting", env=settings.APP_ENV, version=settings.APP_VERSION)

    # Initialize database tables
    await init_db()

    # Initialize storage
    await storage_service.init()

    logger.info(
        "app.ready",
        port=8000,
        docs="/docs" if settings.DEBUG else "disabled",
    )

    yield

    # Shutdown
    await cache_service.close()
    logger.info("app.shutdown")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging middleware
app.add_middleware(LoggingMiddleware)

# Mount REST API
app.include_router(api_router)

# Mount WebSocket
app.add_websocket_route("/ws/classroom/{session_id}", classroom_websocket)

# Serve stored audio files
import os
storage_path = settings.STORAGE_LOCAL_PATH
if os.path.exists(storage_path):
    app.mount("/storage", StaticFiles(directory=storage_path), name="storage")


@app.get("/")
async def root():
    """Root endpoint — service info."""
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "stage": 2,
        "status": "running",
    }
