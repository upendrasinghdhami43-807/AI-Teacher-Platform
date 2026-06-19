import { motion } from 'framer-motion';
import type { HeadingElement } from '@/types/board.types';
import { cn } from '@/lib/utils';

const colorMap: Record<string, string> = {
  default: '#1E293B',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  red: '#EF4444',
};

interface HeadingRendererProps {
  element: HeadingElement;
}

export default function HeadingRenderer({ element }: HeadingRendererProps) {
  const color = colorMap[element.color || 'default'];
  const isHeading = element.type === 'heading';
  const isSubheading = element.type === 'subheading';
  const isDefinition = element.type === 'definition';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ color }}
      className={cn(
        'font-[Kalam,Caveat,cursive]',
        isHeading && 'text-2xl md:text-3xl font-bold',
        isSubheading && 'text-xl md:text-2xl font-semibold',
        isDefinition && 'text-lg md:text-xl',
        element.type === 'text' && 'text-base md:text-lg',
      )}
    >
      <span className={cn(element.underline && 'underline decoration-2 underline-offset-4')}>
        {element.content}
      </span>
    </motion.div>
  );
}
