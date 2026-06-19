import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import type { EquationElement } from '@/types/board.types';

const colorMap: Record<string, string> = {
  default: '#1E293B',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  red: '#EF4444',
};

interface EquationRendererProps {
  element: EquationElement;
}

export default function EquationRenderer({ element }: EquationRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const color = colorMap[element.color || 'orange'];

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(element.latex, containerRef.current, {
          throwOnError: false,
          displayMode: true,
          output: 'html',
        });
      } catch (err) {
        // Fallback: show raw latex
        containerRef.current.textContent = element.latex;
      }
    }
  }, [element.latex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-1"
    >
      {element.label && (
        <p className="text-sm font-[Kalam,Caveat,cursive] text-gray-500 mb-1">{element.label}</p>
      )}
      <div
        ref={containerRef}
        className="text-xl md:text-2xl"
        style={{ color }}
      />
    </motion.div>
  );
}
