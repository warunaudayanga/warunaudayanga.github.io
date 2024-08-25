/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, ReactNode } from "react";

export type PropsWithCloseAndData<R = any, D = unknown, P = unknown> = P & {
    close: (response?: R) => void;
    data?: D;
};

export type DialogComponent<T = any, D = unknown, P = unknown> = (props: PropsWithCloseAndData<T, D, P>) => JSX.Element;

export interface DialogOptions<D = unknown> {
    heading?: string;
    width?: string;
    content?: ReactNode;
    buttons?: (close: <T>(response?: T) => void) => JSX.Element[];
    full?: boolean;
    data?: D;
}

export interface AlertDialogOptions {
    heading?: string;
    message: string;
}

export interface ConfirmDialogOptions extends AlertDialogOptions {
    confirmText?: string;
    cancelText?: string;
}

export interface DialogProps {
    options: DialogOptions;
    data?: unknown;
    close: <T>(response?: T) => void;
    component?: <T, D>({ close, data }: PropsWithCloseAndData<T | undefined, D>) => JSX.Element;
}

export interface DialogRef<T> {
    closeDialog: () => void;
    result: Promise<T | undefined>;
}
