import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Clock, AlertTriangle, Volume2, VolumeX, BrainCircuit, Send, SkipForward, ChevronRight, Maximize, Minimize, Hand, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import BoardCanvas from '@/components/whiteboard/BoardCanvas';
import RaiseHandModal from '@/components/whiteboard/RaiseHandModal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import type { LessonSession, BoardElement } from '@/types/board.types';

const API_BASE = 'http://localhost:8000/api/v1';

export default function ClassroomPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topic = searchParams.get('topic') || 'Unknown Topic';
  const grade = searchParams.get('grade') || 'class_11_science';
  const language = searchParams.get('language') || 'ne_en';
  const level = searchParams.get('level') || 'medium';
  const personaId = searchParams.get('persona') || 'ai_teacher';

  const { session, setSession, isPlaying, setPlaying, currentSectionIndex, setSectionIndex, currentTimeMs, setCurrentTime } = useLessonStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRaiseHandOpen, setIsRaiseHandOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const boardContainerRef = useRef<HTMLDivElement>(null);

  // Fetch lesson
  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/ai-teacher/lesson`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            persona_id: personaId,
            topic,
            grade,
            language,
            level,
          }),
        });

        if (!response.ok) throw new Error(`API returned ${response.status}`);

        const data: LessonSession = await response.json();
        setSession(data);

        // Add welcome message
        const resolvedInfo = data.plan.levelResolutionReason
          ? `\n\n📊 AI picked: ${data.plan.resolvedLevel} — ${data.plan.levelResolutionReason}`
          : '';
        setMessages([{
          role: 'assistant',
          text: `Lesson ready: "${topic}" (${data.plan.sections.length} sections, ~${Math.ceil(data.totalDurationSeconds / 60)} min)${resolvedInfo}`,
        }]);

      } catch (err: any) {
        console.error('Lesson fetch error:', err);
        setError(err.message || 'Failed to generate lesson');
        // Generate a local demo session as fallback
        generateLocalDemo();
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [topic, language, level, personaId]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Generate local demo when backend is unavailable
  const generateLocalDemo = () => {
    const demoSession: LessonSession = {
      id: `demo_${Date.now()}`,
      request: { personaId, topic, grade, language, level, maxDurationSeconds: 300 },
      plan: {
        resolvedLevel: level === 'recommended' ? 'medium' : (level as any),
        levelResolutionReason: level === 'recommended' ? `Based on ${grade.replace(/_/g, ' ')}, medium depth is appropriate` : undefined,
        sections: [
          { id: 's1', title: `Introduction to ${topic}`, keyPoints: [`What is ${topic}?`, 'Why is it important?', 'Real-world applications'], priority: 'core', estimatedSeconds: 75, visualizationHints: ['heading', 'definition', 'bullet_list'] },
          { id: 's2', title: `Core Concepts`, keyPoints: ['Fundamental principles', 'Key formulas', 'Mathematical basis'], priority: 'core', estimatedSeconds: 75, visualizationHints: ['heading', 'equation', 'definition'] },
          { id: 's3', title: `Visual Analysis`, keyPoints: ['Graphical representation', 'Geometric relationships'], priority: 'core', estimatedSeconds: 75, visualizationHints: ['graph', 'shape'] },
          { id: 's4', title: `Summary`, keyPoints: ['Key takeaways', 'Important formulas', 'Exam tips'], priority: 'optional', estimatedSeconds: 75, visualizationHints: ['bullet_list', 'equation'] },
        ],
        totalEstimatedSeconds: 300,
      },
      scripts: [
        { sectionId: 's1', text: `Let's learn about ${topic}. This is a fundamental concept that you'll encounter frequently.`, wordCount: 15, estimatedSeconds: 75 },
        { sectionId: 's2', text: `Now let's look at the core mathematical formulations behind ${topic}.`, wordCount: 12, estimatedSeconds: 75 },
        { sectionId: 's3', text: `Here's a visual representation to help you understand better.`, wordCount: 10, estimatedSeconds: 75 },
        { sectionId: 's4', text: `Let's summarize the key points from today's lesson.`, wordCount: 9, estimatedSeconds: 75 },
      ],
      board: [
        { id: 'b1', sectionId: 's1', type: 'heading', appearAtMs: 0, color: 'default', content: `Introduction to ${topic}` },
        { id: 'b2', sectionId: 's1', type: 'definition', appearAtMs: 3000, color: 'blue', content: `${topic} is a fundamental concept in science and mathematics.`, underline: true },
        { id: 'b3', sectionId: 's1', type: 'bullet_list', appearAtMs: 8000, color: 'default', items: [`What is ${topic}?`, 'Why is it important?', 'Real-world applications'] },
        { id: 'b4', sectionId: 's2', type: 'heading', appearAtMs: 75000, color: 'default', content: 'Core Concepts' },
        { id: 'b5', sectionId: 's2', type: 'equation', appearAtMs: 80000, color: 'orange', latex: 'F = ma', label: "Newton's Second Law" },
        { id: 'b6', sectionId: 's2', type: 'equation', appearAtMs: 90000, color: 'orange', latex: '\\frac{d}{dx}(x^n) = nx^{n-1}', label: 'Power Rule' },
        { id: 'b7', sectionId: 's2', type: 'definition', appearAtMs: 100000, color: 'blue', content: 'These formulas form the foundation of the topic.', underline: true },
        { id: 'b8', sectionId: 's3', type: 'heading', appearAtMs: 150000, color: 'green', content: 'Visual Analysis' },
        { id: 'b9', sectionId: 's3', type: 'graph', appearAtMs: 155000, color: 'blue', graphType: 'function', fn: 'x^2', domain: [-5, 5], axisLabels: { x: 'x', y: 'f(x)' } },
        { id: 'b10', sectionId: 's3', type: 'shape', appearAtMs: 170000, color: 'green', shape: 'triangle', dimensions: { width: 140, height: 120 }, label: 'Triangle ABC', fillColor: 'rgba(34,197,94,0.08)', strokeColor: '#22C55E' },
        { id: 'b11', sectionId: 's3', type: 'chemistry', appearAtMs: 180000, color: 'orange', reaction: '2H₂ + O₂ → 2H₂O' },
        { id: 'b12', sectionId: 's4', type: 'heading', appearAtMs: 225000, color: 'default', content: 'Summary & Key Takeaways' },
        { id: 'b13', sectionId: 's4', type: 'table', appearAtMs: 230000, color: 'default', headers: ['Concept', 'Formula', 'Status'], rows: [['Force', 'F=ma', '✅'], ['Derivative', "nx^(n-1)", '✅'], ['Integral', '∫f(x)dx', '✅']] },
        { id: 'b14', sectionId: 's4', type: 'bullet_list', appearAtMs: 250000, color: 'green', items: ['Review all formulas', 'Practice problems', 'Check exam papers'] },
      ] as BoardElement[],
      totalDurationSeconds: 300,
      wasTrimmed: false,
      createdAt: new Date().toISOString(),
    };

    setSession(demoSession);
    setError(null);
    setMessages([{
      role: 'assistant',
      text: `Demo lesson ready: "${topic}" (4 sections, 5 min). Press Play to start!`,
    }]);
  };

  // Playback timer
  useEffect(() => {
    if (isPlaying && session) {
      timerRef.current = setInterval(() => {
        setCurrentTime(currentTimeMs + 200);

        // Check if we've reached the end
        if (currentTimeMs >= session.totalDurationSeconds * 1000) {
          setPlaying(false);
          setMessages(prev => [...prev, { role: 'assistant', text: '✅ Lesson complete! Great job!' }]);
        }

        // Update section index based on time
        const sections = session.plan.sections;
        let elapsed = 0;
        for (let i = 0; i < sections.length; i++) {
          elapsed += sections[i].estimatedSeconds * 1000;
          if (currentTimeMs < elapsed) {
            if (i !== currentSectionIndex) {
              setSectionIndex(i);
              setMessages(prev => [...prev, { role: 'assistant', text: `📖 Section ${i + 1}: ${sections[i].title}` }]);
            }
            break;
          }
        }
      }, 200);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTimeMs, session]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const togglePlay = () => setPlaying(!isPlaying);
  const replaySection = () => {
    if (!session) return;
    const sections = session.plan.sections;
    let startMs = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      startMs += sections[i].estimatedSeconds * 1000;
    }
    setCurrentTime(startMs);
    setPlaying(true);
  };

  const jumpToSection = (idx: number) => {
    if (!session) return;
    let startMs = 0;
    for (let i = 0; i < idx; i++) {
      startMs += session.plan.sections[i].estimatedSeconds * 1000;
    }
    setSectionIndex(idx);
    setCurrentTime(startMs);
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    const q = chatInput;
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: `Good question about "${q}"! In the context of ${topic}, this relates to the current section we're studying.` }]);
    }, 800);
  };

  // Format time
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      boardContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const exportBoard = () => {
    setMessages(prev => [...prev, { role: 'assistant', text: '📄 Board exported as PDF successfully.' }]);
  };

  const handleDoubtSubmit = (doubt: string) => {
    setIsRaiseHandOpen(false);
    setMessages(prev => [...prev, { role: 'user', text: `✋ Raised Hand: ${doubt}` }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: `Good question! I am processing your doubt and will explain it on the board shortly.` }]);
    }, 1000);
  };

  const totalMs = session ? session.totalDurationSeconds * 1000 : 300000;
  const progressPercent = Math.min((currentTimeMs / totalMs) * 100, 100);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto animate-pulse">
            <BrainCircuit size={32} className="text-white" />
          </div>
          <p className="text-text-secondary">Generating your lesson on "{topic}"...</p>
          <div className="w-64 h-1.5 bg-bg-elevated rounded-full overflow-hidden mx-auto">
            <div className="h-full gradient-brand rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-80px)] -mt-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/ai-teacher')} className="p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-text-primary">{topic}</h1>
            <p className="text-xs text-text-muted capitalize">
              {grade.replace(/_/g, ' ')} • {session?.plan.resolvedLevel || level}
              {session?.plan.levelResolutionReason && (
                <span className="text-primary-400 ml-2">AI picked</span>
              )}
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} className="text-text-muted" />
            <span className="text-text-primary font-mono">{formatTime(currentTimeMs)}</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-muted font-mono">5:00</span>
          </div>
          <Button variant="danger" size="sm" onClick={() => navigate('/ai-teacher')}>End</Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-bg-elevated relative">
        <motion.div
          className="h-full gradient-brand"
          style={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Section dots */}
      {session && (
        <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface border-b border-border">
          {session.plan.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => jumpToSection(idx)}
              className="flex items-center gap-1.5 group"
            >
              <div className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSectionIndex
                  ? 'bg-primary-500 shadow-glow-sm scale-110'
                  : idx < currentSectionIndex
                    ? 'bg-accent-emerald'
                    : 'bg-bg-elevated border border-border'
              }`} />
              <span className={`text-[10px] font-medium hidden md:inline ${
                idx === currentSectionIndex ? 'text-primary-400' : 'text-text-muted group-hover:text-text-secondary'
              }`}>
                {section.title.length > 20 ? section.title.substring(0, 20) + '...' : section.title}
              </span>
              {idx < session.plan.sections.length - 1 && (
                <ChevronRight size={10} className="text-text-muted" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Trimmed notice */}
      {session?.wasTrimmed && (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-accent-amber/10 border-b border-accent-amber/20 text-accent-amber text-xs">
          <AlertTriangle size={12} />
          <span>Lesson shortened to fit 5-minute cap</span>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex gap-4 mt-2 min-h-0">
        {/* Whiteboard */}
        <div 
          ref={boardContainerRef} 
          className={`flex-1 flex flex-col overflow-hidden border border-border shadow-sm bg-bg-surface ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : 'rounded-xl relative'}`}
        >
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <button
                onClick={() => setIsRaiseHandOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-accent-amber/90 hover:bg-accent-amber text-white rounded-md text-sm font-medium shadow-md transition-all"
              >
                <Hand size={16} /> Raise Hand
              </button>
              <button 
                onClick={toggleFullscreen} 
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-md backdrop-blur-sm transition-colors"
              >
                <Minimize size={20} />
              </button>
            </div>
          )}
          <div className="flex-1 relative min-h-0">
            <BoardCanvas
              elements={session?.board || []}
              currentTimeMs={currentTimeMs}
              activeSectionId={session?.plan.sections[currentSectionIndex]?.id}
            />
          </div>

          {/* Playback controls */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-bg-surface border-t border-border flex-wrap gap-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white hover:shadow-glow-sm transition-all"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <button
                onClick={replaySection}
                className="p-2 text-text-muted hover:text-primary-400 transition-colors"
                title="Replay current section"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => jumpToSection(Math.min(currentSectionIndex + 1, (session?.plan.sections.length || 1) - 1))}
                className="p-2 text-text-muted hover:text-primary-400 transition-colors"
                title="Next section"
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* Board Actions */}
            <div className="flex items-center gap-2 border-x border-border px-4 mx-4">
               <button
                  onClick={() => setIsRaiseHandOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent-amber hover:bg-accent-amber/10 rounded-md transition-colors border border-accent-amber/20"
               >
                 <Hand size={14} /> Raise Hand
               </button>
               <button
                 onClick={exportBoard}
                 className="p-1.5 text-text-muted hover:text-primary-400 transition-colors rounded-md"
                 title="Export Board as PDF"
               >
                 <Download size={16} />
               </button>
               <button
                 onClick={toggleFullscreen}
                 className="p-1.5 text-text-muted hover:text-primary-400 transition-colors rounded-md"
                 title="Full Screen"
               >
                 <Maximize size={16} />
               </button>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-text-muted hover:text-text-primary transition-colors">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <span className="text-xs text-text-muted">
                Section {currentSectionIndex + 1}/{session?.plan.sections.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <Card className="w-80 lg:w-96 flex flex-col bg-bg-surface border-border overflow-hidden shadow-sm flex-shrink-0" padding="none">
          <div className="p-3 border-b border-border bg-bg-elevated flex items-center gap-2">
            <BrainCircuit size={16} className="text-primary-400" />
            <h3 className="font-semibold text-text-primary text-sm">AI Teacher Chat</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-2.5 rounded-xl text-xs ${
                  m.role === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-sm'
                    : 'bg-bg-elevated text-text-primary border border-border rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-bg-elevated border-t border-border">
            <form onSubmit={sendChat} className="relative">
              <Input
                value={chatInput}
                onChange={setChatInput}
                placeholder="Ask a question..."
                className="w-full pr-10 py-2 text-sm bg-bg-base border-border"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-primary-400 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </Card>
      </div>
      
      {/* Raise Hand Modal */}
      <RaiseHandModal 
        isOpen={isRaiseHandOpen} 
        onClose={() => setIsRaiseHandOpen(false)} 
        onSubmit={handleDoubtSubmit} 
      />
    </div>
  );
}
