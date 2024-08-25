/* eslint-disable @typescript-eslint/unified-signatures */
import { createContext } from "react";
import { AlertDialogOptions, ConfirmDialogOptions, DialogComponent, DialogOptions, DialogRef } from "../interfaces";

export interface DialogContextType {
    openDialog<T, D = unknown>(
        Component: DialogComponent<T, D>,
        options: Omit<DialogOptions<D>, "buttons" | "content">,
    ): DialogRef<T>;
    openDialog<T, D = unknown>(options: DialogOptions<D>): DialogRef<T>;
    alertDialog(options: AlertDialogOptions): Promise<void>;
    confirmDialog(options: ConfirmDialogOptions): Promise<boolean | undefined>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export default DialogContext;
