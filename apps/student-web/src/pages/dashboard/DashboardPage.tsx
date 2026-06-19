import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Trophy, Clock, BrainCircuit } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { mockCourses } from '@/data/mockCourses';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';

export default function DashboardPage() {
  const user = useAuthStore(s => s.user);
  
  // Mock enrolled courses (first two courses)
  const enrolledCourses = mockCourses.slice(0, 2);

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bg-surface border border-border p-8">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-text-secondary text-lg">Ready to continue your learning journey?</p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: 'text-blue-400' },
          { label: 'Hours Learned', value: '12.5', icon: Clock, color: 'text-green-400' },
          { label: 'Lessons Completed', value: '24', icon: Trophy, color: 'text-yellow-400' },
          { label: 'AI Sessions', value: '8', icon: BrainCircuit, color: 'text-purple-400' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 bg-bg-surface border-border flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-bg-elevated ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Continue Learning (2/3 width) */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Continue Learning</h2>
            <Link to="/courses" className="text-primary-400 hover:text-primary-300 text-sm font-medium">Browse Courses</Link>
          </div>
          
          <div className="space-y-4">
            {enrolledCourses.map((course, i) => (
              <Card key={course.course_id} className="p-6 bg-bg-surface border-border hover:border-primary-500/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-bg-elevated rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen size={40} className="text-text-muted" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="glass">{course.subject.toUpperCase()}</Badge>
                      <Badge variant="glass">{course.level.replace('_', ' ').toUpperCase()}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{course.title}</h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-1">{course.description}</p>
                    
                    <div className="space-y-2 mt-auto">
                      <div className="flex justify-between text-xs font-medium text-text-secondary">
                        <span>Progress</span>
                        <span className="text-primary-400">{i === 0 ? '45%' : '12%'}</span>
                      </div>
                      <Progress value={i === 0 ? 45 : 12} size="sm" color={i === 0 ? 'primary' : 'emerald'} />
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-end min-w-[120px]">
                    <Link to={`/courses/${course.course_id}`}>
                      <Button variant="primary" rightIcon={<PlayCircle size={18} />}>
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Teacher Quick Access (1/3 width) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Your AI Teacher</h2>
          
          <Card className="p-6 bg-gradient-to-br from-bg-surface to-primary-900/10 border-primary-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[40px] rounded-full" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mb-4 shadow-glow-sm">
                <BrainCircuit size={40} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Need help with a topic?</h3>
              <p className="text-sm text-text-secondary mb-6">
                Start a 1-on-1 tutoring session. Upload a PDF or ask questions instantly.
              </p>
              
              <Link to="/ai-teacher" className="w-full">
                <Button variant="primary" fullWidth>
                  Start Tutoring Session
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
