import { JSX, PropsWithChildren, useReducer } from "react";
import { appReducer, initialAppState } from "../reducers";
import { AppContext } from "../context";

const AppProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default AppProvider;
