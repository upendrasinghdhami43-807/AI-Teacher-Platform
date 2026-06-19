import { motion } from 'framer-motion';
import type { BulletListElement } from '@/types/board.types';

const colorMap: Record<string, string> = {
  default: '#1E293B',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  red: '#EF4444',
};

interface BulletListRendererProps {
  element: BulletListElement;
}

export default function BulletListRenderer({ element }: BulletListRendererProps) {
  const color = colorMap[element.color || 'default'];

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-2 font-[Kalam,Caveat,cursive] text-base md:text-lg"
      style={{ color }}
    >
      {element.items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
