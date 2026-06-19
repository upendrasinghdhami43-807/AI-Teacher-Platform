"""API router — mounts all sub-routers under /api/v1."""

from fastapi import APIRouter

from api import auth, health, teacher, lesson

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(teacher.router)
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(lesson.router)
