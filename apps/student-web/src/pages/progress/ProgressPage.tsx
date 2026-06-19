import { useState } from 'react';
import { BarChart3, BrainCircuit, FileText, User, BookOpen, Clock, Award, TrendingUp, Target, Zap, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

type ProgressTab = 'ai_teacher' | 'pdf_ai' | 'bhupesh_sir' | 'courses';

const tabs: { id: ProgressTab; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'ai_teacher', label: 'AI Teacher', icon: <BrainCircuit size={16} />, color: 'primary' },
  { id: 'pdf_ai', label: 'PDF AI', icon: <FileText size={16} />, color: 'cyan' },
  { id: 'bhupesh_sir', label: 'Bhupesh Sir', icon: <User size={16} />, color: 'violet' },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={16} />, color: 'emerald' },
];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<ProgressTab>('ai_teacher');

  return (
    <div className="animate-fade-in-up space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shadow-glow-sm">
          <BarChart3 size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">My Progress</h1>
          <p className="text-text-secondary">Track your learning across all AI tools and courses.</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Lessons', value: '24', icon: <Zap size={18} />, color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { label: 'Time Spent', value: '3h 45m', icon: <Clock size={18} />, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
          { label: 'Topics Covered', value: '18', icon: <Target size={18} />, color: 'text-accent-emerald', bg: 'bg-accent-emerald/10' },
          { label: 'Streak', value: '5 days', icon: <Calendar size={18} />, color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 bg-bg-surface border-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-bg-surface border border-border rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-glow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            {tab.icon}
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'ai_teacher' && <AiTeacherProgress />}
          {activeTab === 'pdf_ai' && <PdfAiProgress />}
          {activeTab === 'bhupesh_sir' && <BhupeshSirProgress />}
          {activeTab === 'courses' && <CoursesProgress />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── AI Teacher Progress ───────────────────────
function AiTeacherProgress() {
  const lessons = [
    { topic: "Newton's Laws of Motion", grade: 'Class 11', level: 'Medium', duration: '4:32', date: '2026-06-19', score: 85 },
    { topic: 'Chemical Equilibrium', grade: 'Class 12', level: 'Advanced', duration: '5:00', date: '2026-06-18', score: 78 },
    { topic: 'Quadratic Equations', grade: 'Class 10', level: 'Basic', duration: '3:45', date: '2026-06-17', score: 92 },
    { topic: 'Photosynthesis', grade: 'Class 11', level: 'Medium', duration: '4:15', date: '2026-06-16', score: 88 },
    { topic: 'Structure of DNA', grade: 'Class 12', level: 'Advanced', duration: '5:00', date: '2026-06-15', score: 75 },
    { topic: 'Linear Programming', grade: 'Bachelors', level: 'Advanced', duration: '5:00', date: '2026-06-14', score: 80 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 bg-bg-surface border-border">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-primary-400" />
            <h3 className="text-sm font-semibold text-text-primary">Level Progression</h3>
          </div>
          <div className="space-y-2">
            {['Basic', 'Medium', 'Advanced'].map((lvl, i) => (
              <div key={lvl} className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-16">{lvl}</span>
                <div className="flex-1 h-2 bg-bg-elevated rounded-full overflow-hidden">
                  <div className="h-full rounded-full gradient-brand" style={{ width: `${[100, 75, 40][i]}%` }} />
                </div>
                <span className="text-xs text-text-muted w-8">{[6, 4, 2][i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-bg-surface border-border">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-accent-amber" />
            <h3 className="text-sm font-semibold text-text-primary">Top Subjects</h3>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Physics', count: 8, color: 'bg-accent-cyan' },
              { name: 'Chemistry', count: 5, color: 'bg-accent-violet' },
              { name: 'Math', count: 4, color: 'bg-accent-amber' },
              { name: 'Biology', count: 3, color: 'bg-accent-emerald' },
            ].map(sub => (
              <div key={sub.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${sub.color}`} />
                  <span className="text-sm text-text-primary">{sub.name}</span>
                </div>
                <span className="text-xs text-text-muted">{sub.count} lessons</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-bg-surface border-border">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-accent-emerald" />
            <h3 className="text-sm font-semibold text-text-primary">Time Stats</h3>
          </div>
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-3xl font-bold text-text-primary">2h 15m</p>
              <p className="text-xs text-text-muted">Total AI Teacher time</p>
            </div>
            <div className="flex justify-between text-xs text-text-muted">
              <span>Avg. per lesson: 4:22</span>
              <span>Completed: 12/12</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Lesson History */}
      <Card className="bg-bg-surface border-border overflow-hidden" padding="none">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <BrainCircuit size={16} className="text-primary-400" /> Lesson History
          </h3>
        </div>
        <div className="divide-y divide-border">
          {lessons.map((lesson, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-bg-hover transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <BrainCircuit size={14} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{lesson.topic}</p>
                  <p className="text-xs text-text-muted">{lesson.grade} • {lesson.level} • {lesson.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted">{lesson.duration}</span>
                <div className="w-12 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-accent-emerald" style={{ width: `${lesson.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── PDF AI Progress ───────────────────────
function PdfAiProgress() {
  const pdfs = [
    { name: 'Physics Class 11 - Mechanics.pdf', questionsAsked: 12, mode: 'Chat', date: '2026-06-19' },
    { name: 'Chemistry Lab Manual.pdf', questionsAsked: 8, mode: 'Teach', date: '2026-06-18' },
    { name: 'Math Past Paper 2024.pdf', questionsAsked: 15, mode: 'Chat', date: '2026-06-17' },
    { name: 'Biology Diagrams.pdf', questionsAsked: 5, mode: 'Teach', date: '2026-06-16' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 bg-bg-surface border-border text-center">
          <FileText size={24} className="text-accent-cyan mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary">8</p>
          <p className="text-xs text-text-muted">PDFs Studied</p>
        </Card>
        <Card className="p-5 bg-bg-surface border-border text-center">
          <Zap size={24} className="text-accent-amber mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary">40</p>
          <p className="text-xs text-text-muted">Questions Asked</p>
        </Card>
        <Card className="p-5 bg-bg-surface border-border text-center">
          <Target size={24} className="text-accent-emerald mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary">6</p>
          <p className="text-xs text-text-muted">Knowledge Areas</p>
        </Card>
      </div>

      <Card className="bg-bg-surface border-border overflow-hidden" padding="none">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <FileText size={16} className="text-accent-cyan" /> PDF History
          </h3>
        </div>
        <div className="divide-y divide-border">
          {pdfs.map((pdf, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-bg-hover transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                  <FileText size={14} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{pdf.name}</p>
                  <p className="text-xs text-text-muted">{pdf.questionsAsked} questions • {pdf.date}</p>
                </div>
              </div>
              <Badge variant={pdf.mode === 'Teach' ? 'cyan' : 'glass'} size="sm">{pdf.mode}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Bhupesh Sir Progress ───────────────────────
function BhupeshSirProgress() {
  return (
    <div className="space-y-6">
      <Card className="p-8 bg-bg-surface border-border text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent-violet/20 border border-accent-violet/30 flex items-center justify-center mx-auto mb-4">
          <User size={28} className="text-accent-violet" />
        </div>
        <h3 className="text-xl font-display font-bold text-text-primary mb-2">Bhupesh Sir AI</h3>
        <p className="text-text-secondary mb-4 max-w-md mx-auto">
          Fixed teaching style with Neplish language. Voice clone and unique style prompt are coming in the next stage.
        </p>
        <Badge variant="violet" size="sm">Style Locked</Badge>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 bg-bg-surface border-border">
          <h4 className="font-semibold text-text-primary mb-3">Sessions Taken</h4>
          <div className="space-y-3">
            {[
              { topic: 'Thermodynamics', date: '2026-06-19', duration: '5:00' },
              { topic: 'Organic Chemistry', date: '2026-06-18', duration: '4:45' },
              { topic: 'Vector Algebra', date: '2026-06-17', duration: '5:00' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-bg-elevated">
                <div>
                  <p className="text-sm text-text-primary font-medium">{s.topic}</p>
                  <p className="text-xs text-text-muted">{s.date}</p>
                </div>
                <span className="text-xs text-text-muted">{s.duration}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-bg-surface border-border">
          <h4 className="font-semibold text-text-primary mb-3">Coming Soon</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Real voice clone from Bhupesh Sir's lectures
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Teaching style fine-tuning from real lecture transcripts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Personalized pace and difficulty adaptation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              Exam-specific question patterns
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

// ── Courses Progress ───────────────────────
function CoursesProgress() {
  const courses = [
    { title: 'Physics Complete Course', progress: 65, lessons: '13/20', grade: 'Class 11', subject: 'Physics' },
    { title: 'Chemistry Fundamentals', progress: 40, lessons: '8/20', grade: 'Class 11', subject: 'Chemistry' },
    { title: 'Mathematics Mastery', progress: 80, lessons: '16/20', grade: 'Class 12', subject: 'Math' },
    { title: 'Biology Basics', progress: 25, lessons: '5/20', grade: 'Class 11', subject: 'Biology' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 bg-bg-surface border-border text-center">
          <BookOpen size={24} className="text-accent-emerald mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary">4</p>
          <p className="text-xs text-text-muted">Enrolled Courses</p>
        </Card>
        <Card className="p-5 bg-bg-surface border-border text-center">
          <Award size={24} className="text-accent-amber mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary">42</p>
          <p className="text-xs text-text-muted">Lessons Completed</p>
        </Card>
        <Card className="p-5 bg-bg-surface border-border text-center">
          <TrendingUp size={24} className="text-primary-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-text-primary">52%</p>
          <p className="text-xs text-text-muted">Overall Completion</p>
        </Card>
      </div>

      <div className="space-y-4">
        {courses.map((course, i) => (
          <Card key={i} className="p-5 bg-bg-surface border-border hover:border-primary-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-text-primary">{course.title}</h4>
                <p className="text-xs text-text-muted">{course.grade} • {course.subject} • {course.lessons} lessons</p>
              </div>
              <Badge variant={course.progress >= 80 ? 'success' : course.progress >= 50 ? 'cyan' : 'muted'} size="sm">
                {course.progress}%
              </Badge>
            </div>
            <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full gradient-brand"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
