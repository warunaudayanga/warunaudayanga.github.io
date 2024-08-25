import { JSX, PropsWithChildren } from "react";

const DialogHeadingSection = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className="dialog-heading text-xl font-bold pb-5 px-5 h-[50px]">{children}</div>;
};

export default DialogHeadingSection;
