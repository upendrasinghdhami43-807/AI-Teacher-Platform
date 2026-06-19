"""Shared Pydantic schemas — pagination, error responses."""

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    detail: str
    error_code: str = ""


class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1)
    per_page: int = Field(default=10, ge=1, le=100)


class PaginatedResponse(BaseModel):
    items: list = Field(default_factory=list)
    total: int = 0
    page: int = 1
    per_page: int = 10
    total_pages: int = 0
