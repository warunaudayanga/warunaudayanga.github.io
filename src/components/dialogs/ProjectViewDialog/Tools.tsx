import { JSX } from "react";
import { Tool } from "../../../interfaces";
import { StackIcon } from "../../other";
import { stackIcon } from "../../../data/stack-icons.ts";

const Tools = ({ tools }: { tools?: Tool[] }): JSX.Element[] | null => {
    return tools?.length
        ? tools.map((tool, index) => (
              <div key={index} className="flex items-center gap-1">
                  {tool.icon && <StackIcon icon={stackIcon[tool.icon]} size="18px"></StackIcon>}
                  <div>{tool.name}</div>
              </div>
          ))
        : null;
};

export default Tools;
