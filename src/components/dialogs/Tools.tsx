/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { JSX } from "react";
import { StackIcon } from "../other";
import { stackIcon } from "../../data/stack-icons.ts";

const Tools = ({ tools }: { tools?: (keyof typeof stackIcon)[] }): JSX.Element[] | null => {
    return tools?.length
        ? tools.map((tool, index) => (
              <div key={index} className="flex items-center gap-1">
                  {<StackIcon icon={stackIcon[tool]?.icon || stackIcon.NPM.icon} size="18px"></StackIcon>}
                  <div>{stackIcon[tool]?.label || tool}</div>
              </div>
          ))
        : null;
};

export default Tools;
