import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#08080F',
          surface: '#0F0F1A',
          elevated: '#161625',
          overlay: '#1E1E30',
          hover: '#1A1A28',
        },
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          900: '#312E81',
        },
        accent: {
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          orange: '#F97316',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
          disabled: '#334155',
          inverse: '#0F0F1A',
        },
        border: {
          DEFAULT: '#1E2334',
          light: '#252B3B',
          focus: '#6366F1',
          glow: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(99,102,241,0.2)',
        'glow-md': '0 0 30px rgba(99,102,241,0.25)',
        'glow-lg': '0 0 60px rgba(99,102,241,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.5)',
        'modal': '0 25px 60px rgba(0,0,0,0.7)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

export default config;
