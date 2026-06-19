import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuthStore } from '@/store/adminAuthStore';
import AdminLayout from '@/components/layout/AdminLayout';

import AdminLoginPage from '@/pages/auth/AdminLoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import UsersPage from '@/pages/users/UsersPage';
import UserDetailPage from '@/pages/users/UserDetailPage';
import CoursesAdminPage from '@/pages/courses/CoursesAdminPage';
import CourseBuilderPage from '@/pages/courses/CourseBuilderPage';
import LessonBuilderPage from '@/pages/courses/LessonBuilderPage';
import ContentLibraryPage from '@/pages/content/ContentLibraryPage';
import SmartPdfPage from '@/pages/content/SmartPdfPage';
import LectureLibraryPage from '@/pages/lectures/LectureLibraryPage';
import ChatHistoryPage from '@/pages/chat/ChatHistoryPage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import PersonaManagerPage from '@/pages/personas/PersonaManagerPage';
import SettingsPage from '@/pages/settings/SettingsPage';

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserDetailPage />} />
        <Route path="/courses" element={<CoursesAdminPage />} />
        <Route path="/courses/new" element={<CourseBuilderPage />} />
        <Route path="/courses/:courseId" element={<CourseBuilderPage />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonBuilderPage />} />
        <Route path="/content" element={<ContentLibraryPage />} />
        <Route path="/content/smart-pdfs" element={<SmartPdfPage />} />
        <Route path="/lectures" element={<LectureLibraryPage />} />
        <Route path="/chat-history" element={<ChatHistoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/personas" element={<PersonaManagerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
