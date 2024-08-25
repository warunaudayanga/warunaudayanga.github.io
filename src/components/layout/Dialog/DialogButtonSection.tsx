import { JSX, PropsWithChildren } from "react";

const DialogButtonSection = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className="dialog-buttons flex justify-end items-center gap-3 pt-5 h-[60px]">{children}</div>;
};

export default DialogButtonSection;
