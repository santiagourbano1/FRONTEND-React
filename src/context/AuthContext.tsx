import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthUser = {
    token: string;
    id: number;
    username: string;
    email: string;
    nombre: string;
    apellido: string;
    role: string;
} | null;

type AuthContextType = {
    user: AuthUser;
    login: (user: NonNullable<AuthUser>) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<AuthUser>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const login = (userData: NonNullable<AuthUser>) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return ctx;
}