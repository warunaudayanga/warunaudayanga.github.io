/* eslint-disable comma-spacing,@typescript-eslint/no-explicit-any */
import { JSX, PropsWithChildren, useCallback, useState } from "react";
import { DialogContext } from "../context";
import { ConfirmDialogOptions, DialogComponent, DialogOptions, DialogRef } from "../interfaces";
import { ConfirmDialogButtons, Dialog } from "../components";
import { Button } from "primereact/button";

interface DialogItem<T = any, D = unknown> {
    id: number;
    options: DialogOptions<D>;
    component?: DialogComponent;
    resolver?: (value: T | undefined) => void;
}

const DialogProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [dialogs, setDialogs] = useState<DialogItem[]>([]);

    const open = <T, D = any>(options?: DialogOptions, component?: DialogComponent): DialogRef<T> => {
        const id = new Date().getTime();
        let resolver: (value: T | undefined) => void;

        const result: Promise<T | undefined> = new Promise<T | undefined>(resolve => {
            resolver = resolve;
        });

        setDialogs((dialogs: DialogItem<T>[]) => [
            ...dialogs,
            { id, options, component, resolver } as DialogItem<T, D>,
        ]);

        const closeDialog = (): void => {
            setDialogs(dialogs => dialogs.filter(dialog => dialog.id !== id));
        };

        return { closeDialog, result };
    };

    const openDialog = useCallback(
        <R, D>(
            optionsOrComponent: DialogOptions<D> | DialogComponent,
            options?: Omit<DialogOptions<D>, "buttons" | "content">,
        ): DialogRef<R> => {
            return open(
                typeof optionsOrComponent === "object" ? optionsOrComponent : options,
                typeof optionsOrComponent === "function" ? optionsOrComponent : undefined,
            );
        },
        [],
    );

    const alertDialog = useCallback(async ({ heading, message }: ConfirmDialogOptions): Promise<void> => {
        const ref = open<boolean>({
            heading,
            content: message,
            buttons: close => [
                <Button key="ok" className="btn-small" onClick={close}>
                    OK
                </Button>,
            ],
        });
        await ref.result;
    }, []);

    const confirmDialog = useCallback(
        ({ heading, message, confirmText, cancelText }: ConfirmDialogOptions): Promise<boolean | undefined> => {
            const ref = open<boolean>({
                heading,
                content: message,
                buttons: close => ConfirmDialogButtons({ close, confirmText, cancelText }),
            });
            return ref.result;
        },
        [],
    );

    return (
        <DialogContext.Provider value={{ openDialog, confirmDialog, alertDialog }}>
            {children}
            {dialogs.map(({ id, options, component, resolver }) => (
                <Dialog
                    key={id}
                    options={options}
                    close={<T,>(response?: T): void => {
                        setDialogs(dialogs => dialogs.filter((dialog: DialogItem<T>) => dialog.id !== id));
                        resolver?.(response);
                    }}
                    component={component}
                />
            ))}
        </DialogContext.Provider>
    );
};

export default DialogProvider;
