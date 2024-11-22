/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { JSX } from "react";
import { StackIcon } from "../other";
import { stackIcon, StackIconType } from "../../data/stack-icons.ts";
import classNames from "classnames";

interface Props {
    tool: keyof typeof stackIcon | StackIconType;
    size?: string;
    className?: string;
    labelClassName?: string;
}

const StackItem = ({ tool, size = "25px", className, labelClassName }: Props): JSX.Element | null => {
    return (
        <span
            className={classNames({
                "inline-flex items-center gap-2": true,
                [`${className}`]: true,
            })}
        >
            {
                <StackIcon
                    icon={typeof tool === "object" ? tool.icon : stackIcon[tool]?.icon || stackIcon.NPM.icon}
                    size={size}
                ></StackIcon>
            }
            <span className={labelClassName}>
                {typeof tool === "object" ? tool.label : stackIcon[tool]?.label || tool}
            </span>
        </span>
    );
};

export default StackItem;
