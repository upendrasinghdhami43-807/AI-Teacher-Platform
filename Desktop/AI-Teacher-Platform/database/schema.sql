-- ═══════════════════════════════════════════════════════════
-- AI TEACHER PLATFORM — COMPLETE DATABASE SCHEMA
-- Stage 1: Documentation only
-- Stage 2: Laravel 12 migrations will implement this
-- ═══════════════════════════════════════════════════════════

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ─── USERS ────────────────────────────────────────────────

CREATE TABLE users (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid                VARCHAR(36) UNIQUE NOT NULL,
  name                VARCHAR(255) NOT NULL,
  email               VARCHAR(255) UNIQUE NOT NULL,
  email_verified_at   TIMESTAMP NULL,
  password            VARCHAR(255) NOT NULL,
  role                ENUM('student','admin','super_admin') DEFAULT 'student',
  plan                ENUM('free','basic','pro') DEFAULT 'free',
  status              ENUM('active','inactive','suspended') DEFAULT 'active',
  avatar_url          VARCHAR(500) NULL,
  phone               VARCHAR(20) NULL,
  grade               VARCHAR(50) NULL,
  school              VARCHAR(255) NULL,
  study_streak        INT UNSIGNED DEFAULT 0,
  total_study_min     INT UNSIGNED DEFAULT 0,
  remember_token      VARCHAR(100) NULL,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_active_at      TIMESTAMP NULL,
  INDEX idx_email  (email),
  INDEX idx_role   (role),
  INDEX idx_status (status),
  INDEX idx_plan   (plan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── STUDENT MEMORY (AI personalization — Stage 2+) ───────

CREATE TABLE student_memory (
  id                       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id               BIGINT UNSIGNED NOT NULL UNIQUE,
  preferred_language       VARCHAR(10) DEFAULT 'ne_en',
  last_level               VARCHAR(20) DEFAULT 'medium',
  weak_topics              JSON COMMENT '["Newton Third Law", "Trigonometry"]',
  last_topics              JSON COMMENT '["Photosynthesis", "Quadratic Equations"]',
  total_sessions           INT UNSIGNED DEFAULT 0,
  avg_session_duration_min DECIMAL(5,2) DEFAULT 0,
  updated_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── COURSES ──────────────────────────────────────────────

CREATE TABLE courses (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid            VARCHAR(36) UNIQUE NOT NULL,
  title           VARCHAR(500) NOT NULL,
  slug            VARCHAR(500) UNIQUE NOT NULL,
  description     TEXT,
  subject         ENUM('physics','chemistry','math','biology','computer_science','nepali','english','social_studies') NOT NULL,
  level           ENUM('class_8','class_9','class_10','class_11','class_12','bachelor') NOT NULL,
  thumbnail_url   VARCHAR(500) NULL,
  instructor_name VARCHAR(255) DEFAULT 'AI Teacher',
  is_free         BOOLEAN DEFAULT TRUE,
  price_npr       DECIMAL(10,2) DEFAULT 0,
  is_published    BOOLEAN DEFAULT FALSE,
  enrolled_count  INT UNSIGNED DEFAULT 0,
  rating          DECIMAL(3,2) DEFAULT 0,
  tags            JSON,
  meta_json       JSON COMMENT 'SEO, preview, extra settings',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_subject   (subject),
  INDEX idx_level     (level),
  INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── CHAPTERS ─────────────────────────────────────────────

CREATE TABLE chapters (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid        VARCHAR(36) UNIQUE NOT NULL,
  course_id   BIGINT UNSIGNED NOT NULL,
  title       VARCHAR(500) NOT NULL,
  description TEXT NULL,
  order_index INT UNSIGNED DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── LESSONS ──────────────────────────────────────────────

CREATE TABLE lessons (
  id                    BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid                  VARCHAR(36) UNIQUE NOT NULL,
  chapter_id            BIGINT UNSIGNED NOT NULL,
  title                 VARCHAR(500) NOT NULL,
  description           TEXT NULL,
  order_index           INT UNSIGNED DEFAULT 0,
  status                ENUM('draft','published','archived') DEFAULT 'draft',
  lesson_json           JSON COMMENT 'ContentBlocks, BoardFrames, VoiceScript, Quiz',
  notes_text            TEXT NULL,
  notes_pdf_url         VARCHAR(500) NULL,
  ai_lecture_generated  BOOLEAN DEFAULT FALSE,
  ai_audio_url          VARCHAR(500) NULL,
  duration_min          INT UNSIGNED DEFAULT 0,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
  INDEX idx_chapter (chapter_id),
  INDEX idx_status  (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── AI LESSONS (free-topic, on-demand) ───────────────────

CREATE TABLE ai_lessons (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid              VARCHAR(36) UNIQUE NOT NULL,
  student_id        BIGINT UNSIGNED NULL,
  mode              ENUM('ai_teacher','course','smart_pdf') NOT NULL,
  topic             VARCHAR(1000) NULL,
  course_lesson_id  BIGINT UNSIGNED NULL,
  smart_pdf_id      BIGINT UNSIGNED NULL,
  language          VARCHAR(10) NOT NULL,
  level             VARCHAR(20) NOT NULL,
  lesson_json       JSON NOT NULL COMMENT 'Full Lesson object output',
  audio_url         VARCHAR(500) NULL,
  cache_key         VARCHAR(500) UNIQUE NULL COMMENT 'For semantic caching in Stage 2',
  generation_ms     INT UNSIGNED NULL,
  credits_used      INT UNSIGNED DEFAULT 1,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_student   (student_id),
  INDEX idx_mode      (mode),
  INDEX idx_cache_key (cache_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── SMART PDFs (admin-uploaded worksheets) ───────────────

CREATE TABLE smart_pdfs (
  id                   BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid                 VARCHAR(36) UNIQUE NOT NULL,
  title                VARCHAR(500) NOT NULL,
  file_url             VARCHAR(500) NOT NULL,
  subject              VARCHAR(100) NULL,
  level                VARCHAR(100) NULL,
  blank_area_analysis  JSON NULL COMMENT 'Gemini vision output: bounding boxes per page',
  overlay_json         JSON NULL COMMENT 'Pre-generated AI overlay content',
  is_published         BOOLEAN DEFAULT FALSE,
  view_count           INT UNSIGNED DEFAULT 0,
  created_by           BIGINT UNSIGNED NOT NULL,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── CHAT SESSIONS ────────────────────────────────────────

CREATE TABLE chat_sessions (
  id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid           VARCHAR(36) UNIQUE NOT NULL,
  student_id     BIGINT UNSIGNED NULL,
  ai_lesson_id   BIGINT UNSIGNED NULL,
  topic          VARCHAR(1000) NULL,
  messages_json  JSON NOT NULL COMMENT 'Array of ChatMessage',
  message_count  INT UNSIGNED DEFAULT 0,
  language       VARCHAR(10) DEFAULT 'ne_en',
  started_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at       TIMESTAMP NULL,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── ENROLLMENTS ──────────────────────────────────────────

CREATE TABLE enrollments (
  id                     BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id             BIGINT UNSIGNED NOT NULL,
  course_id              BIGINT UNSIGNED NOT NULL,
  enrolled_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at           TIMESTAMP NULL,
  completion_percentage  DECIMAL(5,2) DEFAULT 0,
  UNIQUE KEY unique_enrollment (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id)  REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── LESSON PROGRESS ──────────────────────────────────────

CREATE TABLE lesson_progress (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id      BIGINT UNSIGNED NOT NULL,
  lesson_id       BIGINT UNSIGNED NOT NULL,
  completed       BOOLEAN DEFAULT FALSE,
  completed_at    TIMESTAMP NULL,
  time_spent_sec  INT UNSIGNED DEFAULT 0,
  UNIQUE KEY unique_progress (student_id, lesson_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id)  REFERENCES lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── STUDENT EVENTS (analytics) ───────────────────────────

CREATE TABLE student_events (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id  BIGINT UNSIGNED NULL,
  event_type  ENUM(
                'lesson_started','lesson_completed','question_asked',
                'course_enrolled','pdf_uploaded','session_ended',
                'quiz_attempted','quiz_passed'
              ) NOT NULL,
  payload     JSON NULL,
  ip_address  VARCHAR(45) NULL,
  user_agent  VARCHAR(500) NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_student    (student_id),
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── AI PERSONAS ──────────────────────────────────────────

CREATE TABLE personas (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid         VARCHAR(36) UNIQUE NOT NULL,
  name         VARCHAR(255) NOT NULL,
  tagline      VARCHAR(500) NULL,
  description  TEXT NULL,
  style_prompt TEXT NULL COMMENT 'Injected into Director/Script prompts in Stage 2',
  voice_id     VARCHAR(100) NULL COMMENT 'Azure TTS voice ID',
  avatar_url   VARCHAR(500) NULL,
  color_hex    VARCHAR(7) NULL,
  is_active    BOOLEAN DEFAULT TRUE,
  is_premium   BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── AI LECTURE LIBRARY ───────────────────────────────────

CREATE TABLE ai_lecture_library (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid                VARCHAR(36) UNIQUE NOT NULL,
  lesson_id           BIGINT UNSIGNED NULL,
  title               VARCHAR(500) NOT NULL,
  language            VARCHAR(10) NOT NULL,
  level               VARCHAR(20) NULL,
  audio_url           VARCHAR(500) NULL,
  lesson_json         JSON NOT NULL,
  duration_sec        INT UNSIGNED DEFAULT 0,
  generation_status   ENUM('pending','generating','completed','failed') DEFAULT 'pending',
  batch_job_id        VARCHAR(255) NULL COMMENT 'Gemini Batch API job ID',
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
