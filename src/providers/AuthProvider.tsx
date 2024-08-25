import { JSX, PropsWithChildren, useState } from "react";
import { AuthContext, AuthState } from "../context";
import { auth } from "../config/firebase.ts";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserCredential, User } from "@firebase/auth";
import firebase from "firebase/compat/app";
import FirebaseError = firebase.FirebaseError;

const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);

    onAuthStateChanged(auth, user => setUser(user));

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error: unknown) {
            const err = error as Partial<FirebaseError>;
            switch (err.code) {
                case "auth/invalid-email":
                    throw new Error("Invalid email!");
                case "auth/invalid-credential":
                    throw new Error("Invalid email or password!");
                default:
                    throw new Error("Unexpected error occurred!");
            }
        }
    };

    const checkAuth = (): boolean => {
        return Boolean(auth.currentUser);
    };

    const logout = async (): Promise<void> => {
        await auth.signOut();
        setUser(null);
    };

    const authState: AuthState = { user, login, logout, checkAuth };

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthContext };

export default AuthProvider;
