import { useEffect } from 'react';
import { socket } from '../../../shared/lib/socket';
import { useBoardStore } from '../store/boardStore';
import type { Task } from '../../../shared/types/board';

export const useSocket = (boardId: string, userName: string) => {
  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join', { boardId, userName });
    };
    const handleTasks = (tasks: Task[]) => useBoardStore.getState().setTasks(tasks);
    const handleUsers = (users: string[]) => useBoardStore.getState().setOnlineUsers(users);
    const handleCreate = (task: Task) => useBoardStore.getState().addTask(task);
    const handleUpdate = (task: Task) => useBoardStore.getState().updateTask(task);
    const handleDelete = ({ taskId }: { taskId: string }) => useBoardStore.getState().deleteTask(taskId);

    socket.on('connect', handleConnect);
    socket.on('tasks', handleTasks);
    socket.on('online_users', handleUsers);
    socket.on('task_create', handleCreate);
    socket.on('task_update', handleUpdate);
    socket.on('task_delete', handleDelete);

    socket.connect();

    return () => {
      useBoardStore.getState().reset();
      socket.emit('leave');
      socket.off('connect', handleConnect);
      socket.off('tasks', handleTasks);
      socket.off('online_users', handleUsers);
      socket.off('task_create', handleCreate);
      socket.off('task_update', handleUpdate);
      socket.off('task_delete', handleDelete);
      socket.disconnect();
    };
  }, [boardId, userName]);
};
