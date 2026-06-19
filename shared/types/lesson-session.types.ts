/**
 * Lesson Session types — data contracts between frontend ↔ backend.
 */

import type { SpeakingLanguage, LessonLevel } from './teacher-persona.types';
import type { BoardElementType, BoardElement } from './board-element.types';

export interface LessonRequest {
  personaId: string;
  topic: string;
  grade: string;                // e.g. "class_11_science", "bachelors"
  language: SpeakingLanguage;   // resolved value if persona is locked
  level: LessonLevel;           // may be "recommended" going in
  contextText?: string;
  contextImageUrl?: string;
  maxDurationSeconds: 300;      // hard cap
}

export interface LessonPlanSection {
  id: string;
  title: string;
  keyPoints: string[];
  priority: 'core' | 'optional';
  estimatedSeconds: number;
  visualizationHints: BoardElementType[];
}

export interface LessonPlan {
  resolvedLevel: Exclude<LessonLevel, 'recommended'>;
  levelResolutionReason?: string;  // only set if level was "recommended"
  sections: LessonPlanSection[];
  totalEstimatedSeconds: number;
}

export interface ScriptSegment {
  sectionId: string;
  text: string;
  wordCount: number;
  estimatedSeconds: number;
}

export interface LessonSession {
  id: string;
  request: LessonRequest;
  plan: LessonPlan;
  scripts: ScriptSegment[];
  board: BoardElement[];        // flattened, each tagged with sectionId
  totalDurationSeconds: number; // actual, post-generation, must be <= 300
  wasTrimmed: boolean;
  trimmedSections?: string[];
  createdAt: string;
}
