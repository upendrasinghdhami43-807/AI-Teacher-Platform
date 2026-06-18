import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Mic, SquareSquare, Image as ImageIcon, Play, MoreVertical, GripVertical, Settings2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const mockTimeline = [
  { id: '1', start: '00:00', type: 'speech', text: 'Welcome to our first kinematics lesson.' },
  { id: '2', start: '00:05', type: 'board_title', text: 'Kinematics: The Study of Motion' },
  { id: '3', start: '00:08', type: 'speech', text: 'Kinematics is the branch of classical mechanics...' },
  { id: '4', start: '00:15', type: 'board_formula', text: 'v = u + at' },
];

export default function LessonBuilderPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('Introduction to Kinematics');

  return (
    <div className="animate-fade-in-up space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <button onClick={() => navigate(-1)} className="p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-1">Lesson Editor</p>
          <div className="flex items-center gap-3">
            <Input value={title} onChange={setTitle} className="text-2xl font-display font-bold bg-transparent border-none px-0 focus:ring-0 max-w-md" />
            <Button variant="ghost" size="sm" leftIcon={<Edit size={16}/>}>Edit</Button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" leftIcon={<Play size={18} />}>Preview</Button>
          <Button variant="primary" leftIcon={<Save size={18} />}>Save Lesson</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Timeline Editor */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-text-primary">Timeline</h2>
            <Button variant="ghost" size="sm" leftIcon={<Plus size={16} />}>Add Block</Button>
          </div>

          <div className="space-y-3">
            {mockTimeline.map((block) => (
              <Card key={block.id} className="p-0 bg-bg-surface border-border flex items-stretch group overflow-hidden">
                <div className="w-10 bg-bg-elevated flex items-center justify-center border-r border-border cursor-grab text-text-muted hover:text-text-primary">
                  <GripVertical size={16} />
                </div>
                
                <div className="p-4 flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="w-16">
                    <Input value={block.start} className="text-xs font-mono py-1 px-2 text-center" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <select className="bg-bg-elevated border border-border rounded-md px-2 py-1 text-xs text-text-primary outline-none">
                        <option value="speech" selected={block.type === 'speech'}>AI Speech</option>
                        <option value="board_title" selected={block.type === 'board_title'}>Board Title</option>
                        <option value="board_text" selected={block.type === 'board_text'}>Board Text</option>
                        <option value="board_formula" selected={block.type === 'board_formula'}>Board Formula</option>
                        <option value="show_image" selected={block.type === 'show_image'}>Show Image</option>
                      </select>
                    </div>
                    
                    <textarea 
                      value={block.text} 
                      className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="w-12 border-l border-border flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-elevated">
                  <button className="p-1.5 text-text-muted hover:text-primary-400 transition-colors"><Settings2 size={16} /></button>
                  <button className="p-1.5 text-text-muted hover:text-accent-rose transition-colors"><Trash2 size={16} /></button>
                </div>
              </Card>
            ))}

            <button className="w-full py-4 border-2 border-dashed border-border rounded-xl text-text-muted hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all flex flex-col items-center justify-center gap-2">
              <Plus size={24} />
              <span className="font-medium">Add Timeline Block</span>
            </button>
          </div>
        </div>

        {/* Right: Settings / Toolbar */}
        <div className="space-y-6">
          <Card className="p-5 bg-bg-surface border-border">
            <h3 className="font-bold text-text-primary mb-4">Lesson Settings</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary">AI Teacher Persona</label>
                <select className="w-full bg-bg-elevated border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none">
                  <option>Strict Mode</option>
                  <option>Deep Dive</option>
                  <option>Friend Mode</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary">Background Music</label>
                <select className="w-full bg-bg-elevated border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none">
                  <option>None</option>
                  <option>Lo-Fi Study Beats</option>
                  <option>Ambient Focus</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-bg-surface border-border">
            <h3 className="font-bold text-text-primary mb-4">Quick Insert</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="ghost" className="bg-bg-elevated border border-border hover:border-primary-500/50" leftIcon={<Mic size={16} />}>Speech</Button>
              <Button variant="ghost" className="bg-bg-elevated border border-border hover:border-primary-500/50" leftIcon={<SquareSquare size={16} />}>Board</Button>
              <Button variant="ghost" className="bg-bg-elevated border border-border hover:border-primary-500/50" leftIcon={<ImageIcon size={16} />}>Media</Button>
              <Button variant="ghost" className="bg-bg-elevated border border-border hover:border-primary-500/50" leftIcon={<MoreVertical size={16} />}>Quiz</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Just mocking missing lucide icons for completeness
const Edit = ({ size }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const Trash2 = ({ size }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
