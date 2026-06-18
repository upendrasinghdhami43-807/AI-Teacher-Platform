# Backend — Stage 2

This directory will contain the **Laravel 12 API** backend in Stage 2.

## Planned Components

- **Authentication** — Laravel Sanctum (SPA token auth)
- **REST API** — Course, lesson, user, chat endpoints
- **AI Pipeline** — Gemini Director → Script → BoardMapper
- **TTS Integration** — Azure Speech Services + Paaila TTS
- **File Storage** — S3 for PDFs, audio, images
- **Caching** — Redis for lesson semantic cache
- **Queue** — Laravel Horizon for batch AI generation

## Setup (Stage 2)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
