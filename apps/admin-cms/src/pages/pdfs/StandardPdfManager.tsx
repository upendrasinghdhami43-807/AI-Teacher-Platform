import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, Upload, Trash2 } from 'lucide-react';

export default function StandardPdfManager() {
  const [pdfs, setPdfs] = useState<{ id: string; name: string; size: number }[]>([
    { id: '1', name: 'Physics Notes Ch.5.pdf', size: 1024000 },
    { id: '2', name: 'Chemistry Lab Manual.pdf', size: 2048000 },
  ]);

  const handleUpload = () => {
    // Mock upload
    const id = Date.now().toString();
    setPdfs([...pdfs, { id, name: `New_Standard_PDF_${id}.pdf`, size: 1500000 }]);
  };

  const handleDelete = (id: string) => {
    setPdfs(pdfs.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Standard Whiteboard PDFs</h2>
          <p className="text-sm text-text-secondary">Manage general PDFs that students can use as their AI whiteboard.</p>
        </div>
        <Button variant="primary" onClick={handleUpload}>
          <Upload size={16} className="mr-2" /> Upload Standard PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfs.map(pdf => (
          <Card key={pdf.id} className="p-4 bg-bg-surface border-border flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-primary-400" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-text-primary text-sm truncate">{pdf.name}</h4>
                <p className="text-xs text-text-muted mt-0.5">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
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
