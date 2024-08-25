import { createContext } from "react";
import { User } from "@firebase/auth";

export interface AuthState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export default AuthContext;
