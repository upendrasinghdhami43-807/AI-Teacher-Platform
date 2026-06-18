import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline';
  className?: string;
}

const sizeStyles = { xs: 'w-6 h-6 text-[10px]', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };
const dotSizes = { xs: 'w-1.5 h-1.5', sm: 'w-2 h-2', md: 'w-2.5 h-2.5', lg: 'w-3 h-3', xl: 'w-3.5 h-3.5' };

export default function Avatar({ src, name, size = 'md', status, className }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img src={src} alt={name} className={cn('rounded-full object-cover', sizeStyles[size])} />
      ) : (
        <div className={cn(
          'rounded-full flex items-center justify-center font-semibold text-white',
          'bg-gradient-to-br from-primary-500 to-accent-violet',
          sizeStyles[size]
        )}>
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-bg-surface',
          dotSizes[size],
          status === 'online' ? 'bg-accent-emerald' : 'bg-text-muted'
        )} />
      )}
    </div>
  );
}
