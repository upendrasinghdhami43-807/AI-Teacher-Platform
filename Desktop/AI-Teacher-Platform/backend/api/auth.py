"""Auth API endpoints — register + login with JWT."""

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.connection import get_db
from middleware.auth import create_access_token, hash_password, verify_password
from models.student import Student

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(min_length=6)
    grade: str | None = None
    school: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    student: dict


@router.post("/register", response_model=AuthResponse, status_code=201)
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new student account."""
    # Check email uniqueness
    result = await db.execute(
        select(Student).where(Student.email == req.email)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    student = Student(
        id=str(uuid.uuid4()),
        name=req.name,
        email=req.email,
        password_hash=hash_password(req.password),
        grade=req.grade,
        school=req.school,
    )
    db.add(student)
    await db.commit()
    await db.refresh(student)

    token = create_access_token(student.id)

    return AuthResponse(
        access_token=token,
        student={
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "grade": student.grade,
            "plan": student.plan,
        },
    )


@router.post("/login", response_model=AuthResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with email and password."""
    result = await db.execute(
        select(Student).where(Student.email == req.email)
    )
    student = result.scalar_one_or_none()

    if not student or not verify_password(req.password, student.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not student.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )

    token = create_access_token(student.id)

    return AuthResponse(
        access_token=token,
        student={
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "grade": student.grade,
            "plan": student.plan,
        },
    )
