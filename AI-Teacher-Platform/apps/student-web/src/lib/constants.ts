export const APP_NAME = 'AI Teacher';
export const APP_TAGLINE = 'Learn Any Topic with Your AI Teacher';

export const LANGUAGES = [
  { code: 'ne_en' as const, label: 'Nep+Eng', flag: '🇳🇵', recommended: true },
  { code: 'en' as const, label: 'English', flag: '🇬🇧', recommended: false },
  { code: 'hi' as const, label: 'Hindi', flag: '🇮🇳', recommended: false },
  { code: 'ne' as const, label: 'Nepali', flag: '🇳🇵', recommended: false },
] as const;

export const LEVELS = [
  { code: 'basic' as const, label: 'Basic', icon: '🌱', description: 'Simple explanations with basic vocabulary' },
  { code: 'medium' as const, label: 'Medium', icon: '📘', description: 'Standard depth with clear examples' },
  { code: 'advanced' as const, label: 'Advanced', icon: '🔬', description: 'Deep coverage with technical detail' },
] as const;

export const SUBJECTS = [
  { code: 'physics' as const, label: 'Physics', emoji: '⚛️' },
  { code: 'chemistry' as const, label: 'Chemistry', emoji: '🧪' },
  { code: 'math' as const, label: 'Mathematics', emoji: '∑' },
  { code: 'biology' as const, label: 'Biology', emoji: '🌱' },
  { code: 'computer_science' as const, label: 'Computer Science', emoji: '💻' },
  { code: 'english' as const, label: 'English', emoji: '📖' },
  { code: 'nepali' as const, label: 'Nepali', emoji: '🗒' },
  { code: 'social_studies' as const, label: 'Social Studies', emoji: '🌍' },
] as const;

export const GRADE_OPTIONS = [
  'Class 8', 'Class 9', 'Class 10',
  'Class 11 (Science)', 'Class 11 (Management)', 'Class 11 (Humanities)',
  'Class 12 (Science)', 'Class 12 (Management)', 'Class 12 (Humanities)',
  'Bachelor 1st', 'Bachelor 2nd', 'Bachelor 3rd', 'Bachelor 4th',
] as const;

export const PLANS = {
  free: { name: 'Free', price: 0, priceLabel: 'NPR 0/mo' },
  basic: { name: 'Basic', price: 299, priceLabel: 'NPR 299/mo' },
  pro: { name: 'Pro', price: 599, priceLabel: 'NPR 599/mo' },
} as const;

export const QUICK_TOPICS = [
  "Newton's Laws",
  'Photosynthesis',
  'Pythagoras Theorem',
  'Chemical Bonding',
  'Quadratic Equations',
  'World War II',
  'Computer Memory',
  'Nepal Constitution 2072',
] as const;

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
