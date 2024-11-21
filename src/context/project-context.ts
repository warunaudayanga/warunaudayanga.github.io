import { createContext, Dispatch } from "react";
import { ProjectAction, ProjectState } from "../reducers";
import { ProjectDocument } from "../interfaces";
import { ProjectCategory } from "../enums/project-category.enum.ts";

export interface ProjectContextType {
    state: ProjectState;
    getProject: (id: string) => ProjectDocument | undefined;
    getProjects: (category?: ProjectCategory) => ProjectDocument[];
    dispatch: Dispatch<ProjectAction>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default ProjectContext;
