/**
 * Board Element types — rich whiteboard visualization.
 */

export type BoardElementType =
  | 'heading' | 'subheading' | 'text' | 'definition' | 'bullet_list'
  | 'equation' | 'shape' | 'graph' | 'chemistry' | 'table';

export type BoardColor = 'default' | 'blue' | 'green' | 'orange' | 'red';

export interface BoardElementBase {
  id: string;
  sectionId: string;
  type: BoardElementType;
  appearAtMs: number;
  color?: BoardColor;
  position?: { x: number; y: number };
}

export interface HeadingElement extends BoardElementBase {
  type: 'heading' | 'subheading' | 'text' | 'definition';
  content: string;
  underline?: boolean;
}

export interface BulletListElement extends BoardElementBase {
  type: 'bullet_list';
  items: string[];
}

export interface EquationElement extends BoardElementBase {
  type: 'equation';
  latex: string;
  label?: string;
}

export interface ShapeElement extends BoardElementBase {
  type: 'shape';
  shape: 'triangle' | 'rectangle' | 'circle' | 'line' | 'arrow' | 'polygon';
  dimensions: {
    width?: number;
    height?: number;
    radius?: number;
    points?: [number, number][];
  };
  label?: string;
  fillColor?: string;
  strokeColor?: string;
}

export interface GraphElement extends BoardElementBase {
  type: 'graph';
  graphType: 'function' | 'bar' | 'scatter';
  fn?: string;
  domain?: [number, number];
  dataPoints?: { x: number; y: number }[];
  axisLabels?: { x: string; y: string };
}

export interface ChemistryElement extends BoardElementBase {
  type: 'chemistry';
  reaction: string;
}

export interface TableElement extends BoardElementBase {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export type BoardElement =
  | HeadingElement
  | BulletListElement
  | EquationElement
  | ShapeElement
  | GraphElement
  | ChemistryElement
  | TableElement;

/**
 * Lesson Session types
 */
export interface LessonPlanSection {
  id: string;
  title: string;
  keyPoints: string[];
  priority: 'core' | 'optional';
  estimatedSeconds: number;
  visualizationHints: BoardElementType[];
}

export interface LessonPlan {
  resolvedLevel: 'basic' | 'medium' | 'advanced';
  levelResolutionReason?: string;
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
  request: {
    personaId: string;
    topic: string;
    grade: string;
    language: string;
    level: string;
    contextText?: string;
    contextImageUrl?: string;
    maxDurationSeconds: number;
  };
  plan: LessonPlan;
  scripts: ScriptSegment[];
  board: BoardElement[];
  totalDurationSeconds: number;
  wasTrimmed: boolean;
  trimmedSections?: string[];
  createdAt: string;
}
