import { useState } from 'react';
import { FileText, Search, PlayCircle, Clock, CheckCircle2, AlertTriangle, Settings, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const mockPdfs = [
  { id: '1', name: 'Physics_Grade_11_Curriculum.pdf', status: 'processed', chunks: 145, lastUpdated: '2 hours ago', accuracy: '98%' },
  { id: '2', name: 'Chemistry_Organic_Notes.pdf', status: 'processing', chunks: 0, lastUpdated: 'Just now', accuracy: '-' },
  { id: '3', name: 'Math_Calculus_Exercises.pdf', status: 'failed', chunks: 12, lastUpdated: '1 day ago', accuracy: 'Error' },
  { id: '4', name: 'Biology_Genetics_Chapter.pdf', status: 'processed', chunks: 89, lastUpdated: '3 days ago', accuracy: '95%' },
];

export default function SmartPdfPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed': return <Badge variant="success"><span className="flex items-center gap-1"><CheckCircle2 size={12} /> Processed</span></Badge>;
      case 'processing': return <Badge variant="warning"><span className="flex items-center gap-1"><RefreshCw size={12} className="animate-spin" /> Processing</span></Badge>;
      case 'failed': return <Badge variant="danger"><span className="flex items-center gap-1"><AlertTriangle size={12} /> Failed</span></Badge>;
      default: return <Badge variant="muted">{status}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Smart PDFs & Vector DB</h1>
          <p className="text-text-secondary mt-1">Manage documents parsed for AI Retrieval-Augmented Generation (RAG).</p>
        </div>
        <Button variant="primary" leftIcon={<FileText size={18} />}>
          Ingest New PDF
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search documents..." 
            value={searchTerm} 
            onChange={setSearchTerm}
            leftIcon={<Search size={18} />}
          />
        </div>
        <Button variant="outline" leftIcon={<Settings size={18} />}>RAG Settings</Button>
      </div>

      <Card className="bg-bg-surface border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="p-4 text-sm font-semibold text-text-secondary">Document Name</th>
                <th className="p-4 text-sm font-semibold text-text-secondary">Status</th>
                <th className="p-4 text-sm font-semibold text-text-secondary">Vector Chunks</th>
                <th className="p-4 text-sm font-semibold text-text-secondary">Retrieval Accuracy</th>
                <th className="p-4 text-sm font-semibold text-text-secondary">Last Updated</th>
                <th className="p-4 text-sm font-semibold text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPdfs.map((pdf) => (
                <tr key={pdf.id} className="hover:bg-bg-hover transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                        <FileText size={20} />
                      </div>
                      <span className="font-medium text-text-primary">{pdf.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(pdf.status)}
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    {pdf.chunks > 0 ? pdf.chunks : '-'}
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    {pdf.accuracy}
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    {pdf.lastUpdated}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" leftIcon={<PlayCircle size={16} />}>Test RAG</Button>
                    <Button variant="ghost" size="sm" className="text-text-muted hover:text-accent-rose">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
