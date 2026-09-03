import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Task } from "../types/board";
import { createSocket, emitJoin, emitTaskCreate, parseOnlineUsersMessage, parseTaskMessage, parseTasksMessage, type BoardSocket } from "../lib/socket";
import { BoardContext } from "./BoardContext";

export const BoardProvider = ({ children }: PropsWithChildren) => {
    const { session } = useAuth();

    const userName = session?.userName;
    const board = session?.board;

    const [tasks, setTasks] = useState<Task[]>([]);
    // const [todoTasks, setTodoTasks] = useState<Task[]>([]);
    // const [progress, setProgressTasks] = useState<Task[]>([])
    // const [reviewTasks, setReviewTasks] = useState<Task[]>([]);
    // const [doneTasks, setDoneTasks] = useState<Task[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    const socketRef = useRef<BoardSocket | null>(null);

    const sendTask = useCallback((title: string, description: string) => {
        const socket = socketRef.current;
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (trimmedTitle === '' || trimmedDescription === '') return;

        emitTaskCreate(socket, {
            id: Date.now(),
            title: trimmedTitle,
            description: trimmedDescription,
            status: 'toDo',
            createdAt: `${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}`,
        });
    }, [userName]);

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

        socket.connect();

        return () => {
            socket.disconnect();
            socketRef.current = null;

            setOnlineUsers([]);
            setTasks([]);
        };
    }, [userName, board]);

    const contextValue = useMemo(() => ({ tasks, onlineUsers, sendTask }), [tasks, onlineUsers, sendTask]);

    return <BoardContext value={contextValue}>{children}</BoardContext>
};
