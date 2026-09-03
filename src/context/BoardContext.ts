import { createContext } from "react";
import type { Task } from "../types/board";

export interface BoardContextType {
    tasks: Task[] | null,
    onlineUsers: string[],
    sendTask: (title: string, description: string) => void,
}

export const BoardContext = createContext<BoardContextType | null>(null);
