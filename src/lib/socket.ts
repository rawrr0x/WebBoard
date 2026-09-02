import { io, type Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents, Task } from "../types/board";

const SERVER_URL = 'http://localhost:5005';

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const createSocket = (): BoardSocket => io(SERVER_URL, { autoConnect: false });

export const emitTaskCreate = (socket: BoardSocket, task: Task) => {
    socket.emit('task_create', JSON.stringify(task));
};

export const emitTaskUpdate = (socket: BoardSocket, task: Task) => {
    socket.emit('task_update', JSON.stringify(task));
};

export const emitJoin = (socket: BoardSocket, userName: string, board: string) => {
    socket.emit('join', JSON.stringify({ userName, roomName: board }));
}

export const parseTaskMessage = (message: string) => {
    const task = JSON.parse(message);

    if (Object.getPrototypeOf(task) !== Object.prototype || !task.id || !task.title) return null;

    return task;
};

export const parseTasksMessage = (message: string) => {
    const tasks = JSON.parse(message);

    if (!Array.isArray(tasks)) return null;

    return tasks;
};

export const parseOnlineUsersMessage = (message: string) => {
    const onlineUsers = JSON.parse(message);

    if (!Array.isArray(onlineUsers)) return null;

    return onlineUsers;
};
