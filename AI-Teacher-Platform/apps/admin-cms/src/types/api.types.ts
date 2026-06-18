import type { Language, Level, LessonMode, Lesson } from './lesson.types';
import type { Course } from './course.types';
import type { User } from './user.types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

export interface GenerateLessonRequest {
  topic: string;
  language: Language;
  level: Level;
  mode: LessonMode;
  uploaded_file_url?: string;
}

export interface GenerateLessonResponse {
  lesson: Lesson;
  estimated_duration_sec: number;
  credits_used: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: Language;
  timestamp: string;
}

export interface ChatSession {
  session_id: string;
  student_id: string;
  topic: string;
  lesson_id?: string;
  messages: ChatMessage[];
  message_count: number;
  started_at: string;
  ended_at?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  grade?: string;
  school?: string;
}

export interface Analytics {
  total_students: number;
  active_today: number;
  total_sessions_today: number;
  total_lessons: number;
  total_courses: number;
  storage_used_gb: number;
  user_growth: { date: string; count: number }[];
  hourly_activity: { hour: number; count: number }[];
  subject_distribution: { subject: string; count: number }[];
  language_distribution: { language: string; count: number }[];
}

// Re-export all types for convenience
export type { Language, Level, LessonMode, Lesson, Course, User };
