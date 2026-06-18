import { cn } from '@/lib/utils';
import Spinner from './Spinner';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const variantStyles = {
  primary: 'btn-primary text-white font-semibold hover:shadow-glow-md active:scale-[0.97]',
  secondary: 'bg-bg-elevated border border-border text-text-primary hover:border-border-glow hover:-translate-y-px hover:shadow-glow-sm',
  ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-primary-500/[0.08]',
  danger: 'bg-gradient-to-r from-accent-rose to-[#E11D48] text-white shadow-[0_4px_16px_rgba(244,63,94,0.4)] hover:shadow-[0_6px_24px_rgba(244,63,94,0.6)] hover:-translate-y-px active:scale-[0.97]',
  outline: 'bg-transparent border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white',
};

const sizeStyles = {
  xs: 'px-2.5 py-1 text-xs rounded-md gap-1',
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-sm gap-2',
  lg: 'px-6 py-3 text-base rounded-sm gap-2.5',
};

export default function Button({
  variant = 'primary', size = 'md', loading, disabled, leftIcon, rightIcon,
  fullWidth, onClick, type = 'button', children, className, title,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-60 pointer-events-none',
        className
      )}
    >
      {loading ? <Spinner size="sm" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
