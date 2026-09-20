import { create } from 'zustand';

interface AuthStore {
  userName: string | null;
  boardId: string | null;
  login: (userName: string, boardId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userName: null,
  boardId: null,
  login: (userName, boardId) => set({ userName, boardId }),
  logout: () => set({ userName: null, boardId: null }),
}));
