# AI Teacher Platform — Architecture

## System Overview

AI Teacher Platform is an AI-powered education platform targeting Nepali students from school (Class 8) through bachelor level. The platform features three core learning modes:

1. **AI Teacher** — Students type any topic and receive an instant interactive whiteboard lesson with voice narration
2. **Course-Based Learning** — Structured courses aligned to Nepal's NEB, IOE, and CEE curriculum
3. **Smart PDF Learning** — Upload textbook pages or notes, and AI explains the content

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────┐    ┌──────────────────┐           │
│  │   student-web    │    │    admin-cms     │           │
│  │   React + TS     │    │   React + TS     │           │
│  │   Port: 5173     │    │   Port: 5174     │           │
│  └────────┬─────────┘    └────────┬─────────┘           │
│           │                       │                      │
├───────────┼───────────────────────┼──────────────────────┤
│           ▼                       ▼                      │
│  ┌────────────────────────────────────────────┐          │
│  │           Laravel 12 API (Stage 2)         │          │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │          │
│  │  │ Auth │  │Course│  │ AI   │  │Admin │   │          │
│  │  │      │  │      │  │Engine│  │      │   │          │
│  │  └──────┘  └──────┘  └──┬───┘  └──────┘   │          │
│  └──────────────────────────┼─────────────────┘          │
│                             ▼                            │
│  ┌──────────────────────────────────────────────┐        │
│  │              AI Pipeline (Stage 2+)           │        │
│  │  Director → Script → BoardMapper → TTS        │        │
│  │  (Gemini)   (Gemini)              (Azure)     │        │
│  └──────────────────────────────────────────────┘        │
│                                                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐            │
│  │  MySQL    │  │  Redis    │  │  Storage  │            │
│  │  (Data)   │  │  (Cache)  │  │  (Files)  │            │
│  └───────────┘  └───────────┘  └───────────┘            │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| Student Frontend | React 18 + TypeScript 5 + Vite 5 |
| Admin Frontend | React 18 + TypeScript 5 + Vite 5 |
| CSS Framework | Tailwind CSS v3.4 |
| Icons | Lucide React |
| Charts | Recharts |
| Animations | Framer Motion |
| State Management | Zustand |
| Backend (Stage 2) | Laravel 12 + PHP 8.3 |
| Database | MySQL 8.0 |
| Cache | Redis |
| AI | Google Gemini (lesson generation) |
| TTS | Azure Speech Services + Paaila TTS |
| File Storage | S3-compatible |
| Payments | Khalti + eSewa |

## Stage Roadmap

| Stage | Focus | Status |
|---|---|---|
| Stage 1 | UI Shell + Architecture | ✅ Current |
| Stage 2 | Laravel API + AI Lesson Generation | 🔜 Next |
| Stage 3 | Smart PDF + Gemini Vision | 📋 Planned |
| Stage 4 | Batch Lecture Generation | 📋 Planned |
| Stage 5 | Personas + Advanced AI | 📋 Planned |
