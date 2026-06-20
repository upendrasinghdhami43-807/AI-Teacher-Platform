import { create } from 'zustand';
import type { Language, Level, Lesson } from '@/types';
import type { LessonSession } from '@/types/board.types';

interface LessonState {
  // Existing
  currentLesson: Lesson | null;
  isGenerating: boolean;
  currentFrame: number;
  isPlaying: boolean;
  selectedLanguage: Language;
  selectedLevel: Level;

  // Stage 2B additions
  selectedPersonaId: string;
  session: LessonSession | null;
  currentSectionIndex: number;
  currentTimeMs: number;
  totalDurationMs: number;
  contextImages: File[];

  // Actions
  setLesson: (lesson: Lesson) => void;
  setPlaying: (playing: boolean) => void;
  nextFrame: () => void;
  prevFrame: () => void;
  setFrame: (frame: number) => void;
  setLanguage: (lang: Language) => void;
  setLevel: (level: Level) => void;
  setGenerating: (generating: boolean) => void;
  setPersona: (personaId: string) => void;
  setSession: (session: LessonSession) => void;
  setSectionIndex: (index: number) => void;
  setCurrentTime: (ms: number) => void;
  setContextImages: (images: File[]) => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  currentLesson: null,
  isGenerating: false,
  currentFrame: 0,
  isPlaying: false,
  selectedLanguage: 'ne_en',
  selectedLevel: 'medium',

  // Stage 2B
  selectedPersonaId: 'ai_teacher',
  session: null,
  currentSectionIndex: 0,
  currentTimeMs: 0,
  totalDurationMs: 0,
  contextImages: [],

  setLesson: (lesson) => set({ currentLesson: lesson, currentFrame: 0, isPlaying: false }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  nextFrame: () => {
    const { currentFrame, currentLesson } = get();
    if (currentLesson && currentFrame < currentLesson.frames.length - 1) {
      set({ currentFrame: currentFrame + 1 });
    }
  },
  prevFrame: () => {
    const { currentFrame } = get();
    if (currentFrame > 0) set({ currentFrame: currentFrame - 1 });
  },
  setFrame: (frame) => set({ currentFrame: frame }),
  setLanguage: (lang) => set({ selectedLanguage: lang }),
  setLevel: (level) => set({ selectedLevel: level }),
  setGenerating: (generating) => set({ isGenerating: generating }),
  setPersona: (personaId) => set({ selectedPersonaId: personaId }),
  setSession: (session) => set({
    session,
    currentSectionIndex: 0,
    currentTimeMs: 0,
    totalDurationMs: session.totalDurationSeconds * 1000,
    isPlaying: false,
  }),
  setSectionIndex: (index) => set({ currentSectionIndex: index }),
  setCurrentTime: (ms) => set({ currentTimeMs: ms }),
  setContextImages: (images) => set({ contextImages: images }),
  reset: () => set({
    currentLesson: null, currentFrame: 0, isPlaying: false,
    isGenerating: false, session: null, currentSectionIndex: 0,
    currentTimeMs: 0, totalDurationMs: 0, contextImages: [],
  }),
}));
