import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { AuthContext, type Session } from "./AuthContext";

const SESSION_KEY = 'user_session';

const getSession = (): Session | null => {
    const { userName, board } = JSON.parse(localStorage.getItem(SESSION_KEY));

    if (!board || !userName || board.trim() === '' || userName.trim() === '') return null;

    return { userName, board };
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(getSession);

    const login = useCallback(({ userName, board }: Session) => {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ userName, board }));
        setSession({ userName, board });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(SESSION_KEY);
        setSession(null);
    }, []);

    const contextValue = useMemo(() => ({ session, login, logout }), [session, login, logout]);

    return <AuthContext value={contextValue}>{children}</AuthContext>
};
