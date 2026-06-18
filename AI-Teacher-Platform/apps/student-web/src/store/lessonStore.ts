import { create } from 'zustand';
import type { Lesson, Language, Level } from '@/types';

interface LessonState {
  currentLesson: Lesson | null;
  isGenerating: boolean;
  currentFrame: number;
  isPlaying: boolean;
  selectedLanguage: Language;
  selectedLevel: Level;
  setLesson: (lesson: Lesson) => void;
  setPlaying: (playing: boolean) => void;
  nextFrame: () => void;
  prevFrame: () => void;
  setFrame: (frame: number) => void;
  setLanguage: (lang: Language) => void;
  setLevel: (level: Level) => void;
  setGenerating: (generating: boolean) => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  currentLesson: null,
  isGenerating: false,
  currentFrame: 0,
  isPlaying: false,
  selectedLanguage: 'ne_en',
  selectedLevel: 'medium',

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
  reset: () => set({ currentLesson: null, currentFrame: 0, isPlaying: false, isGenerating: false }),
}));
