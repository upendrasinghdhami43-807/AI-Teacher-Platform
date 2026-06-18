/**
 * Utility to conditionally join class names.
 * Simplified version without clsx dependency.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format duration in minutes to "Xh Ym" string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Format duration in seconds to "M:SS" string
 */
export function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get greeting based on current hour
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Truncate text to maxLength characters with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate initials from a name (max 2 chars)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Format a number with compact notation (1.2K, 3.4M)
 */
export function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Generate a UUID v4 (for mock data)
 */
export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Simulate API delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get subject color class for badges
 */
export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    physics: 'bg-primary-500/20 text-primary-300',
    chemistry: 'bg-accent-violet/20 text-accent-violet',
    math: 'bg-accent-cyan/20 text-accent-cyan',
    biology: 'bg-accent-emerald/20 text-accent-emerald',
    computer_science: 'bg-accent-orange/20 text-accent-orange',
    english: 'bg-accent-amber/20 text-accent-amber',
    nepali: 'bg-accent-rose/20 text-accent-rose',
    social_studies: 'bg-primary-400/20 text-primary-300',
  };
  return colors[subject] || 'bg-bg-elevated text-text-secondary';
}

/**
 * Get level color class for badges
 */
export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    basic: 'bg-accent-emerald/20 text-accent-emerald',
    medium: 'bg-accent-amber/20 text-accent-amber',
    advanced: 'bg-accent-rose/20 text-accent-rose',
    recommended: 'bg-primary-500/20 text-primary-300',
  };
  return colors[level] || 'bg-bg-elevated text-text-secondary';
}
