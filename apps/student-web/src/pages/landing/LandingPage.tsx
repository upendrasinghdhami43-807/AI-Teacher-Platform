import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Sparkles, MonitorPlay, FileText, CheckCircle2 } from 'lucide-react';
import PublicNav from '@/components/layout/PublicNav';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockCourses } from '@/data/mockCourses';

const features = [
  { icon: Brain, title: 'AI Teacher', desc: 'Get personalized 1-on-1 tutoring from an AI that adapts to your learning pace and style.' },
  { icon: MonitorPlay, title: 'Interactive Board', desc: 'Visualize complex concepts with real-time dynamic diagrams and explanations on the smart board.' },
  { icon: FileText, title: 'Smart PDF Learning', desc: 'Upload any textbook or notes and chat directly with your document to clear doubts instantly.' },
];

export default function LandingPage() {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <PublicNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up">
            <Badge variant="glow" className="mb-6 mx-auto">
              <Sparkles className="w-3 h-3 mr-1.5 inline text-accent-cyan" />
              <span className="text-accent-cyan font-medium">Next-Gen Learning Platform</span>
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary tracking-tight mb-6 leading-tight">
              Master Your Exams with <br className="hidden md:block" />
              <span className="gradient-text">Your Personal AI Teacher</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Interactive lessons, real-time smart board, and voice-enabled tutoring designed specifically for NEB and Entrance students in Nepal.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Start Learning for Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="secondary" size="lg">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-bg-surface/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Why Choose AI Teacher?</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">We combine advanced AI with proven pedagogical methods to deliver an unparalleled learning experience.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <Card key={i} className="bg-bg-elevated/50 border-border p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 mb-6">
                    <f.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{f.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section id="subjects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-text-primary mb-3">Popular Courses</h2>
                <p className="text-text-secondary">Start learning from our most loved subjects.</p>
              </div>
              <Link to="/courses" className="hidden sm:flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors group">
                View all <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <Link key={course.course_id} to={`/courses/${course.course_id}`} className="block group">
                  <Card className="h-full border border-border bg-bg-surface hover:border-primary-500/30 hover:shadow-glow-sm transition-all duration-300 overflow-hidden flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-bg-elevated to-bg-surface flex items-center justify-center border-b border-border group-hover:from-primary-900/20 group-hover:to-bg-elevated transition-colors">
                      <BookOpen size={48} className="text-text-muted group-hover:text-primary-400/50 transition-colors" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="glass">{course.level.replace('_', ' ').toUpperCase()}</Badge>
                        {course.is_free && <Badge variant="success">Free</Badge>}
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-400 transition-colors">{course.title}</h3>
                      <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-1">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-text-muted pt-4 border-t border-border">
                        <span>{course.total_lessons} Lessons</span>
                        <span>{course.enrolled_count.toLocaleString()} Students</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link to="/courses">
                <Button variant="outline" fullWidth>View All Courses</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-brand opacity-10 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">Ready to Ace Your Exams?</h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">Join thousands of students who are already learning smarter and faster with their personal AI Teacher.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Create Free Account
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-text-muted">
              <span className="flex items-center"><CheckCircle2 size={16} className="mr-2 text-primary-400" /> No credit card required</span>
              <span className="flex items-center"><CheckCircle2 size={16} className="mr-2 text-primary-400" /> Access to free courses</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
