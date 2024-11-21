import { JSX, PropsWithChildren, useReducer } from "react";
import { projectReducer, initialProjectState } from "../reducers";
import { ProjectContext } from "../context";
import { ProjectCategory } from "../enums/project-category.enum.ts";
import { ProjectDocument } from "../interfaces";

const ProjectProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [state, dispatch] = useReducer(projectReducer, initialProjectState);

    // Define additional functions
    const getProjects = (category?: ProjectCategory): ProjectDocument[] => {
        return category
            ? state.projects.filter(project => project.category === category).sort((a, b) => a.order - b.order)
            : state.projects;
    };

    const getProject = (id: string): ProjectDocument | undefined => {
        return state.projects.find(project => project.id === id);
    };

    return (
        <ProjectContext.Provider value={{ state, getProject, getProjects, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectProvider;
