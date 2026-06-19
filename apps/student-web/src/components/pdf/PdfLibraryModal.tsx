import { useState } from 'react';
import { X, Search, FileText, BookOpen, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

interface PdfFile {
  id: string;
  name: string;
  size: number;
  subject?: string;
  grade?: string;
}

interface PdfLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (pdf: PdfFile) => void;
}

const LIBRARY_PDFS: PdfFile[] = [
  { id: 'lib_1', name: 'Physics Class 11 - Mechanics.pdf', size: 2.4 * 1024 * 1024, subject: 'Physics', grade: 'Class 11' },
  { id: 'lib_2', name: 'Chemistry - Organic Reactions.pdf', size: 1.8 * 1024 * 1024, subject: 'Chemistry', grade: 'Class 12' },
  { id: 'lib_3', name: 'Mathematics - Calculus Basics.pdf', size: 3.1 * 1024 * 1024, subject: 'Mathematics', grade: 'Class 12' },
  { id: 'lib_4', name: 'Biology - Cell Division.pdf', size: 1.5 * 1024 * 1024, subject: 'Biology', grade: 'Class 11' },
  { id: 'lib_5', name: 'Nepal Geography Guide.pdf', size: 2.0 * 1024 * 1024, subject: 'Social Studies', grade: 'Class 10' },
  { id: 'lib_6', name: 'Computer Science - DSA.pdf', size: 4.2 * 1024 * 1024, subject: 'Computer Science', grade: 'Bachelors' },
  { id: 'lib_7', name: 'English Grammar Essentials.pdf', size: 1.2 * 1024 * 1024, subject: 'English', grade: 'Class 10' },
  { id: 'lib_8', name: 'SEE Past Papers 2023.pdf', size: 5.0 * 1024 * 1024, subject: 'General', grade: 'Class 10' },
  { id: 'lib_9', name: 'Thermodynamics Complete.pdf', size: 3.5 * 1024 * 1024, subject: 'Physics', grade: 'Class 12' },
  { id: 'lib_10', name: 'NEB Model Questions 2024.pdf', size: 2.8 * 1024 * 1024, subject: 'General', grade: 'Class 12' },
  { id: 'lib_11', name: 'Nepali Sahitya Notes.pdf', size: 1.6 * 1024 * 1024, subject: 'Nepali', grade: 'Class 11' },
  { id: 'lib_12', name: 'Probability & Statistics.pdf', size: 2.2 * 1024 * 1024, subject: 'Mathematics', grade: 'Bachelors' },
];

const subjectColors: Record<string, string> = {
  'Physics': 'cyan',
  'Chemistry': 'violet',
  'Mathematics': 'amber',
  'Biology': 'success',
  'Computer Science': 'cyan',
  'English': 'glass',
  'Nepali': 'glass',
  'Social Studies': 'glass',
  'General': 'muted',
};

export default function PdfLibraryModal({ isOpen, onClose, onSelect }: PdfLibraryModalProps) {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', ...Array.from(new Set(LIBRARY_PDFS.map(p => p.subject || 'General')))];

  const filtered = LIBRARY_PDFS.filter(pdf => {
    const matchSearch = pdf.name.toLowerCase().includes(search.toLowerCase());
    const matchSubject = selectedSubject === 'all' || pdf.subject === selectedSubject;
    return matchSearch && matchSubject;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl max-h-[80vh] bg-bg-surface border border-border rounded-xl shadow-modal overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-accent-cyan" />
              <h2 className="text-lg font-display font-bold text-text-primary">PDF Library</h2>
              <Badge variant="glass" size="sm">{LIBRARY_PDFS.length} documents</Badge>
            </div>
            <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="p-4 border-b border-border space-y-3">
            <Input
              placeholder="Search PDFs..."
              value={search}
              onChange={setSearch}
              leftIcon={<Search size={16} />}
              className="bg-bg-base"
            />
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
              {subjects.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedSubject === sub
                      ? 'bg-primary-500 text-white'
                      : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {sub === 'all' ? 'All' : sub}
                </button>
              ))}
            </div>
          </div>

          {/* PDF Grid */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map(pdf => (
                <button
                  key={pdf.id}
                  onClick={() => onSelect(pdf)}
                  className="flex items-center gap-3 p-4 rounded-lg bg-bg-elevated border border-border hover:border-primary-500/30 hover:bg-bg-hover transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                    <FileText size={20} className="text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{pdf.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={(subjectColors[pdf.subject || ''] || 'glass') as any} size="sm">
                        {pdf.subject}
                      </Badge>
                      <span className="text-[10px] text-text-muted">{pdf.grade}</span>
                      <span className="text-[10px] text-text-muted">• {(pdf.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                  </div>
                  <Download size={14} className="text-text-muted group-hover:text-primary-400 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                <FileText size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No PDFs found matching your search.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
