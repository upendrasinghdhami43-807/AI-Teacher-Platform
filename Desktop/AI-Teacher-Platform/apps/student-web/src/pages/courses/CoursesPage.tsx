import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { mockCourses } from '@/data/mockCourses';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || course.subject.toLowerCase() === selectedSubject.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const subjects = ['all', ...Array.from(new Set(mockCourses.map(c => c.subject.toLowerCase())))];

  return (
    <div className="animate-fade-in-up space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Course Catalog</h1>
          <p className="text-text-secondary">Explore our AI-curated courses tailored for Nepali students.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div className="flex-1">
          <Input 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={setSearchTerm}
            leftIcon={<Search size={18} />}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSubject === subject 
                  ? 'bg-primary-500 text-white shadow-glow-sm' 
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.course_id} to={`/courses/${course.course_id}`} className="group h-full">
              <Card className="h-full flex flex-col bg-bg-surface border-border hover:border-primary-500/50 hover:shadow-glow-sm transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-bg-elevated relative overflow-hidden flex items-center justify-center border-b border-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <BookOpen size={48} className="text-text-muted group-hover:text-primary-400 group-hover:scale-110 transition-all duration-500" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.is_free && <Badge variant="success">Free</Badge>}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="glass">{course.level.replace('_', ' ').toUpperCase()}</Badge>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{course.subject}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs text-text-muted">{course.total_lessons} Lessons</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary line-clamp-2 mb-6 flex-1">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {Math.floor(course.total_duration_min / 60)}h {course.total_duration_min % 60}m</span>
                      <span className="flex items-center gap-1.5"><Users size={14} /> {course.enrolled_count.toLocaleString()}</span>
                    </div>
                    <div className="text-primary-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-bg-surface border border-border rounded-xl">
          <BookOpen size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">No courses found</h3>
          <p className="text-text-secondary">Try adjusting your search or filters.</p>
          <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); setSelectedSubject('all'); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
