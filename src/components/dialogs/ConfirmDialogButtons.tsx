import { JSX } from "react";
import { PropsWithCloseAndData } from "../../interfaces";
import { Button } from "../other";
import { Severity } from "../../types";

interface Props {
    cancelText?: string;
    confirmText?: string;
    severity?: Severity;
}

const ConfirmDialogButtons = ({
    close,
    cancelText,
    confirmText,
    severity,
}: PropsWithCloseAndData<unknown, boolean, Props>): JSX.Element[] => [
    <Button className="btn-small" key="no" onClick={() => close(false)} color={"gray"}>
        {cancelText || "No"}
    </Button>,
    <Button className="btn-small" key="yes" onClick={() => close(true)} color={severity}>
        {confirmText || "Yes"}
    </Button>,
];

export default ConfirmDialogButtons;
