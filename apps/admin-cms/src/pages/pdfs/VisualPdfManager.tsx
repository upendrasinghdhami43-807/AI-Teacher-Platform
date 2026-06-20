import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Sparkles, Upload, Trash2 } from 'lucide-react';

export default function VisualPdfManager() {
  const [pdfs, setPdfs] = useState<{ id: string; name: string; size: number }[]>([
    { id: '1', name: 'Visual_Lesson_1.pdf', size: 3024000 },
    { id: '2', name: 'Visual_Lesson_2.pdf', size: 4048000 },
  ]);

  const handleUpload = () => {
    // Mock upload
    const id = Date.now().toString();
    setPdfs([...pdfs, { id, name: `New_Visual_PDF_${id}.pdf`, size: 2500000 }]);
  };

  const handleDelete = (id: string) => {
    setPdfs(pdfs.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Visual Lecture PDFs</h2>
          <p className="text-sm text-text-secondary">Manage special format PDFs pre-learned by AI for perfect whiteboard visualization.</p>
        </div>
        <Button variant="primary" onClick={handleUpload}>
          <Upload size={16} className="mr-2" /> Upload Visual PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfs.map(pdf => (
          <Card key={pdf.id} className="p-4 bg-bg-surface border-border flex items-start justify-between border-l-2 border-l-accent-amber">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-amber/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-accent-amber" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-text-primary text-sm truncate">{pdf.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-text-muted">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Badge variant="glass" size="sm">Pre-Learned</Badge>
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(pdf.id)} className="p-1.5 text-text-muted hover:text-accent-rose transition-colors rounded-md">
              <Trash2 size={14} />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
