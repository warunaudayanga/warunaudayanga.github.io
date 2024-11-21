import { ProjectDocument } from "../interfaces";

export enum ProjectActionType {
    SET_PROJECTS = "SET_PROJECTS",
    ADD_PROJECT = "ADD_PROJECT",
    UPDATE_PROJECT = "UPDATE_PROJECT",
    UPDATE_PROJECTS = "UPDATE_PROJECTS",
    DELETE_PROJECT = "DELETE_PROJECT",
}

interface SetProjectsAction {
    type: ProjectActionType.SET_PROJECTS;
    projects: ProjectDocument[];
}

interface AddProjectAction {
    type: ProjectActionType.ADD_PROJECT;
    project: ProjectDocument;
}

interface UpdateProjectAction {
    type: ProjectActionType.UPDATE_PROJECT;
    project: ProjectDocument;
}

interface UpdateProjectsAction {
    type: ProjectActionType.UPDATE_PROJECTS;
    projects: ProjectDocument[];
}

interface DeleteProjectAction {
    type: ProjectActionType.DELETE_PROJECT;
    projectId: string;
}

export interface ProjectState {
    projects: ProjectDocument[];
}

const initialProjectState: ProjectState = {
    projects: [],
};

export type ProjectAction =
    | SetProjectsAction
    | AddProjectAction
    | UpdateProjectAction
    | UpdateProjectsAction
    | DeleteProjectAction;

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
    switch (action.type) {
        case ProjectActionType.SET_PROJECTS:
            return { ...state, projects: [...action.projects] };
        case ProjectActionType.ADD_PROJECT:
            return { ...state, projects: [...state.projects, action.project] };
        case ProjectActionType.UPDATE_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects.map(project => (project.id === action.project.id ? action.project : project)),
                ],
            };
        case ProjectActionType.UPDATE_PROJECTS:
            return {
                ...state,
                projects: [...state.projects.map(project => action.projects.find(p => p.id === project.id) || project)],
            };
        case ProjectActionType.DELETE_PROJECT:
            return { ...state, projects: [...state.projects.filter(project => project.id !== action.projectId)] };
        default:
            return state;
    }
};

export { projectReducer, initialProjectState };
