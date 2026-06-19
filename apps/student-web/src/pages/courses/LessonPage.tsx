import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, BrainCircuit, Maximize2, MessageSquare, Volume2 } from 'lucide-react';
import { useLessonStore } from '@/store/lessonStore';
import { mockLessons } from '@/data/mockLessons';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Progress from '@/components/ui/Progress';
import Tabs from '@/components/ui/Tabs';

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  
  const { currentLesson, currentFrame, isPlaying, setPlaying, nextFrame, prevFrame, setLesson } = useLessonStore();

  useEffect(() => {
    // For mock purposes, just pick a lesson from mockLessons that roughly matches, or fallback to first
    const lesson = mockLessons.find(l => l.lesson_id === lessonId) || mockLessons[0];
    setLesson(lesson);
    setPlaying(false);
    return () => setLesson(null as any);
  }, [lessonId, setLesson, setPlaying]);

  if (!currentLesson) return <div className="p-8">Loading lesson...</div>;

  const frame = currentLesson.frames[currentFrame];

  const renderBoardContent = () => {
    if (!frame || !frame.board) return null;
    
    switch (frame.board.action) {
      case 'write_title':
        return <h2 className="text-4xl font-display font-bold text-text-primary mb-4">{frame.board.text}</h2>;
      case 'write_text':
        return <p className="text-2xl text-text-secondary leading-relaxed">{frame.board.text}</p>;
      case 'write_formula':
        return <div className="text-5xl font-mono text-primary-400 font-bold tracking-wider">{frame.board.formula}</div>;
      case 'highlight':
        return <div className="text-3xl text-accent-rose font-bold bg-accent-rose/10 py-4 px-8 rounded-lg">{frame.board.text}</div>;
      case 'draw_diagram':
        return (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 border-2 border-dashed border-primary-500/50 rounded-xl flex items-center justify-center text-primary-400 mb-4 bg-primary-500/5">
              [ Diagram: {frame.board.text} ]
            </div>
          </div>
        );
      case 'draw_shape':
        return <div className="text-4xl text-accent-cyan font-bold flex items-center gap-4">{frame.board.text}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-80px)] -mt-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-text-primary">{currentLesson.title}</h1>
            <p className="text-sm text-text-muted">Part {currentFrame + 1} of {currentLesson.frames.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" leftIcon={<Volume2 size={16} />}>Audio</Button>
          <Button variant="ghost" size="sm" leftIcon={<MessageSquare size={16} />}>Ask Question</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 mt-6 min-h-0">
        
        {/* Left: Whiteboard */}
        <div className="flex-1 flex flex-col relative bg-bg-surface border border-border rounded-xl overflow-hidden shadow-glow-sm">
          {/* Board Area */}
          <div className="flex-1 flex items-center justify-center p-12 text-center relative bg-[url('/grid.svg')] bg-center">
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1 rounded-md bg-bg-elevated text-xs font-semibold text-primary-400 border border-border flex items-center gap-1">
                <BrainCircuit size={14} /> AI Active
              </span>
            </div>
            
            <div className="max-w-3xl animate-fade-in-up" key={frame?.frame_id}>
              {renderBoardContent()}
            </div>
          </div>

          {/* Controls */}
          <div className="h-20 bg-bg-elevated border-t border-border flex flex-col justify-center px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-text-primary">
                <button onClick={prevFrame} disabled={currentFrame === 0} className="p-2 hover:bg-bg-hover rounded-full disabled:opacity-50 transition-colors">
                  <SkipBack size={20} />
                </button>
                <button onClick={() => setPlaying(!isPlaying)} className="p-3 bg-primary-600 hover:bg-primary-500 rounded-full text-white shadow-glow-sm transition-colors">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={nextFrame} disabled={currentFrame === currentLesson.frames.length - 1} className="p-2 hover:bg-bg-hover rounded-full disabled:opacity-50 transition-colors">
                  <SkipForward size={20} />
                </button>
              </div>
              
              <div className="flex-1 px-4 flex items-center gap-4">
                <span className="text-xs text-text-muted font-mono">{frame?.start_sec}s</span>
                <Progress value={0} size="sm" className="flex-1" />
                <span className="text-xs text-text-muted font-mono">{currentLesson.duration_sec}s</span>
              </div>

              <button className="p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Tutor Transcript */}
        <Card className="w-96 flex flex-col bg-bg-surface border-border overflow-hidden shadow-sm flex-shrink-0">
          <Tabs 
            tabs={[
              { id: 'transcript', label: 'Transcript' },
              { id: 'notes', label: 'Notes' },
            ]} 
            activeTab="transcript"
            onChange={() => {}}
          />
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {currentLesson.frames.slice(0, currentFrame + 1).map((f, i) => (
              <div key={f.frame_id} className={`p-4 rounded-xl text-sm ${i === currentFrame ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-bg-elevated text-text-secondary'}`}>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
                  <BrainCircuit size={14} className={i === currentFrame ? 'text-primary-400' : 'text-text-muted'} />
                  <span className={i === currentFrame ? 'text-primary-400' : 'text-text-muted'}>AI Teacher</span>
                </div>
                <div className="space-y-2">
                  {f.voice_segments.map((vs, idx) => (
                    <p key={idx} className={vs.lang === 'ne' ? 'font-medium' : ''}>{vs.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
