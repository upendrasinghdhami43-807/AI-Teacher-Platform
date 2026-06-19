import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-bg-overlay border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-bg-overlay border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-bg-overlay border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-bg-overlay border-y-transparent border-l-transparent',
};

export default function Tooltip({ content, position = 'top', children, className }: TooltipProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => { timeoutRef.current = setTimeout(() => setShow(true), 300); };
  const handleMouseLeave = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setShow(false); };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div className={cn('relative inline-flex', className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn('absolute z-50 pointer-events-none', positionStyles[position])}
          >
            <div className="bg-bg-overlay text-text-primary text-xs px-3 py-1.5 rounded-md border border-border shadow-lg whitespace-nowrap">
              {content}
            </div>
            <div className={cn('absolute border-4', arrowStyles[position])} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
