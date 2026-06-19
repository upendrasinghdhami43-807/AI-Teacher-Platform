export type Language = 'en' | 'ne' | 'hi' | 'ne_en';
export type Level = 'basic' | 'medium' | 'advanced' | 'recommended';
export type LessonMode = 'ai_teacher' | 'course' | 'smart_pdf';

export interface VoiceSegment {
  lang: Language;
  text: string;
  audio_url?: string;
  start_ms?: number;
  end_ms?: number;
}

export interface BoardAction {
  action:
    | 'write_title'
    | 'write_text'
    | 'draw_shape'
    | 'write_formula'
    | 'highlight'
    | 'clear'
    | 'draw_diagram'
    | 'draw_arrow';
  text?: string;
  formula?: string;
  shape?: 'rectangle' | 'circle' | 'triangle' | 'arrow';
  position?: { x: number; y: number; w: number; h: number };
  color?: string;
  style?: 'heading' | 'body' | 'formula' | 'highlight' | 'diagram';
}

export interface LessonFrame {
  frame_id: number;
  start_sec: number;
  duration_sec: number;
  board: BoardAction;
  voice_segments: VoiceSegment[];
}

export interface LessonSource {
  topic?: string;
  course_lesson_id?: string | null;
  smart_pdf_id?: string | null;
  uploaded_file_url?: string | null;
}

export interface Lesson {
  lesson_id: string;
  mode: LessonMode;
  title: string;
  summary?: string;
  source: LessonSource;
  language: Language;
  level: Level;
  version: number;
  created_at: string;
  frames: LessonFrame[];
  audio_url: string;
  cache_key: string;
  duration_sec: number;
}
