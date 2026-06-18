import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, BrainCircuit, Mic, Volume2, SquareSquare } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function ClassroomPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  
  const topic = searchParams.get('topic') || 'Unknown Topic';
  const grade = searchParams.get('grade') || 'class_11_science';
  const language = searchParams.get('language') || 'ne_en';
  const level = searchParams.get('level') || 'medium';

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [boardAction, setBoardAction] = useState<any>(null);
  const [lessonTitle, setLessonTitle] = useState('Generating Lesson...');
  const [isConnected, setIsConnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const sessionId = `sess_${Date.now()}`;
    const ws = new WebSocket(`ws://localhost:8000/ws/classroom/${sessionId}`);

    ws.onopen = () => {
      setIsConnected(true);
      // Start lesson
      ws.send(JSON.stringify({
        action: 'start_lesson',
        topic,
        grade,
        language,
        level,
        student_id: user?.user_id || 'anonymous'
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WS Event:", data);
        
        switch (data.event) {
          case 'lesson_start':
            setLessonTitle(data.lesson_title);
            setMessages(prev => [...prev, { role: 'assistant', text: `Starting lesson: ${data.lesson_title}. Hang tight while I prepare the materials...` }]);
            break;
          case 'section_start':
            // Add a visual separator or small note
            break;
          case 'board_update':
            setBoardAction(data.board_actions);
            break;
          case 'teacher_speaking':
            const text = data.caption_segments.map((s: any) => s.text).join(' ');
            setMessages(prev => [...prev, { role: 'assistant', text }]);
            break;
          case 'question_answer':
            setMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
            if (data.board_action) {
              setBoardAction({ action: data.board_action.type, text: data.board_action.text });
            }
            break;
          case 'error':
            setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${data.message}` }]);
            break;
        }
      } catch (e) {
        console.error("Failed to parse message", e);
      }
    };

    ws.onclose = () => setIsConnected(false);
    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'end_lesson' }));
        ws.close();
      }
    };
  }, [topic, grade, language, level, user]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    socket.send(JSON.stringify({
      action: 'ask_question',
      question: input,
    }));
    setInput('');
  };

  const renderBoardContent = () => {
    if (!boardAction) return <div className="text-text-muted text-lg flex items-center gap-2"><BrainCircuit size={24} /> AI is thinking...</div>;
    
    const action = boardAction.action || boardAction.type;
    const text = boardAction.text || boardAction.formula || '';

    switch (action) {
      case 'write_title':
      case 'heading':
        return <h2 className="text-4xl font-display font-bold text-text-primary mb-4 text-center">{text}</h2>;
      case 'write_text':
      case 'body':
        return <p className="text-2xl text-text-secondary leading-relaxed text-center">{text}</p>;
      case 'write_formula':
      case 'formula':
        return <div className="text-5xl font-mono text-primary-400 font-bold tracking-wider text-center">{text}</div>;
      default:
        return <p className="text-2xl text-text-primary text-center">{text}</p>;
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
            <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
              {lessonTitle}
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success-400' : 'bg-danger-400'} animate-pulse`} title={isConnected ? 'Connected' : 'Disconnected'} />
            </h1>
            <p className="text-sm text-text-muted capitalize">{topic} • {grade.replace(/_/g, ' ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<SquareSquare size={16} />}>Layout</Button>
          <Button variant="danger" size="sm" onClick={() => navigate(-1)}>End Session</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 mt-6 min-h-0">
        {/* Left: Whiteboard */}
        <div className="flex-1 flex flex-col relative bg-bg-surface border border-border rounded-xl overflow-hidden shadow-glow-sm">
          <div className="flex-1 flex items-center justify-center p-12 relative bg-[url('/grid.svg')] bg-center">
            <div className="max-w-3xl animate-fade-in-up transition-all duration-500">
              {renderBoardContent()}
            </div>
          </div>
        </div>

        {/* Right: Chat Panel */}
        <Card className="w-96 flex flex-col bg-bg-surface border-border overflow-hidden shadow-sm flex-shrink-0">
          <div className="p-4 border-b border-border bg-bg-elevated flex items-center gap-2">
            <BrainCircuit size={18} className="text-primary-400" />
            <h3 className="font-semibold text-text-primary">AI Teacher Chat</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
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

          <div className="p-4 bg-bg-elevated border-t border-border">
            <form onSubmit={sendMessage} className="relative">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full pr-24 py-3 bg-bg-base border-border"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button type="button" className="p-1.5 text-text-muted hover:text-primary-400 transition-colors">
                  <Mic size={18} />
                </button>
                <button type="submit" disabled={!input.trim() || !isConnected} className="p-1.5 text-text-muted hover:text-primary-400 disabled:opacity-50 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
