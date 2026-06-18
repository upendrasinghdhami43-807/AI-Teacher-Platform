import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function AiTeacherPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('class_11_science');
  const [language, setLanguage] = useState('ne_en');
  const [level, setLevel] = useState('medium');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    // In a real app, this might create a session via API first.
    // For now, we'll navigate to the classroom and pass the params via state or URL
    const params = new URLSearchParams({ topic, grade, language, level });
    navigate(`/ai-teacher/classroom?${params.toString()}`);
  };

  return (
    <div className="animate-fade-in space-y-8 pb-10 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto shadow-glow-sm">
          <BrainCircuit size={32} className="text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Your Personal AI Teacher</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Enter any topic you want to learn. The AI Teacher will create a personalized interactive lesson with a smart board and voice explanations.
        </p>
      </div>

      <Card className="p-8 bg-bg-surface border-border shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <form onSubmit={handleStart} className="space-y-6 relative z-10">
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

          <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-border">
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
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Language</label>
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Depth / Level</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-elevated border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="recommended">Recommended (Based on memory)</option>
                <option value="basic">Basic (Introduction)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="advanced">Advanced (Deep Dive)</option>
              </select>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth 
              disabled={!topic.trim()}
              rightIcon={<ArrowRight size={20} />}
            >
              Start Generating Lesson
            </Button>
            <p className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1">
              <MessageSquare size={12} /> The AI will generate a tailored interactive session in real-time.
            </p>
          </div>
        </form>
      </Card>
      
      {/* Suggestions */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-text-secondary mb-4">Try these popular topics:</h3>
        <div className="flex flex-wrap gap-3">
          {["Newton's Laws of Motion", "Chemical Equilibrium", "Structure of DNA", "Linear Programming", "Nepal's Geography"].map((suggestion) => (
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
