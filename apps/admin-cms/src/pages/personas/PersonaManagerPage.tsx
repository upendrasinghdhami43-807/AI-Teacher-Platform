import { useState } from 'react';
import { BrainCircuit, Settings2, Plus, Volume2, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const mockPersonas = [
  { id: 'p-001', name: 'Strict Mode', voice: 'en-US-Standard-D', temperature: 0.1, role: 'Examiner' },
  { id: 'p-002', name: 'Deep Dive', voice: 'en-GB-Standard-A', temperature: 0.5, role: 'Professor' },
  { id: 'p-003', name: 'Friend Mode', voice: 'ne-NP-Standard-B', temperature: 0.8, role: 'Peer Tutor' },
];

export default function PersonaManagerPage() {
  const [activeId, setActiveId] = useState('p-001');
  const activePersona = mockPersonas.find(p => p.id === activeId);

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">AI Personas</h1>
          <p className="text-text-secondary mt-1">Configure and manage AI teacher personalities.</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={18} />}>
          Create Persona
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          {mockPersonas.map((persona) => (
            <Card 
              key={persona.id}
              onClick={() => setActiveId(persona.id)}
              className={`p-4 cursor-pointer border transition-colors ${
                activeId === persona.id 
                  ? 'bg-primary-500/10 border-primary-500' 
                  : 'bg-bg-surface border-border hover:border-primary-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeId === persona.id ? 'bg-primary-500 text-white' : 'bg-bg-elevated text-text-muted'}`}>
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{persona.name}</h3>
                  <p className="text-xs text-text-secondary">{persona.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="md:col-span-2">
          {activePersona ? (
            <Card className="p-6 bg-bg-surface border-border space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-xl font-bold text-text-primary">Configure "{activePersona.name}"</h2>
                <Button variant="primary" leftIcon={<Save size={16}/>}>Save Changes</Button>
              </div>

              <div className="space-y-5">
                <Input label="Persona Name" defaultValue={activePersona.name} />
                <Input label="Base Role / Title" defaultValue={activePersona.role} />
                
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-secondary">System Prompt</label>
                  <textarea 
                    className="w-full h-32 px-3 py-2 bg-bg-base border border-border rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    defaultValue={`You are a ${activePersona.role}. Your main goal is to teach the student...`}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text-secondary flex items-center justify-between">
                      Model Temperature <span className="text-primary-400">{activePersona.temperature}</span>
                    </label>
                    <input type="range" min="0" max="1" step="0.1" defaultValue={activePersona.temperature} className="w-full accent-primary-500" />
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>Focused/Strict</span>
                      <span>Creative/Loose</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text-secondary">TTS Voice Model</label>
                    <div className="flex gap-2">
                      <select className="flex-1 bg-bg-base border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500">
                        <option selected={activePersona.voice === 'en-US-Standard-D'}>en-US Standard D (Male)</option>
                        <option selected={activePersona.voice === 'en-GB-Standard-A'}>en-GB Standard A (Female)</option>
                        <option selected={activePersona.voice === 'ne-NP-Standard-B'}>Nepali Standard B (Male)</option>
                      </select>
                      <Button variant="outline" className="px-3" title="Test Voice">
                        <Volume2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-xl text-text-muted">
              Select a persona to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
