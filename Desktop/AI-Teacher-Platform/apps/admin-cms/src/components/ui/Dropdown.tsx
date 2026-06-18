import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  danger?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  align?: 'left' | 'right';
  className?: string;
}

export default function Dropdown({ trigger, items, onSelect, align = 'left', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    const actionItems = items.filter(i => !i.divider);
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIndex(i => Math.min(i + 1, actionItems.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIndex(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && focusIndex >= 0) { onSelect(actionItems[focusIndex].value); setOpen(false); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={ref} className={cn('relative inline-flex', className)} onKeyDown={handleKeyDown}>
      <div onClick={() => { setOpen(o => !o); setFocusIndex(-1); }} className="cursor-pointer">{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 top-full mt-1 min-w-[180px] bg-bg-overlay border border-border rounded-md shadow-modal py-1 overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            {items.map((item, i) => item.divider ? (
              <div key={i} className="h-px bg-border my-1" />
            ) : (
              <button
                key={item.value}
                onClick={() => { onSelect(item.value); setOpen(false); }}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors',
                  item.danger ? 'text-accent-rose hover:bg-accent-rose/10' : 'text-text-primary hover:bg-bg-hover',
                  focusIndex === items.filter(x => !x.divider).indexOf(item) && 'bg-bg-hover'
                )}
              >
                {item.icon}{item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SelectDropdownProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SelectDropdown({ value, options, onChange, placeholder = 'Select...', className }: SelectDropdownProps) {
  const selected = options.find(o => o.value === value);
  return (
    <Dropdown
      trigger={
        <div className={cn('flex items-center gap-2 px-3 py-2 bg-bg-surface border border-border rounded-sm text-sm cursor-pointer hover:border-border-glow transition-colors', className)}>
          <span className={selected ? 'text-text-primary' : 'text-text-muted'}>{selected?.label || placeholder}</span>
          <ChevronDown size={14} className="text-text-muted" />
        </div>
      }
      items={options.map(o => ({ label: o.label, value: o.value }))}
      onSelect={onChange}
    />
  );
}
