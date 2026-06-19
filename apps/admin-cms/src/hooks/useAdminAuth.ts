import { useAdminAuthStore } from '@/store/adminAuthStore';

export function useAdminAuth() {
  const { admin, isAuthenticated, isLoading, error, login, logout } = useAdminAuthStore();
  return { admin, isAuthenticated, isLoading, error, login, logout };
}
