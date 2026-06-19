import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, PlayCircle, Lock, BrainCircuit, FileText } from 'lucide-react';
import { mockCourses } from '@/data/mockCourses';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.course_id === courseId);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-text-primary">Course not found</h2>
        <Button variant="secondary" onClick={() => navigate('/courses')} leftIcon={<ArrowLeft size={18} />}>
          Back to Courses
        </Button>
      </div>
    );
  }

  // Get the first lesson to start
  const firstLessonId = course.chapters[0]?.lessons[0]?.lesson_id;
  const isEnrolled = false;

  return (
    <div className="animate-fade-in space-y-8 pb-10 max-w-5xl mx-auto">
      {/* Header section */}
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary mb-2 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="glow">{course.subject.toUpperCase()}</Badge>
              <Badge variant="glass">{course.level.replace('_', ' ').toUpperCase()}</Badge>
              {course.is_free && <Badge variant="success">Free</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">{course.title}</h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">{course.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-text-secondary border-y border-border py-4">
              <span className="flex items-center"><Clock size={16} className="mr-2 text-primary-400" /> {Math.floor(course.total_duration_min / 60)}h {course.total_duration_min % 60}m</span>
              <span className="flex items-center"><BookOpen size={16} className="mr-2 text-primary-400" /> {course.total_lessons} Lessons</span>
              <span className="flex items-center"><Users size={16} className="mr-2 text-primary-400" /> {course.enrolled_count.toLocaleString()} Students</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter) => (
                <Card key={chapter.chapter_id} className="bg-bg-surface border-border overflow-hidden">
                  <div className="p-4 bg-bg-elevated border-b border-border">
                    <h3 className="font-bold text-text-primary">Chapter {chapter.order}: {chapter.title}</h3>
                    <p className="text-sm text-text-secondary">{chapter.description}</p>
                  </div>
                  <div className="divide-y divide-border">
                    {chapter.lessons.map((lesson, idx) => (
                      <Link 
                        key={lesson.lesson_id} 
                        to={`/courses/${course.course_id}/lessons/${lesson.lesson_id}`}
                        className="flex items-center justify-between p-4 hover:bg-bg-hover transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-text-muted group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-colors">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary group-hover:text-primary-400 transition-colors">{lesson.title}</p>
                            <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                              <span className="flex items-center"><Clock size={12} className="mr-1" /> {lesson.duration_min} min</span>
                              {lesson.has_ai_lecture && <span className="flex items-center text-accent-cyan"><BrainCircuit size={12} className="mr-1" /> AI Lecture</span>}
                              {lesson.has_notes && <span className="flex items-center"><FileText size={12} className="mr-1" /> Notes</span>}
                            </div>
                          </div>
                        </div>
                        <PlayCircle size={20} className="text-text-muted group-hover:text-primary-400 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-bg-surface border-border sticky top-24">
            <div className="w-full h-48 bg-bg-elevated rounded-lg flex items-center justify-center mb-6">
              <BookOpen size={48} className="text-text-muted" />
            </div>
            
            <div className="text-center mb-6">
              {course.is_free ? (
                <div className="text-2xl font-bold text-text-primary">Free</div>
              ) : (
                <div className="text-2xl font-bold text-text-primary">NPR {course.price_npr}</div>
              )}
            </div>
            
            {firstLessonId ? (
              <Link to={`/courses/${course.course_id}/lessons/${firstLessonId}`}>
                <Button variant="primary" fullWidth size="lg">
                  {isEnrolled ? 'Continue Course' : 'Enroll Now'}
                </Button>
              </Link>
            ) : (
              <Button variant="primary" fullWidth size="lg" disabled>
                Coming Soon
              </Button>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Instructor</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center">
                  <BrainCircuit size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{course.instructor_name}</p>
                  <p className="text-xs text-text-secondary">AI Teacher</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
