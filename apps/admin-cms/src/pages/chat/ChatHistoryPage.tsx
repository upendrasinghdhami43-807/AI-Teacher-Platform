import { useState } from 'react';
import { Search, Filter, MessageSquare, AlertTriangle, User, BrainCircuit, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const mockChats = [
  { id: '1', student: 'Ramesh Thapa', aiPersona: 'Strict Mode', topic: 'Kinematics', date: '2026-06-18 10:30 AM', flagged: false, messages: 24 },
  { id: '2', student: 'Sita Sharma', aiPersona: 'Friend Mode', topic: 'Organic Chemistry', date: '2026-06-18 09:15 AM', flagged: true, messages: 45 },
  { id: '3', student: 'Hari Bahadur', aiPersona: 'Deep Dive', topic: 'Calculus', date: '2026-06-17 04:20 PM', flagged: false, messages: 12 },
  { id: '4', student: 'Gita Dev', aiPersona: 'Strict Mode', topic: 'Cell Biology', date: '2026-06-17 02:10 PM', flagged: false, messages: 38 },
];

export default function ChatHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="animate-fade-in-up flex flex-col h-[calc(100vh-80px)] -mt-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Chat History</h1>
          <p className="text-text-secondary mt-1">Review student interactions with AI personas for QA and safety.</p>
        </div>
        <div className="flex gap-3">
          <Input 
            placeholder="Search student or topic..." 
            value={searchTerm} 
            onChange={setSearchTerm}
            leftIcon={<Search size={18} />}
            className="w-64"
          />
          <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat List */}
        <div className="w-1/3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          {mockChats.map((chat) => (
            <Card 
              key={chat.id} 
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-bg-elevated border-primary-500 shadow-glow-sm' : 'bg-bg-surface border-border hover:border-primary-500/50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-text-muted" />
                  <span className="font-semibold text-text-primary">{chat.student}</span>
                </div>
                {chat.flagged && <Badge variant="danger"><AlertTriangle size={12}/>Flagged</Badge>}
              </div>
              
              <div className="space-y-1.5 mb-3">
                <p className="text-sm text-text-secondary flex items-center gap-2"><BrainCircuit size={14}/> {chat.aiPersona}</p>
                <p className="text-sm text-text-secondary flex items-center gap-2"><MessageSquare size={14}/> {chat.topic} ({chat.messages} msgs)</p>
              </div>
              
              <div className="text-xs text-text-muted flex items-center gap-1">
                <Calendar size={12} /> {chat.date}
              </div>
            </Card>
          ))}
        </div>

        {/* Chat Viewer */}
        <Card className="flex-1 flex flex-col bg-bg-surface border-border overflow-hidden">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-border bg-bg-elevated flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-text-primary">Transcript: {mockChats.find(c => c.id === selectedChat)?.student}</h3>
                  <p className="text-xs text-text-secondary">{mockChats.find(c => c.id === selectedChat)?.topic}</p>
                </div>
                <Button variant="outline" size="sm">Export Transcript</Button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-primary-600 text-white rounded-2xl rounded-br-sm p-4 text-sm">
                    I don't understand how to calculate acceleration here.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-bg-elevated text-text-primary border border-border rounded-2xl rounded-bl-sm p-4 text-sm">
                    No problem! Let's break it down. Remember the formula a = (v - u) / t. What values do you already know from the question?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-primary-600 text-white rounded-2xl rounded-br-sm p-4 text-sm">
                    Well, initial velocity is 0, final is 20m/s, and time is 5s.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-bg-elevated text-text-primary border border-border rounded-2xl rounded-bl-sm p-4 text-sm">
                    Exactly! So if you plug those into the formula: a = (20 - 0) / 5. What do you get?
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4">
              <MessageSquare size={48} className="opacity-20" />
              <p>Select a chat session to view the transcript.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
