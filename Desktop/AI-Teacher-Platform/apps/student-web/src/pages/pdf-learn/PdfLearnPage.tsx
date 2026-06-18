import { useState, useRef } from 'react';
import { UploadCloud, FileText, Send, BrainCircuit, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function PdfLearnPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsProcessed(false);
      setMessages([]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessed(true);
      setMessages([{
        role: 'ai',
        text: `I've successfully read "${file.name}". I'm ready to answer your questions or explain any concepts from this document. What would you like to know?`
      }]);
    }, 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isProcessed) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Based on the document, here is a detailed explanation regarding "${currentInput}". The text mentions several key points that support this concept...` 
      }]);
    }, 1000);
  };

  return (
    <div className="animate-fade-in-up flex flex-col h-[calc(100vh-80px)] -mt-4">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">PDF Learning Assistant</h1>
        <p className="text-text-secondary">Upload any PDF document, textbook, or past paper and let the AI teach it to you.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Left: Upload and Document Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <Card className="p-6 bg-bg-surface border-border flex flex-col items-center justify-center text-center border-dashed border-2 hover:border-primary-500/50 transition-colors cursor-pointer" onClick={() => !file && fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf" 
              className="hidden" 
            />
            
            {file ? (
              <div className="w-full relative">
                <button 
                  className="absolute -top-2 -right-2 p-1 bg-bg-elevated text-text-muted hover:text-accent-rose rounded-full"
                  onClick={(e) => { e.stopPropagation(); setFile(null); setIsProcessed(false); }}
                >
                  <X size={16} />
                </button>
                <FileText size={48} className="mx-auto text-primary-400 mb-4" />
                <h3 className="font-semibold text-text-primary truncate px-4">{file.name}</h3>
                <p className="text-xs text-text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                
                {!isProcessed && (
                  <Button 
                    variant="primary" 
                    fullWidth 
                    className="mt-6" 
                    loading={isUploading}
                    onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                  >
                    Process Document
                  </Button>
                )}
                {isProcessed && (
                  <div className="mt-6 px-4 py-2 bg-success-500/10 text-success-500 rounded-md text-sm font-medium border border-success-500/20">
                    Ready for questions
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8">
                <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <UploadCloud size={32} className="text-primary-400" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Upload a PDF</h3>
                <p className="text-sm text-text-muted">Click to browse or drag and drop</p>
              </div>
            )}
          </Card>

          <Card className="flex-1 p-6 bg-bg-surface border-border overflow-y-auto custom-scrollbar">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <BrainCircuit size={18} className="text-primary-400" /> Analysis Highlights
            </h3>
            {isProcessed ? (
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                  <span>The document appears to be academic material covering advanced concepts.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 flex-shrink-0" />
                  <span>Found 5 key definitions and 3 major formulas.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald mt-1.5 flex-shrink-0" />
                  <span>I can generate a summary or quiz you on this material.</span>
                </li>
              </ul>
            ) : (
              <p className="text-sm text-text-muted text-center mt-10">Upload a document to see AI analysis highlights.</p>
            )}
          </Card>
        </div>

        {/* Right: Chat Interface */}
        <Card className="flex-1 flex flex-col bg-bg-surface border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-bg-elevated">
            <h3 className="font-semibold text-text-primary">Document Chat</h3>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
            {!isProcessed && messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4 opacity-50">
                <BrainCircuit size={48} />
                <p>Upload and process a document to start chatting.</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                    m.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-sm' 
                      : 'bg-bg-elevated text-text-primary border border-border rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-bg-elevated border-t border-border">
            <form onSubmit={handleSend} className="flex gap-3">
              <Input
                placeholder={isProcessed ? "Ask anything about the document..." : "Process a document first..."}
                value={input}
                onChange={setInput}
                disabled={!isProcessed}
                className="flex-1 bg-bg-base"
              />
              <Button type="submit" variant="primary" disabled={!input.trim() || !isProcessed} className="px-6">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
