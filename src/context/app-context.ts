import { createContext, Dispatch } from "react";
import { AppAction, AppState } from "../reducers";

export interface AppContextType {
    state: AppState;
    dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
