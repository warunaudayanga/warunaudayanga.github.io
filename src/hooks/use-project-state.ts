import { useContext } from "react";
import { ProjectContext, ProjectContextType } from "../context";

export const useProjectState = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectState must be used within an ProjectProvider");
    }

    return context;
};
