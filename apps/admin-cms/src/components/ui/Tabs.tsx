import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, variant = 'underline', className }: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className={cn('flex items-center gap-1 p-1 bg-bg-surface rounded-md', className)}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-1.5',
              activeTab === tab.id ? 'bg-primary-500 text-white shadow-glow-sm' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.icon}{tab.label}
            {tab.badge !== undefined && (
              <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full', activeTab === tab.id ? 'bg-white/20' : 'bg-bg-overlay')}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center border-b border-border', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1.5',
            activeTab === tab.id ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
          )}
        >
          {tab.icon}{tab.label}
          {tab.badge !== undefined && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-bg-overlay">{tab.badge}</span>
          )}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
