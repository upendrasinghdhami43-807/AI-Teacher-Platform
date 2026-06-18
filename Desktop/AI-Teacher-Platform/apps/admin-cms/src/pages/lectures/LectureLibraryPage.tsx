import { useState } from 'react';
import { PlayCircle, Search, Filter, BookOpen, Clock, MoreVertical, Edit, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const mockLectures = [
  { id: '1', title: 'Introduction to Kinematics', course: 'Physics Class 11', duration: '45 min', views: 1240, status: 'published', persona: 'Strict Mode' },
  { id: '2', title: 'Organic Chemistry Basics', course: 'Chemistry Class 12', duration: '52 min', views: 890, status: 'draft', persona: 'Deep Dive' },
  { id: '3', title: 'Calculus: Derivatives', course: 'Math Class 11', duration: '38 min', views: 2100, status: 'published', persona: 'Friend Mode' },
  { id: '4', title: 'Cell Structure', course: 'Biology Class 10', duration: '30 min', views: 450, status: 'archived', persona: 'Deep Dive' },
];

export default function LectureLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge variant="success">Published</Badge>;
      case 'draft': return <Badge variant="warning">Draft</Badge>;
      case 'archived': return <Badge variant="muted">Archived</Badge>;
      default: return <Badge variant="primary">{status}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Lecture Library</h1>
          <p className="text-text-secondary mt-1">Manage AI-generated lectures and interactive lessons.</p>
        </div>
        <Button variant="primary" leftIcon={<PlayCircle size={18} />}>
          Generate New Lecture
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search lectures..." 
            value={searchTerm} 
            onChange={setSearchTerm}
            leftIcon={<Search size={18} />}
          />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />}>Filter List</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockLectures.map((lecture) => (
          <Card key={lecture.id} className="bg-bg-surface border-border overflow-hidden flex flex-col group hover:border-primary-500/50 hover:shadow-glow-sm transition-all duration-300">
            <div className="h-40 bg-bg-elevated relative flex items-center justify-center border-b border-border">
              <PlayCircle size={48} className="text-text-muted group-hover:text-primary-400 group-hover:scale-110 transition-all duration-300" />
              <div className="absolute top-3 left-3">
                {getStatusBadge(lecture.status)}
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-xs font-mono text-white flex items-center gap-1.5">
                <Clock size={12} /> {lecture.duration}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{lecture.course}</span>
                <button className="text-text-muted hover:text-text-primary transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-text-primary mb-3 line-clamp-2">{lecture.title}</h3>
              
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={14} /> {lecture.views} views
                </div>
                <Badge variant="glass">{lecture.persona}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
