/**
 * Teacher Persona types — data-driven persona system.
 * Adding a new persona = add a record to PERSONAS array + a prompt template.
 */

export type SpeakingLanguage = 'en' | 'ne' | 'ne_en' | 'hi';
export type LessonLevel = 'basic' | 'medium' | 'advanced' | 'recommended';

export interface TeacherPersona {
  id: string;
  name: string;
  tagline: string;
  avatar?: string;
  isLocked: boolean;            // true = language/level fixed by persona, not user
  lockedConfig?: {
    language: SpeakingLanguage;
    level: LessonLevel;
  };
  stylePromptKey?: string;      // TODO: backend prompt template id, wired later
  voiceId?: string;             // TODO: TTS voice id, wired later
  active: boolean;              // false = greyed out / "coming soon"
  badgeText?: string;           // e.g. "Coming Soon — Style Locked"
}

/** Seed data — exactly 2 personas for Stage 2B */
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
    lockedConfig: {
      language: 'ne_en',
      level: 'recommended',
    },
    active: true,
    badgeText: 'Coming Soon — Style Locked',
    stylePromptKey: 'TODO',   // Will be replaced with real style template
    voiceId: 'TODO',          // Will be replaced with cloned voice ID
  },
];
