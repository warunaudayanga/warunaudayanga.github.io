/* eslint-disable comma-spacing */
import { JSX, PropsWithChildren, useRef } from "react";
import { Toast } from "primereact/toast";
import ToastContext from "../context/toast-context.ts";

export const TOAST_LIFETIME = 3000;

const ToastProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const toast = useRef<Toast>(null);

    const successToast = (message: string, title?: string | null, life?: number): void => {
        toast.current?.show({
            severity: "success",
            summary: title || "Success",
            detail: message,
            life: life || TOAST_LIFETIME,
        });
    };

    const infoToast = (message: string, title?: string | null, life?: number): void => {
        toast.current?.show({
            severity: "info",
            summary: title || "Info",
            detail: message,
            life: life || TOAST_LIFETIME,
        });
    };

    const warnToast = (message: string, title?: string | null, life?: number): void => {
        toast.current?.show({
            severity: "warn",
            summary: title || "Warning",
            detail: message,
            life: life || TOAST_LIFETIME,
        });
    };

    const errorToast = (message: string, title?: string | null, life?: number): void => {
        toast.current?.show({
            severity: "error",
            summary: title || "Error",
            detail: message,
            life: life || TOAST_LIFETIME,
        });
    };

    const secondaryToast = (message: string, title?: string | null, life?: number): void => {
        toast.current?.show({
            severity: "secondary",
            summary: title || "Secondary",
            detail: message,
            life: life || TOAST_LIFETIME,
        });
    };

    const contrastToast = (message: string, title?: string | null, life?: number): void => {
        toast.current?.show({
            severity: "contrast",
            summary: title || "Contrast",
            detail: message,
            life: life || TOAST_LIFETIME,
        });
    };

    const context = { successToast, infoToast, warnToast, errorToast, secondaryToast, contrastToast };

    return (
        <ToastContext.Provider value={context}>
            {children}
            <Toast className="" ref={toast} pt={{ content: { className: "border-none" } }} />
        </ToastContext.Provider>
    );
};

export default ToastProvider;
