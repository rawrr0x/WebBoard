export type TaskStatus = 'toDo' | 'inProgress' | 'inReview' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface ServerToClientEvents {
  joined: (data: { boardId: string; userName: string }) => void;
  tasks: (data: Task[]) => void;
  online_users: (data: string[]) => void;
  task_create: (data: Task) => void;
  task_update: (data: Task) => void;
  task_delete: (data: { taskId: string }) => void;
}

export interface ClientToServerEvents {
  join: (data: { boardId: string; userName: string }) => void;
  task_create: (data: { boardId: string; task: Omit<Task, 'id' | 'createdAt'> }) => void;
  task_update: (data: { boardId: string; task: Task }) => void;
  task_delete: (data: { boardId: string; taskId: string }) => void;
  leave: () => void;
}
