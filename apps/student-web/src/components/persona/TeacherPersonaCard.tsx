import { cn } from '@/lib/utils';
import { BrainCircuit, User, Lock, Sparkles } from 'lucide-react';
import type { TeacherPersona } from '@/types/persona.types';

interface TeacherPersonaCardProps {
  persona: TeacherPersona;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function TeacherPersonaCard({ persona, isSelected, onSelect }: TeacherPersonaCardProps) {
  const isAiTeacher = persona.id === 'ai_teacher';

  return (
    <button
      onClick={() => persona.active && onSelect(persona.id)}
      className={cn(
        'relative flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all duration-300 group w-full',
        isSelected
          ? 'border-primary-500 bg-primary-500/[0.08] shadow-glow-sm'
          : 'border-border bg-bg-surface hover:border-primary-500/30 hover:bg-bg-hover',
        !persona.active && 'opacity-40 cursor-not-allowed'
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Badge */}
      {persona.badgeText && (
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 bg-accent-amber/10 text-accent-amber text-[10px] font-semibold rounded-full border border-accent-amber/20">
          <Lock size={10} />
          {persona.badgeText}
        </div>
      )}

      {/* Avatar */}
      <div className={cn(
        'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300',
        isAiTeacher
          ? 'gradient-brand shadow-glow-sm'
          : 'bg-accent-violet/20 border border-accent-violet/30',
        isSelected && 'scale-110'
      )}>
        {isAiTeacher ? (
          <BrainCircuit size={28} className="text-white" />
        ) : (
          <div className="flex flex-col items-center">
            <User size={20} className="text-accent-violet" />
            <span className="text-[8px] font-bold text-accent-violet mt-0.5">BS</span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className={cn(
        'text-lg font-display font-bold mb-1 transition-colors',
        isSelected ? 'text-white' : 'text-text-primary group-hover:text-white'
      )}>
        {persona.name}
      </h3>

      {/* Tagline */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {persona.tagline}
      </p>

      {/* Features */}
      <div className="mt-4 flex items-center gap-2">
        {isAiTeacher ? (
          <>
            <span className="px-2 py-0.5 bg-primary-500/10 text-primary-400 text-[10px] font-medium rounded-full">Customizable</span>
            <span className="px-2 py-0.5 bg-accent-cyan/10 text-accent-cyan text-[10px] font-medium rounded-full">Multi-language</span>
          </>
        ) : (
          <>
            <span className="px-2 py-0.5 bg-accent-violet/10 text-accent-violet text-[10px] font-medium rounded-full">Neplish</span>
            <span className="px-2 py-0.5 bg-accent-amber/10 text-accent-amber text-[10px] font-medium rounded-full">Fixed Style</span>
          </>
        )}
      </div>

      {/* Glow effect when selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 pointer-events-none" />
      )}
    </button>
  );
}
