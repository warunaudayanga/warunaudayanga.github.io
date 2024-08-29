import { JSX, PropsWithChildren } from "react";

const DialogButtonSection = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <div
            className="dialog-buttons flex justify-end items-center gap-3"
            style={{
                height: "var(--dialog-footer)",
                paddingTop: "var(--dialog-padding)",
                paddingInline: "var(--dialog-padding)",
            }}
        >
            {children}
        </div>
    );
};

export default DialogButtonSection;
