# AI Teacher Platform

An AI-powered education platform for Nepali students — from Class 8 through Bachelor level.

## Features

- **AI Teacher** — Type any topic, get an instant whiteboard lesson with voice narration
- **Structured Courses** — NEB, IOE & CEE-aligned curriculum
- **PDF Learning** — Upload notes or textbooks, AI explains every concept
- **Multilingual** — Nepali, English, Hindi, and Nepali-English mixed
- **Personalized AI** — Remembers your weak topics and adjusts lessons

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
# Run both apps
npm run dev

# Student app only (port 5173)
npm run dev:student

# Admin CMS only (port 5174)
npm run dev:admin
```

## Project Structure

```
AI-Teacher-Platform/
├── apps/
│   ├── student-web/     # Student-facing React SPA (:5173)
│   └── admin-cms/       # Super Admin CMS React SPA (:5174)
├── backend/             # Stage 2 — Laravel 12 API
├── database/            # SQL schema + JSON contracts
├── docs/                # Architecture + API docs
└── shared/              # Shared type definitions
```

## Stage Roadmap

| Stage | Focus | Status |
|---|---|---|
| 1 | UI Shell + Architecture | ✅ Current |
| 2 | Laravel API + AI Lesson Generation | 🔜 |
| 3 | Smart PDF + Gemini Vision | 📋 |
| 4 | Batch Lecture Generation | 📋 |
| 5 | Personas + Advanced AI | 📋 |

## Tech Stack

React 18 · TypeScript 5 · Vite 5 · Tailwind CSS 3.4 · Lucide · Recharts · Framer Motion · Zustand

---

*Built for Nepal 🇳🇵*
