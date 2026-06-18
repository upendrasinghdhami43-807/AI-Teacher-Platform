import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md';
  color?: 'primary' | 'emerald' | 'amber' | 'rose';
  className?: string;
}

const colorStyles = {
  primary: 'from-primary-500 to-primary-600',
  emerald: 'from-accent-emerald to-emerald-600',
  amber: 'from-accent-amber to-amber-600',
  rose: 'from-accent-rose to-rose-600',
};

export function ProgressBar({ value, max = 100, label, showValue = true, size = 'md', color = 'primary', className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-text-secondary">{label}</span>}
          {showValue && <span className="text-xs font-medium text-text-primary">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-bg-surface overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-500', colorStyles[color])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export function ProgressRing({ value, max = 100, size = 60, strokeWidth = 5, className }: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const isComplete = pct >= 100;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1E2334" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={isComplete ? '#10B981' : '#6366F1'}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-xs font-semibold text-text-primary">{Math.round(pct)}%</span>
    </div>
  );
}

export default function Progress({ value, ...props }: ProgressBarProps) {
  return <ProgressBar value={value} {...props} />;
}
