import type { Language } from './lesson.types';

export type Subject =
  | 'physics' | 'chemistry' | 'math' | 'biology'
  | 'computer_science' | 'nepali' | 'english' | 'social_studies';

export type CourseLevel =
  | 'class_8' | 'class_9' | 'class_10'
  | 'class_11' | 'class_12' | 'bachelor';

export type LessonStatus = 'draft' | 'published' | 'archived';

export interface ContentBlock {
  type: 'text' | 'formula' | 'image' | 'list' | 'code' | 'note';
  content: string;
  order: number;
}

export interface BoardFrame {
  id: number;
  type: 'title' | 'content' | 'diagram' | 'formula' | 'example' | 'summary';
  content: string;
  duration_sec: number;
}

export interface VoiceScript {
  segment_id: number;
  lang: Language;
  text: string;
  timing_start_sec: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LessonJSON {
  title: string;
  chapter: string;
  content: ContentBlock[];
  board_frames: BoardFrame[];
  voice_script: VoiceScript[];
  quiz: QuizQuestion[];
}

export interface CourseLesson {
  lesson_id: string;
  title: string;
  description: string;
  order: number;
  duration_min: number;
  status: LessonStatus;
  has_ai_lecture: boolean;
  has_notes: boolean;
  has_quiz: boolean;
  lesson_json?: LessonJSON;
}

export interface CourseChapter {
  chapter_id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
}

export interface Course {
  course_id: string;
  title: string;
  slug: string;
  description: string;
  subject: Subject;
  level: CourseLevel;
  thumbnail_url?: string;
  instructor_name: string;
  total_lessons: number;
  total_duration_min: number;
  enrolled_count: number;
  rating: number;
  is_free: boolean;
  price_npr?: number;
  chapters: CourseChapter[];
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
