import { Server, Socket } from 'socket.io';
import * as store from './store.js';
import { VALID_STATUSES } from './store.js';

function registerSocketHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    function leaveRoom(): void {
      const boardId = socket.data.boardId as string | undefined;
      if (!boardId) return;
      store.removeUser(boardId, socket.id);
      socket.leave(boardId);
      socket.data.boardId = null;
      io.to(boardId).emit('online_users', store.getOnlineUsers(boardId));
    }

    socket.on('join', (payload: { boardId: string; userName: string }) => {
      const { boardId, userName } = payload;
      if (!boardId || !userName) return;

      socket.data.boardId = boardId;
      socket.data.userName = userName;
      socket.join(boardId);
      store.addUser(boardId, socket.id, userName);

      socket.emit('joined', { boardId, userName });
      socket.emit('tasks', store.getTasksArray(boardId));
      io.to(boardId).emit('online_users', store.getOnlineUsers(boardId));
    });

    socket.on('task_create', (payload: { boardId: string; task: Omit<store.Task, 'id' | 'createdAt'> }) => {
      const { boardId, task } = payload;
      if (!boardId || !task?.title) return;
      if (!VALID_STATUSES.includes(task.status as store.TaskStatus)) return;

      const newTask: store.Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      store.addTask(boardId, newTask);
      io.to(boardId).emit('task_create', newTask);
    });

    socket.on('task_update', (payload: { boardId: string; task: store.Task }) => {
      const { boardId, task } = payload;
      if (!boardId || !task?.id) return;
      if (!task.title || !VALID_STATUSES.includes(task.status as store.TaskStatus)) return;

      const updated = store.updateTask(boardId, task);
      if (updated) io.to(boardId).emit('task_update', updated);
    });

    socket.on('task_delete', (payload: { boardId: string; taskId: string }) => {
      const { boardId, taskId } = payload;
      if (!boardId || !taskId) return;

      const deleted = store.deleteTask(boardId, taskId);
      if (deleted) io.to(boardId).emit('task_delete', { taskId });
    });

    socket.on('leave', () => leaveRoom());
    socket.on('disconnect', () => leaveRoom());
  });
}

export { registerSocketHandlers };
