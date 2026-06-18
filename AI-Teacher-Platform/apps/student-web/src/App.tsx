import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import StudentLayout from '@/components/layout/StudentLayout';

// Lazy imports would go here in production — using direct imports for Stage 1
import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import AiTeacherPage from '@/pages/ai-teacher/AiTeacherPage';
import ClassroomPage from '@/pages/ai-teacher/ClassroomPage';
import PdfLearnPage from '@/pages/pdf-learn/PdfLearnPage';
import CoursesPage from '@/pages/courses/CoursesPage';
import CourseDetailPage from '@/pages/courses/CourseDetailPage';
import LessonPage from '@/pages/courses/LessonPage';
import ProfilePage from '@/pages/profile/ProfilePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-display font-bold gradient-text">404</h1>
      <p className="text-text-secondary">Page not found</p>
      <a href="/dashboard" className="btn-primary px-6 py-2 rounded-sm text-white font-semibold">Back to Dashboard</a>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ai-teacher" element={<AiTeacherPage />} />
        <Route path="/ai-teacher/classroom" element={<ClassroomPage />} />
        <Route path="/pdf-learn" element={<PdfLearnPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
