import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, GripVertical, Trash2 } from 'lucide-react';
import { mockCourses } from '@/data/mockCourses';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

export default function CourseBuilderPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isNew = courseId === 'new';
  
  const existingCourse = mockCourses.find(c => c.course_id === courseId);
  const [title, setTitle] = useState(existingCourse?.title || '');
  const [description, setDescription] = useState(existingCourse?.description || '');
  const [subject, setSubject] = useState(existingCourse?.subject || '');
  const [level, setLevel] = useState(existingCourse?.level || '');
  const [chapters, setChapters] = useState(existingCourse?.chapters || []);

  const handleSave = () => {
    // In a real app, this would be an API call
    navigate('/courses');
  };

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-text-primary">{isNew ? 'Create New Course' : 'Edit Course'}</h1>
              {!isNew && <Badge variant={existingCourse?.is_published ? 'success' : 'warning'}>{existingCourse?.is_published ? 'Published' : 'Draft'}</Badge>}
            </div>
            <p className="text-sm text-text-secondary">Configure course details and syllabus.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Preview</Button>
          <Button variant="primary" leftIcon={<Save size={18} />} onClick={handleSave}>Save Course</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-bg-surface border-border space-y-6">
            <h2 className="text-lg font-bold text-text-primary">Course Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Course Title</label>
                <Input 
                  value={title} 
                  onChange={setTitle} 
                  placeholder="e.g., Physics — Class 11" 
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Detailed course description..."
                  className="w-full h-32 px-3 py-2 bg-bg-base border border-border rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
                  <Input value={subject} onChange={setSubject} placeholder="e.g., Physics" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Level</label>
                  <Input value={level} onChange={setLevel} placeholder="e.g., class_11" className="w-full" />
                </div>
              </div>
            </div>
          </Card>

          {/* Curriculum Builder */}
          <Card className="p-6 bg-bg-surface border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary">Curriculum</h2>
              <Button variant="outline" size="sm" leftIcon={<Plus size={16} />}>Add Chapter</Button>
            </div>

            <div className="space-y-4">
              {chapters.map((chapter, idx) => (
                <div key={chapter.chapter_id} className="border border-border rounded-lg bg-bg-base overflow-hidden">
                  <div className="p-4 bg-bg-elevated border-b border-border flex items-center gap-3">
                    <GripVertical size={16} className="text-text-muted cursor-grab" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">Chapter {idx + 1}: {chapter.title}</h4>
                    </div>
                    <button className="p-1.5 text-text-muted hover:text-accent-rose transition-colors"><Trash2 size={16} /></button>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    {chapter.lessons.map((lesson, lIdx) => (
                      <div key={lesson.lesson_id} className="flex items-center gap-3 p-3 bg-bg-surface border border-border rounded-md group">
                        <GripVertical size={14} className="text-text-muted cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-xs font-mono text-text-muted w-6">{idx + 1}.{lIdx + 1}</span>
                        <span className="text-sm font-medium text-text-primary flex-1">{lesson.title}</span>
                        <Badge variant="glass" className="text-xs">{lesson.status}</Badge>
                      </div>
                    ))}
                    <button className="w-full mt-2 py-2 border-2 border-dashed border-border rounded-md text-sm text-text-secondary hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center gap-2">
                      <Plus size={16} /> Add Lesson
                    </button>
                  </div>
                </div>
              ))}

              {chapters.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                  <p className="text-text-secondary">No chapters yet. Start building your curriculum.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <Card className="p-6 bg-bg-surface border-border space-y-6">
            <h2 className="text-lg font-bold text-text-primary">Settings</h2>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Pricing</label>
              <select className="w-full px-3 py-2 bg-bg-base border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors">
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Instructor AI Persona</label>
              <select className="w-full px-3 py-2 bg-bg-base border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors">
                <option value="p-001">Exam Mode (Strict)</option>
                <option value="p-002">Deep Dive Mode</option>
                <option value="p-003">Friend Mode</option>
              </select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
