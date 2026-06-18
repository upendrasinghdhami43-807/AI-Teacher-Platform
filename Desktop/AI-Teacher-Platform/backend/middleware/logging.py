"""Structlog request/response logging middleware."""

import time

import structlog
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = structlog.get_logger(__name__)


class LoggingMiddleware(BaseHTTPMiddleware):
    """Logs all HTTP requests and responses with timing."""

    async def dispatch(self, request: Request, call_next):
        start = time.time()

        response = await call_next(request)

        duration_ms = round((time.time() - start) * 1000, 1)
        logger.info(
            "http.request",
            method=request.method,
            path=request.url.path,
            status=response.status_code,
            duration_ms=duration_ms,
        )

        return response
