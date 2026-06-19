/**
 * Board Element types — rich whiteboard visualization schema.
 * Additive design: new element types extend BoardElement union.
 */

export type BoardElementType =
  | 'heading' | 'subheading' | 'text' | 'definition' | 'bullet_list'
  | 'equation' | 'shape' | 'graph' | 'chemistry' | 'table';

export type BoardColor = 'default' | 'blue' | 'green' | 'orange' | 'red';

export interface BoardElementBase {
  id: string;
  sectionId: string;
  type: BoardElementType;
  appearAtMs: number;           // relative to section start
  color?: BoardColor;
  position?: { x: number; y: number }; // 0-100, percentage of canvas
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
  latex: string;                // rendered via KaTeX, e.g. "\\frac{d}{dx}(x^2) = 2x"
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
  fn?: string;                  // e.g. "x^2", "sin(x)" — evaluated client-side
  domain?: [number, number];
  dataPoints?: { x: number; y: number }[];
  axisLabels?: { x: string; y: string };
}

export interface ChemistryElement extends BoardElementBase {
  type: 'chemistry';
  reaction: string;             // simplified: "2H2 + O2 -> 2H2O"
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
