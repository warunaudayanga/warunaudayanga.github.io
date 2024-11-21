import { Route } from "../enums";
import { ProjectDocument } from "../interfaces";

export enum AppActionType {
    SET_ROUTE = "SET_ROUTE",
}

interface SetRouteAction {
    type: AppActionType.SET_ROUTE;
    route: Route;
}

export interface AppState {
    route: Route;
    projects: ProjectDocument[];
}

const initialAppState: AppState = {
    route: Route.HOME,
    projects: [],
};

export type AppAction = SetRouteAction;

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case AppActionType.SET_ROUTE:
            if (state.route !== action.route) {
                return { ...state, route: action.route };
            }
            return state;
        default:
            return state;
    }
};

export { appReducer, initialAppState };
