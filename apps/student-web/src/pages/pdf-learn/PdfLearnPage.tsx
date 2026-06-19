import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, Send, BrainCircuit, X, BookOpen, Play, Library, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import PdfLibraryModal from '@/components/pdf/PdfLibraryModal';

interface PdfFile {
  id: string;
  name: string;
  size: number;
  subject?: string;
  grade?: string;
}

export default function PdfLearnPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<PdfFile | null>(null);
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [mode, setMode] = useState<'teach' | 'chat' | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setLocalFile(f);
      setFile({ id: `local_${Date.now()}`, name: f.name, size: f.size });
      setIsProcessed(false);
      setMode(null);
      setMessages([]);
    }
  };

  const handleLibrarySelect = (pdf: PdfFile) => {
    setFile(pdf);
    setLocalFile(null);
    setIsProcessed(false);
    setMode(null);
    setMessages([]);
    setShowLibrary(false);
  };

  const handleProcess = () => {
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessed(true);
    }, 1500);
  };

  const handleTeachMode = () => {
    setMode('teach');
    // Navigate to classroom with PDF context
    const params = new URLSearchParams({
      topic: `PDF: ${file?.name || 'Document'}`,
      grade: file?.grade || 'class_11_science',
      language: 'ne_en',
      level: 'recommended',
      persona: 'ai_teacher',
      source: 'pdf',
    });
    navigate(`/ai-teacher/classroom?${params.toString()}`);
  };

  const handleChatMode = () => {
    setMode('chat');
    setMessages([{
      role: 'ai',
      text: `I've analyzed "${file?.name}". I found key concepts, definitions, and formulas. Ask me anything about this document, or I can:\n\n• Summarize key points\n• Explain difficult concepts\n• Generate practice questions\n• Create flashcards\n\nWhat would you like to explore?`
    }]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isProcessed) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const q = input;
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: `Based on the document "${file?.name}", here's what I found about "${q}":\n\nThe document discusses this topic in detail. Key points include the fundamental principles and their applications. The relevant section mentions several important formulas and definitions that you should know for your exams.`,
      }]);
    }, 800);
  };

  const clearFile = () => {
    setFile(null);
    setLocalFile(null);
    setIsProcessed(false);
    setMode(null);
    setMessages([]);
  };

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <FileText size={24} className="text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary">PDF AI Teacher</h1>
            <p className="text-text-secondary">Upload a PDF or choose from library — AI teaches it on the whiteboard or answers your questions.</p>
          </div>
        </div>
      </div>

      {/* Upload / Select Section */}
      {!isProcessed ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Card */}
            <Card
              className="p-8 bg-bg-surface border-border border-dashed border-2 hover:border-primary-500/50 transition-all duration-300 cursor-pointer text-center group"
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />

              {file ? (
                <div className="relative">
                  <button
                    className="absolute -top-2 -right-2 p-1.5 bg-bg-elevated text-text-muted hover:text-accent-rose rounded-full border border-border z-10"
                    onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  >
                    <X size={14} />
                  </button>
                  <FileText size={48} className="mx-auto text-primary-400 mb-4" />
                  <h3 className="font-semibold text-text-primary truncate">{file.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {file.subject && (
                    <Badge variant="cyan" size="sm" className="mt-2">{file.subject}</Badge>
                  )}

                  <Button
                    variant="primary"
                    fullWidth
                    className="mt-6"
                    loading={isUploading}
                    onClick={(e) => { e.stopPropagation(); handleProcess(); }}
                  >
                    <Sparkles size={16} /> Process with AI
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">Upload Your PDF</h3>
                  <p className="text-sm text-text-muted">Textbooks, notes, past papers</p>
                </div>
              )}
            </Card>

            {/* Library Card */}
            <Card
              className="p-8 bg-bg-surface border-border hover:border-accent-cyan/50 transition-all duration-300 cursor-pointer text-center group"
              onClick={() => setShowLibrary(true)}
            >
              <div className="py-4">
                <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Library size={32} className="text-accent-cyan" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">PDF Library</h3>
                <p className="text-sm text-text-muted">Choose from admin-curated resources</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Badge variant="glass" size="sm">12 PDFs</Badge>
                  <Badge variant="glass" size="sm">All Subjects</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent PDFs */}
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Documents</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Physics Notes Ch.5', 'Chemistry Lab Manual', 'Math Past Paper 2024', 'Biology Diagrams'].map((name, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFile({ id: `recent_${i}`, name: `${name}.pdf`, size: 1024 * 1024 * (i + 1) });
                    setLocalFile(null);
                  }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-bg-surface border border-border hover:border-primary-500/30 transition-colors text-left"
                >
                  <FileText size={16} className="text-text-muted flex-shrink-0" />
                  <span className="text-xs text-text-primary truncate">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Mode Selection + Interaction */
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Left: PDF Info + Mode Selection */}
          <div className="w-full lg:w-80 flex flex-col gap-4 flex-shrink-0">
            {/* Document Card */}
            <Card className="p-5 bg-bg-surface border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileText size={24} className="text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm truncate max-w-[180px]">{file?.name}</h3>
                    <p className="text-xs text-text-muted">{((file?.size || 0) / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
                <button onClick={clearFile} className="p-1 text-text-muted hover:text-accent-rose">
                  <X size={14} />
                </button>
              </div>
              <div className="flex gap-2">
                <Badge variant="success" size="sm">Processed</Badge>
                <Badge variant="glass" size="sm">AI Ready</Badge>
              </div>
            </Card>

            {/* Mode Selection */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Learning Mode</p>

              <button
                onClick={handleTeachMode}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  mode === 'teach'
                    ? 'border-primary-500 bg-primary-500/[0.08]'
                    : 'border-border bg-bg-surface hover:border-primary-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                    <Play size={14} className="text-white ml-0.5" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm">Teach Me This PDF</h4>
                </div>
                <p className="text-xs text-text-secondary">AI creates a whiteboard lesson from the PDF content</p>
              </button>

              <button
                onClick={handleChatMode}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  mode === 'chat'
                    ? 'border-accent-cyan bg-accent-cyan/[0.08]'
                    : 'border-border bg-bg-surface hover:border-accent-cyan/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                    <Send size={14} className="text-accent-cyan" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm">Chat About This PDF</h4>
                </div>
                <p className="text-xs text-text-secondary">Ask questions, get summaries, practice quiz</p>
              </button>
            </div>

            {/* AI Highlights */}
            <Card className="flex-1 p-4 bg-bg-surface border-border overflow-y-auto custom-scrollbar">
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2 text-sm">
                <BrainCircuit size={16} className="text-primary-400" /> AI Analysis
              </h3>
              <ul className="space-y-3 text-xs text-text-secondary">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                  <span>Academic material — advanced concepts detected</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 flex-shrink-0" />
                  <span>5 key definitions and 3 major formulas found</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald mt-1.5 flex-shrink-0" />
                  <span>Suitable for Class 11-12 curriculum</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" />
                  <span>4 diagrams and 2 tables identified</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Right: Chat Interface */}
          <Card className="flex-1 flex flex-col bg-bg-surface border-border overflow-hidden" padding="none">
            <div className="p-3 border-b border-border bg-bg-elevated flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit size={16} className="text-primary-400" />
                <h3 className="font-semibold text-text-primary text-sm">
                  {mode === 'chat' ? 'Document Chat' : 'PDF AI Teacher'}
                </h3>
              </div>
              {mode === 'chat' && <Badge variant="cyan" size="sm">Active</Badge>}
            </div>

            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
              {!mode ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4 opacity-50">
                  <BrainCircuit size={48} />
                  <p className="text-sm">Choose a learning mode to get started.</p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3 text-sm whitespace-pre-line ${
                      m.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-sm'
                        : 'bg-bg-elevated text-text-primary border border-border rounded-bl-sm'
                    }`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {mode === 'chat' && (
              <div className="p-3 bg-bg-elevated border-t border-border">
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input
                    placeholder="Ask anything about the document..."
                    value={input}
                    onChange={setInput}
                    className="flex-1 bg-bg-base text-sm"
                  />
                  <Button type="submit" variant="primary" disabled={!input.trim()} className="px-4">
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Library Modal */}
      <PdfLibraryModal
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={handleLibrarySelect}
      />
    </div>
  );
}
