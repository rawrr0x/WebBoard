import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Task } from "../types/board";
import { createSocket, emitJoin, parseOnlineUsersMessage, parseTaskMessage, parseTasksMessage, type BoardSocket } from "../lib/socket";
import { BoardContext } from "./BoardContext";

export const BoardProvider = ({ children }: PropsWithChildren) => {
    const { session } = useAuth();

    const userName = session?.userName;
    const board = session?.board;

    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    const socketRef = useRef<BoardSocket | null>(null);

    useEffect(() => {
        if (!userName || !board) return;

        const socket = createSocket();
        socketRef.current = socket;

        socket.on('connect', () => emitJoin(socket, userName, board));

        socket.on('tasks', (data) => setTasks(parseTasksMessage(data)));

        socket.on('task_create', (data) => setTasks(prev => [...prev, parseTaskMessage(data)]));

        socket.on('task_update', (data) => {
            setTasks(prev => {
                const copy = [...prev];
                const updatedTask = parseTaskMessage(data);

                if (!updatedTask) return copy;

                const expiredTaskIndex = copy.findIndex(task => task.id === updatedTask.id);

                copy.splice(expiredTaskIndex, 1, updatedTask);

                return copy;
            });
        });

        socket.on('online_users', (data) => setOnlineUsers(parseOnlineUsersMessage(data)));

        return () => {
            socket.disconnect();
            socketRef.current = null;

            setOnlineUsers([]);
            setTasks([]);
        };
    }, [userName, board]);

    const contextValue = useMemo(() => ({ tasks, onlineUsers }), [tasks, onlineUsers]);

    return <BoardContext value={contextValue}>{children}</BoardContext>
};
