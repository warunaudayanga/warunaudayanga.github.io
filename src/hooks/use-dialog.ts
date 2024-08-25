import { useContext } from "react";
import { DialogContext, DialogContextType } from "../context";

const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }

    return context;
};

export default useDialog;
