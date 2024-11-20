import { JSX, PropsWithChildren } from "react";

const ToolSection = ({
    children,
    category,
    isSub,
}: PropsWithChildren<{ category: string; isSub?: boolean }>): JSX.Element => {
    return (
        <div className={isSub ? "tool-sub-section mb-2" : "tool-section mb-3"}>
            <div className={`font-bold ${isSub ? "mb-1" : "text-lg mb-2"}`}>{category}</div>
            <div className="ml-6 flex gap-3">{children}</div>
        </div>
    );
};

export default ToolSection;
