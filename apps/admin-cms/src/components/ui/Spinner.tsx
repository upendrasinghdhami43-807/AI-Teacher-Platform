import { cn } from '@/lib/utils';

interface SpinnerProps {
  variant?: 'circle' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
const dotSizes = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' };

export default function Spinner({ variant = 'circle', size = 'md', className }: SpinnerProps) {
  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className={cn('rounded-full bg-primary-500', dotSizes[size])}
            style={{ animation: `dots 1.4s ease-in-out ${i * 0.16}s infinite` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-full border-2 border-border-light border-t-primary-500 animate-spin',
        sizes[size],
        className
      )}
    />
  );
}
