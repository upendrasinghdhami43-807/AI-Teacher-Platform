import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  textarea?: boolean;
  rows?: number;
}

export default function Input({
  label, placeholder, type = 'text', value, onChange, error, hint,
  leftIcon, rightIcon, disabled, required, maxLength, className,
  id, name, autoComplete, textarea, rows = 3,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const currentValue = value ?? localValue;

  const handleChange = (val: string) => {
    if (maxLength && val.length > maxLength) return;
    setLocalValue(val);
    onChange?.(val);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const sharedClasses = cn(
    'w-full bg-bg-surface border rounded-sm text-text-primary placeholder:text-text-muted transition-all duration-150',
    'focus:border-border-focus focus:ring-[3px] focus:ring-primary-500/15 focus:outline-none',
    error ? 'border-accent-rose focus:border-accent-rose focus:ring-accent-rose/15' : 'border-border',
    disabled && 'opacity-50 cursor-not-allowed',
    leftIcon ? 'pl-10' : 'pl-3.5',
    (rightIcon || type === 'password') ? 'pr-10' : 'pr-3.5',
    'py-2.5 text-sm',
    className
  );

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-secondary">
          {label} {required && <span className="text-accent-rose">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {leftIcon}
          </span>
        )}
        {textarea ? (
          <textarea
            id={id} name={name} placeholder={placeholder} value={currentValue}
            onChange={e => handleChange(e.target.value)} disabled={disabled}
            rows={rows} maxLength={maxLength}
            className={cn(sharedClasses, 'resize-none')}
          />
        ) : (
          <input
            id={id} name={name} type={inputType} placeholder={placeholder}
            value={currentValue} onChange={e => handleChange(e.target.value)}
            disabled={disabled} maxLength={maxLength} autoComplete={autoComplete}
            className={sharedClasses}
          />
        )}
        {type === 'password' && (
          <button
            type="button" tabIndex={-1}
            onClick={() => setShowPassword(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {rightIcon && type !== 'password' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">{rightIcon}</span>
        )}
      </div>
      {maxLength && (
        <div className="text-right text-xs text-text-muted">{currentValue.length}/{maxLength}</div>
      )}
      {error && <p className="text-xs text-accent-rose">{error}</p>}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
