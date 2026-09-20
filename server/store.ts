export type TaskStatus = 'toDo' | 'inProgress' | 'inReview' | 'done';

export const VALID_STATUSES: TaskStatus[] = ['toDo', 'inProgress', 'inReview', 'done'];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

interface Room {
  tasks: Map<string, Task>;
  users: Map<string, string>;
}

const rooms = new Map<string, Room>();

function getOrCreateRoom(boardId: string): Room {
  if (!rooms.has(boardId)) {
    rooms.set(boardId, { tasks: new Map(), users: new Map() });
  }
  return rooms.get(boardId)!;
}

function addTask(boardId: string, task: Task): Task {
  const room = getOrCreateRoom(boardId);
  room.tasks.set(task.id, task);
  return task;
}

function updateTask(boardId: string, task: Task): Task | null {
  const room = getOrCreateRoom(boardId);
  if (!room.tasks.has(task.id)) return null;
  room.tasks.set(task.id, task);
  return task;
}

function deleteTask(boardId: string, taskId: string): boolean {
  const room = getOrCreateRoom(boardId);
  return room.tasks.delete(taskId);
}

function getTasksArray(boardId: string): Task[] {
  const room = getOrCreateRoom(boardId);
  return Array.from(room.tasks.values());
}

function addUser(boardId: string, socketId: string, userName: string): void {
  const room = getOrCreateRoom(boardId);
  room.users.set(socketId, userName);
}

function removeUser(boardId: string, socketId: string): void {
  const room = rooms.get(boardId);
  if (room) room.users.delete(socketId);
}

function getOnlineUsers(boardId: string): string[] {
  const room = rooms.get(boardId);
  if (!room) return [];
  return Array.from(room.users.values());
}

export { getOrCreateRoom, addTask, updateTask, deleteTask, getTasksArray, addUser, removeUser, getOnlineUsers };
