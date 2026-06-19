import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'primary' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'muted' | 'success' | 'warning' | 'danger' | 'glass' | 'glow';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
  cyan: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
  emerald: 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30',
  amber: 'bg-accent-amber/20 text-accent-amber border-accent-amber/30',
  rose: 'bg-accent-rose/20 text-accent-rose border-accent-rose/30',
  violet: 'bg-accent-violet/20 text-accent-violet border-accent-violet/30',
  muted: 'bg-bg-overlay text-text-secondary border-border',
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  danger: 'bg-red-500/20 text-red-400 border-red-500/30',
  glass: 'bg-white/10 text-white border-white/20 backdrop-blur-sm',
  glow: 'bg-primary-500/20 text-primary-300 border-primary-500/50 shadow-[0_0_10px_rgba(14,165,233,0.5)]',
};

const dotColors = {
  primary: 'bg-primary-500', cyan: 'bg-accent-cyan', emerald: 'bg-accent-emerald',
  amber: 'bg-accent-amber', rose: 'bg-accent-rose', violet: 'bg-accent-violet', muted: 'bg-text-muted',
  success: 'bg-green-500', warning: 'bg-yellow-500', danger: 'bg-red-500', glass: 'bg-white', glow: 'bg-primary-500'
};

export default function Badge({ variant = 'primary', size = 'sm', dot, children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap',
      variantStyles[variant],
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
      className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
