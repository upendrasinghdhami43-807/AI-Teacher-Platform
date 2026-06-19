/**
 * Teacher Persona types — local copy for student-web.
 */

export type SpeakingLanguage = 'en' | 'ne' | 'ne_en' | 'hi';
export type LessonLevel = 'basic' | 'medium' | 'advanced' | 'recommended';

export interface TeacherPersona {
  id: string;
  name: string;
  tagline: string;
  avatar?: string;
  isLocked: boolean;
  lockedConfig?: {
    language: SpeakingLanguage;
    level: LessonLevel;
  };
  stylePromptKey?: string;
  voiceId?: string;
  active: boolean;
  badgeText?: string;
}

export const TEACHER_PERSONAS: TeacherPersona[] = [
  {
    id: 'ai_teacher',
    name: 'AI Teacher',
    tagline: 'Adapts to you — pick your language, level & pace',
    isLocked: false,
    active: true,
    stylePromptKey: 'default',
    voiceId: 'default',
  },
  {
    id: 'bhupesh_sir',
    name: 'Bhupesh Sir',
    tagline: 'Fixed teaching style — full immersion, no setup',
    isLocked: true,
    lockedConfig: { language: 'ne_en', level: 'recommended' },
    active: true,
    badgeText: 'Style Locked',
    stylePromptKey: 'TODO',
    voiceId: 'TODO',
  },
];
