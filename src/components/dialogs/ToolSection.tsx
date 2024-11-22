import { JSX, PropsWithChildren } from "react";
import classNames from "classnames";

const ToolSection = ({
    children,
    category,
    isSub,
}: PropsWithChildren<{ category: string; isSub?: boolean }>): JSX.Element => {
    return (
        <div className={isSub ? "tool-sub-section mb-2" : "tool-section mb-3"}>
            <div
                className={classNames({
                    "font-bold mb-5": true,
                    "text-lg": !isSub,
                })}
            >
                {category}
            </div>
            <div className="ml-6 flex flex-wrap gap-5">{children}</div>
        </div>
    );
};

export default ToolSection;
