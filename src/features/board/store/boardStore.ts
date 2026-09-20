import { create } from 'zustand';
import type { Task } from '../../../shared/types/board';

interface BoardStore {
  tasks: Task[];
  onlineUsers: string[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  setOnlineUsers: (users: string[]) => void;
  reset: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  tasks: [],
  onlineUsers: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    })),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  reset: () => set({ tasks: [], onlineUsers: [] }),
}));
