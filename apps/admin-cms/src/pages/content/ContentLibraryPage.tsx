import { useState } from 'react';
import { UploadCloud, Folder, FileText, Image as ImageIcon, Video, Search, Filter, MoreVertical, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const mockAssets = [
  { id: '1', name: 'Physics_Chapter1_Notes.pdf', type: 'document', size: '2.4 MB', uploadedAt: '2026-06-15', uploader: 'System' },
  { id: '2', name: 'Newton_Apple_Diagram.png', type: 'image', size: '845 KB', uploadedAt: '2026-06-16', uploader: 'Admin' },
  { id: '3', name: 'Intro_to_Calculus.mp4', type: 'video', size: '45.2 MB', uploadedAt: '2026-06-17', uploader: 'Teacher AI' },
  { id: '4', name: 'Chemistry_Periodic_Table.pdf', type: 'document', size: '1.1 MB', uploadedAt: '2026-06-18', uploader: 'System' },
];

export default function ContentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (type: string) => {
    switch(type) {
      case 'document': return <FileText size={24} className="text-primary-400" />;
      case 'image': return <ImageIcon size={24} className="text-accent-emerald" />;
      case 'video': return <Video size={24} className="text-accent-rose" />;
      default: return <FileText size={24} className="text-text-muted" />;
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Content Library</h1>
          <p className="text-text-secondary mt-1">Manage all uploaded media, PDFs, and assets.</p>
        </div>
        <Button variant="primary" leftIcon={<UploadCloud size={18} />}>
          Upload Asset
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search assets..." 
            value={searchTerm} 
            onChange={setSearchTerm}
            leftIcon={<Search size={18} />}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
          <Button variant="outline" leftIcon={<Folder size={18} />}>New Folder</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockAssets.map((asset) => (
          <Card key={asset.id} className="p-4 bg-bg-surface border-border hover:border-primary-500/50 transition-colors group cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center border border-border">
                {getIcon(asset.type)}
              </div>
              <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary truncate" title={asset.name}>{asset.name}</h3>
              <p className="text-xs text-text-secondary mt-1">{asset.size} • {asset.uploadedAt}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-text-muted">By {asset.uploader}</span>
              <button className="text-text-muted hover:text-accent-rose transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
