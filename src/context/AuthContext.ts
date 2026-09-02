import { createContext } from "react";

export interface Session {
    userName: string,
    board: string,
}

export interface AuthContextType {
    session: Session | null,
    login: ({ userName, board }: Session) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthContextType | null>(null);
