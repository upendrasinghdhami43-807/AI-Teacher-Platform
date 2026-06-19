import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, BookOpen, MessageSquare, ArrowRight, Lock, Sparkles, Image, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import TeacherPersonaSelector from '@/components/persona/TeacherPersonaSelector';
import { TEACHER_PERSONAS } from '@/types/persona.types';
import { useLessonStore } from '@/store/lessonStore';

export default function AiTeacherPage() {
  const navigate = useNavigate();
  const { selectedPersonaId, setPersona } = useLessonStore();

  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('class_11_science');
  const [language, setLanguage] = useState('ne_en');
  const [level, setLevel] = useState('recommended');
  const [contextText, setContextText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const persona = TEACHER_PERSONAS.find(p => p.id === selectedPersonaId) || TEACHER_PERSONAS[0];
  const isLocked = persona.isLocked;

  const resolvedLanguage = isLocked && persona.lockedConfig ? persona.lockedConfig.language : language;
  const resolvedLevel = isLocked && persona.lockedConfig ? persona.lockedConfig.level : level;

  const languageLabels: Record<string, string> = {
    en: 'English',
    ne: 'Nepali',
    ne_en: 'Neplish (Nepali + English)',
    hi: 'Hindi',
  };

  const levelLabels: Record<string, string> = {
    basic: 'Basic (Introduction)',
    medium: 'Medium (Standard)',
    advanced: 'Advanced (Deep Dive)',
    recommended: 'Recommended (AI decides)',
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);

    // Build params and navigate to classroom
    const params = new URLSearchParams({
      topic,
      grade,
      language: resolvedLanguage,
      level: resolvedLevel,
      persona: selectedPersonaId,
      ...(contextText && { context: contextText }),
    });
    
    // Small delay for visual feedback
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/ai-teacher/classroom?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="animate-fade-in space-y-8 pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto shadow-glow-sm">
          <BrainCircuit size={32} className="text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Your Personal AI Teacher</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Choose your teacher, enter any topic, and get a personalized 5-minute interactive lesson with smart board and voice.
        </p>
      </div>

      {/* Persona Selector */}
      <TeacherPersonaSelector selectedId={selectedPersonaId} onSelect={setPersona} />

      {/* Config Form */}
      <Card className="p-8 bg-bg-surface border-border shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <form onSubmit={handleStart} className="space-y-6 relative z-10">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-primary-400" /> What do you want to learn today?
            </label>
            <Input
              value={topic}
              onChange={setTopic}
              placeholder="e.g., Newton's Third Law, Photosynthesis, Quadratic Equations..."
              className="w-full text-lg py-3"
              autoFocus
            />
          </div>

          {/* Config Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-border">
            {/* Grade - always editable */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Grade / Curriculum</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-elevated border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="class_10">Class 10 (SEE)</option>
                <option value="class_11_science">Class 11 (Science)</option>
                <option value="class_11_management">Class 11 (Management)</option>
                <option value="class_12_science">Class 12 (Science)</option>
                <option value="bachelors">Bachelors</option>
              </select>
            </div>

            {/* Language - editable or locked badge */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Language</label>
              {isLocked ? (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-elevated border border-accent-amber/20 rounded-md">
                  <Lock size={14} className="text-accent-amber" />
                  <span className="text-sm text-accent-amber font-medium">
                    {languageLabels[resolvedLanguage] || resolvedLanguage}
                  </span>
                  <Badge variant="muted" size="sm" className="ml-auto">Fixed</Badge>
                </div>
              ) : (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg-elevated border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="ne_en">Nepali + English (Neplish)</option>
                  <option value="en">English Only</option>
                  <option value="ne">Nepali Only</option>
                  <option value="hi">Hindi</option>
                </select>
              )}
            </div>

            {/* Level - editable or locked badge */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Depth / Level</label>
              {isLocked ? (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-elevated border border-accent-amber/20 rounded-md">
                  <Sparkles size={14} className="text-accent-amber" />
                  <span className="text-sm text-accent-amber font-medium">
                    {levelLabels[resolvedLevel] || resolvedLevel}
                  </span>
                  <Badge variant="muted" size="sm" className="ml-auto">Fixed</Badge>
                </div>
              ) : (
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg-elevated border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="recommended">⚡ Recommended (AI decides)</option>
                  <option value="basic">Basic (Introduction)</option>
                  <option value="medium">Medium (Standard)</option>
                  <option value="advanced">Advanced (Deep Dive)</option>
                </select>
              )}
            </div>
          </div>

          {/* Context (optional) */}
          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
              <FileText size={14} className="text-text-muted" /> Additional Context <span className="text-text-muted">(optional)</span>
            </label>
            <textarea
              value={contextText}
              onChange={(e) => setContextText(e.target.value)}
              placeholder="Provide any specific focus area, past paper question, or context for the lesson..."
              rows={3}
              className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={!topic.trim() || isLoading}
              loading={isLoading}
              rightIcon={<ArrowRight size={20} />}
            >
              Start 5-Minute Lesson
            </Button>
            <p className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1">
              <MessageSquare size={12} /> AI generates a tailored interactive lesson capped at 5 minutes.
            </p>
          </div>
        </form>
      </Card>

      {/* Suggestions */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-text-secondary mb-4">Try these popular topics:</h3>
        <div className="flex flex-wrap gap-3">
          {["Newton's Laws of Motion", "Chemical Equilibrium", "Structure of DNA", "Quadratic Equations", "Photosynthesis", "Nepal's Geography"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setTopic(suggestion)}
              className="px-4 py-2 rounded-full bg-bg-surface border border-border text-sm text-text-primary hover:border-primary-500 hover:text-primary-400 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
