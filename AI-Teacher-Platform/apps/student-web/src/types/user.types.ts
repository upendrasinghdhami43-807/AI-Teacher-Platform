import type { Language, Level } from './lesson.types';

export type UserRole = 'student' | 'admin' | 'super_admin';
export type UserPlan = 'free' | 'basic' | 'pro';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface StudentMemory {
  student_id: string;
  preferred_language: Language;
  last_level: Level;
  weak_topics: string[];
  last_topics: string[];
  total_sessions: number;
  avg_session_duration_min: number;
  updated_at: string;
}

export interface StudentProgress {
  course_id: string;
  completed_lessons: string[];
  current_lesson_id: string;
  completion_percentage: number;
  last_accessed_at: string;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
  avatar_url?: string;
  phone?: string;
  grade?: string;
  school?: string;
  enrolled_courses: string[];
  progress: StudentProgress[];
  memory?: StudentMemory;
  study_streak: number;
  total_study_time_min: number;
  created_at: string;
  last_active_at: string;
}
