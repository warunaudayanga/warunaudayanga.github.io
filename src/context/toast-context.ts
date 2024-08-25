import { createContext } from "react";

export interface ToastContextType {
    successToast(message: string, title?: string | null, life?: number): void;
    infoToast(message: string, title?: string | null, life?: number): void;
    warnToast(message: string, title?: string | null, life?: number): void;
    errorToast(message: string, title?: string | null, life?: number): void;
    secondaryToast(message: string, title?: string | null, life?: number): void;
    contrastToast(message: string, title?: string | null, life?: number): void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default ToastContext;
