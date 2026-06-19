import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BoardElement } from '@/types/board.types';
import HeadingRenderer from './HeadingRenderer';
import BulletListRenderer from './BulletListRenderer';
import EquationRenderer from './EquationRenderer';
import ShapeRenderer from './ShapeRenderer';
import GraphRenderer from './GraphRenderer';
import ChemistryRenderer from './ChemistryRenderer';
import TableRenderer from './TableRenderer';

interface BoardCanvasProps {
  elements: BoardElement[];
  currentTimeMs: number;
  activeSectionId?: string;
}

/**
 * BoardCanvas — main whiteboard renderer.
 * Shows elements whose appearAtMs <= currentTimeMs.
 * Ruled-paper light background, handwriting font.
 */
export default function BoardCanvas({ elements, currentTimeMs, activeSectionId }: BoardCanvasProps) {
  // Filter elements that should be visible at current time
  const visibleElements = useMemo(() => {
    return elements.filter(el => {
      const shouldShow = el.appearAtMs <= currentTimeMs;
      // If we have an active section, only show elements from current + past sections
      return shouldShow;
    });
  }, [elements, currentTimeMs]);

  const renderElement = (el: BoardElement) => {
    switch (el.type) {
      case 'heading':
      case 'subheading':
      case 'text':
      case 'definition':
        return <HeadingRenderer element={el as any} />;
      case 'bullet_list':
        return <BulletListRenderer element={el as any} />;
      case 'equation':
        return <EquationRenderer element={el as any} />;
      case 'shape':
        return <ShapeRenderer element={el as any} />;
      case 'graph':
        return <GraphRenderer element={el as any} />;
      case 'chemistry':
        return <ChemistryRenderer element={el as any} />;
      case 'table':
        return <TableRenderer element={el as any} />;
      default:
        return null;
    }
  };

  return (
    <div className="board-canvas relative w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
      style={{
        background: '#FEFDF8',
        backgroundImage: `
          repeating-linear-gradient(transparent, transparent 31px, #E8E4DA 31px, #E8E4DA 32px),
          linear-gradient(90deg, #F0ECDF 1px, transparent 1px)
        `,
        backgroundSize: '100% 32px, 60px 32px',
      }}
    >
      {/* Left margin line */}
      <div
        className="absolute left-[60px] top-0 bottom-0 w-[2px] opacity-30"
        style={{ background: '#E8A0A0' }}
      />

      {/* Content area */}
      <div className="relative pl-[80px] pr-6 py-6 space-y-5 min-h-full">
        <AnimatePresence mode="sync">
          {visibleElements.map(el => (
            <motion.div
              key={el.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={el.position ? {
                position: 'absolute',
                left: `${Math.max(80, (el.position.x / 100) * 100)}%`,
                top: `${(el.position.y / 100) * 100}%`,
                maxWidth: '50%',
              } : undefined}
              className={!el.position ? 'relative' : undefined}
            >
              {renderElement(el)}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {visibleElements.length === 0 && (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <p className="text-gray-400 font-[Kalam,Caveat,cursive] text-xl italic">
              Board will fill as the lesson progresses...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
