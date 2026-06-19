# API Contracts — Stage 2

This document defines the REST API contracts between the frontend apps and the Laravel 12 backend.

**Base URL:** `http://localhost:8000/api` (development) / `https://api.aiteacher.np/api` (production)

## Authentication

All protected endpoints require: `Authorization: Bearer {token}`

### POST /auth/login
**Request:** `{ email: string, password: string }`
**Response:** `{ success: true, data: { user: User, token: string } }`

### POST /auth/register
**Request:** `RegisterData`
**Response:** `{ success: true, data: { user: User, token: string } }`

### POST /auth/logout
**Response:** `{ success: true, message: "Logged out" }`

## AI Lessons

### POST /ai/generate-lesson
**Request:** `GenerateLessonRequest`
**Response:** `GenerateLessonResponse` (SSE stream in production)

### GET /ai/lessons?page=1&per_page=20
**Response:** `PaginatedResponse<Lesson>`

### GET /ai/lessons/:id
**Response:** `ApiResponse<Lesson>`

## Courses

### GET /courses?subject=physics&level=class_11&page=1
**Response:** `PaginatedResponse<Course>`

### GET /courses/:id
**Response:** `ApiResponse<Course>`

### POST /courses/:id/enroll
**Response:** `ApiResponse<{ enrolled: true }>`

## Chat

### POST /chat/send
**Request:** `{ session_id: string, message: string, language: Language }`
**Response:** `ApiResponse<ChatMessage>` (SSE stream in production)

### GET /chat/sessions/:id
**Response:** `ApiResponse<ChatSession>`

## PDF Learning

### POST /pdf/upload
**Request:** `multipart/form-data { file: File }`
**Response:** `ApiResponse<{ file_url: string, analysis: object }>`

## Admin Endpoints

All admin endpoints require `role: admin | super_admin`

### GET /admin/analytics
### GET /admin/users?page=1&status=active
### PUT /admin/users/:id
### GET /admin/courses (with draft/archived visibility)
### POST /admin/courses
### PUT /admin/courses/:id
### POST /admin/courses/:id/lessons
### GET /admin/chat-sessions
### GET /admin/personas
### POST /admin/personas
### PUT /admin/settings
