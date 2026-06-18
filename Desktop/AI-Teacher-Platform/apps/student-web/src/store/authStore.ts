import { create } from 'zustand';
import type { User } from '@/types';
import type { RegisterData } from '@/types/api.types';
import { currentUser } from '@/data/mockUsers';
import { delay } from '@/lib/utils';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (_email: string, _password: string) => {
    set({ isLoading: true });
    await delay(800);
    set({ user: currentUser, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  register: async (_data: RegisterData) => {
    set({ isLoading: true });
    await delay(1200);
    set({ user: currentUser, isAuthenticated: true, isLoading: false });
  },
}));
