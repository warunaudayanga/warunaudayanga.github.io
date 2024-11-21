/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { JSX } from "react";
import { StackIcon } from "../other";
import { stackIcon } from "../../data/stack-icons.ts";

interface Props {
    tools?: (keyof typeof stackIcon)[];
    size?: string;
    className?: string;
}

const Tools = ({ tools, size = "25px", className }: Props): JSX.Element[] | null => {
    return tools?.length
        ? tools.map((tool, index) => (
              <div key={index} className="flex items-center gap-1">
                  {<StackIcon icon={stackIcon[tool]?.icon || stackIcon.NPM.icon} size={size}></StackIcon>}
                  <div className={className}>{stackIcon[tool]?.label || tool}</div>
              </div>
          ))
        : null;
};

export default Tools;
