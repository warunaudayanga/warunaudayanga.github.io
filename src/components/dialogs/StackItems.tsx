/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { JSX } from "react";
import { stackIcon, StackIconType } from "../../data/stack-icons.ts";
import StackItem from "./StackItem.tsx";

interface Props {
    tools?: (keyof typeof stackIcon)[] | StackIconType[];
    size?: string;
    className?: string;
    labelClassName?: string;
}

const StackItems = ({ tools, size = "25px", className, labelClassName }: Props): JSX.Element[] | null => {
    return tools?.length
        ? tools.map((tool, index) => (
              <StackItem key={index} tool={tool} size={size} className={className} labelClassName={labelClassName} />
          ))
        : null;
};

export default StackItems;
