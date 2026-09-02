import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

export const useBoard = () => {
    const context = useContext(BoardContext);

    if (context === null) throw new Error('useBoard need to be only inside <BoardProvider>');

    return context;
};
