import { JSX, PropsWithChildren } from "react";

const DialogHeadingSection = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <div
            className="dialog-heading text-xl font-bold pb-5"
            style={{ height: "var(--dialog-header)", paddingInline: "var(--dialog-padding)" }}
        >
            {children}
        </div>
    );
};

export default DialogHeadingSection;
