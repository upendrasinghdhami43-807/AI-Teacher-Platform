/*
 * STAGE 2 INTEGRATION:
 * Replace all mock implementations with real fetch calls to Laravel API.
 * Base URL from VITE_API_URL environment variable.
 * Add: Authorization: Bearer {token} header from authStore.
 * Add: request interceptor for 401 → auto logout.
 */

import type { GenerateLessonRequest, RegisterData } from '@/types/api.types';
import { mockLessons } from '@/data/mockLessons';
import { mockCourses } from '@/data/mockCourses';
import { delay } from '@/lib/utils';

export const api = {
  auth: {
    login: async (_email: string, _password: string) => {
      await delay(800);
      return { success: true };
    },
    register: async (_data: RegisterData) => {
      await delay(1200);
      return { success: true };
    },
    logout: async () => {
      await delay(200);
      return { success: true };
    },
  },
  lessons: {
    generate: async (_req: GenerateLessonRequest) => {
      await delay(2000);
      return { lesson: mockLessons[0], estimated_duration_sec: 420, credits_used: 1 };
    },
    getHistory: async (_page = 1) => {
      await delay(500);
      return { data: mockLessons, total: mockLessons.length, page: 1, per_page: 20, last_page: 1 };
    },
    getById: async (id: string) => {
      await delay(300);
      return mockLessons.find(l => l.lesson_id === id) || mockLessons[0];
    },
  },
  courses: {
    list: async (_filters?: object) => {
      await delay(400);
      return { data: mockCourses, total: mockCourses.length, page: 1, per_page: 20, last_page: 1 };
    },
    getById: async (id: string) => {
      await delay(300);
      return mockCourses.find(c => c.course_id === id) || mockCourses[0];
    },
    enroll: async (_courseId: string) => {
      await delay(600);
      return { success: true };
    },
  },
  chat: {
    send: async (_sessionId: string, _message: string) => {
      await delay(1500);
      return {
        id: `msg-${Date.now()}`, role: 'assistant' as const,
        content: 'यो एउटा demo reply हो। Stage 2 मा real AI reply आउनेछ।',
        language: 'ne_en' as const, timestamp: new Date().toISOString(),
      };
    },
    getSession: async (_sessionId: string) => {
      await delay(300);
      return { session_id: 'demo', student_id: 'u-001', topic: 'Demo', messages: [], message_count: 0, started_at: new Date().toISOString() };
    },
  },
  pdf: {
    upload: async (_file: File) => {
      await delay(2000);
      return { file_url: '/mock/uploaded.pdf', analysis: {} };
    },
  },
};
