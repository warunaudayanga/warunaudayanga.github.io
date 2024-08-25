import { useContext } from "react";
import { AppContext, AppContextType } from "../context";

export const useAppState = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppState must be used within an AppProvider");
    }

    return context;
};
