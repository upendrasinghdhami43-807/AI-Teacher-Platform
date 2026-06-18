import { create } from 'zustand';
import type { AdminUser } from '@/types/admin.types';

interface AdminAuthState {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const mockAdmin: AdminUser = {
  id: 'admin-001', name: 'Super Admin', email: 'admin@aiteacher.np',
  role: 'super_admin', last_login_at: '2026-06-17T20:00:00Z',
};

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@aiteacher.np' && password === 'admin123') {
      set({ admin: mockAdmin, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false, error: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ admin: null, isAuthenticated: false, error: null });
  },
}));
