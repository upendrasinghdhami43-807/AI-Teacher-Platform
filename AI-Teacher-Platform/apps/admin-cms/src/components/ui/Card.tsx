import { cn } from '@/lib/utils';

interface CardProps {
  variant?: 'default' | 'elevated' | 'glow' | 'glass' | 'gradient';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantStyles = {
  default: 'bg-bg-elevated border border-border',
  elevated: 'bg-bg-overlay border border-border shadow-card',
  glow: 'bg-bg-elevated border border-border-glow shadow-glow-sm',
  glass: 'glass',
  gradient: 'bg-gradient-to-br from-bg-elevated to-bg-surface border border-border',
};

const paddingStyles = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' };

export default function Card({ variant = 'default', hover = false, padding = 'md', className, children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-md transition-all duration-150',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'cursor-pointer hover:border-border-glow hover:shadow-glow-sm hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
