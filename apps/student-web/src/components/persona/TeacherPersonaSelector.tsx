import TeacherPersonaCard from './TeacherPersonaCard';
import { TEACHER_PERSONAS } from '@/types/persona.types';
import { Users } from 'lucide-react';

interface TeacherPersonaSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function TeacherPersonaSelector({ selectedId, onSelect }: TeacherPersonaSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-primary-400" />
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Choose Your Teacher</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEACHER_PERSONAS.map(persona => (
          <TeacherPersonaCard
            key={persona.id}
            persona={persona}
            isSelected={selectedId === persona.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
