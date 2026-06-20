import React, { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import StandardPdfManager from './StandardPdfManager';
import VisualPdfManager from './VisualPdfManager';
import { FileText, Sparkles } from 'lucide-react';

export default function PdfManagementPage() {
  const [activeTab, setActiveTab] = useState('standard');

  const tabs = [
    { id: 'standard', label: 'Standard PDFs', icon: <FileText size={16} /> },
    { id: 'visual', label: 'Visual Format PDFs', icon: <Sparkles size={16} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-text-primary">AI PDF Teacher Management</h1>
        <p className="text-text-secondary">Manage standard PDFs for whiteboard backgrounds and special visual-format PDFs.</p>
      </div>

      <div className="bg-bg-surface border border-border rounded-xl p-1 inline-flex">
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          variant="pills" 
          className="border-none p-0 bg-transparent"
        />
      </div>

      <div className="mt-6">
        {activeTab === 'standard' && <StandardPdfManager />}
        {activeTab === 'visual' && <VisualPdfManager />}
      </div>
    </div>
  );
}
