import { JSX } from "react";
import { PropsWithCloseAndData } from "../../interfaces";
import { Button } from "../other";

interface Props {
    cancelText?: string;
    confirmText?: string;
}

const ConfirmDialogButtons = ({
    close,
    cancelText,
    confirmText,
}: PropsWithCloseAndData<unknown, boolean, Props>): JSX.Element[] => [
    <Button className="btn-small" key="no" onClick={() => close(false)}>
        {cancelText || "No"}
    </Button>,
    <Button className="btn-small" key="yes" onClick={() => close(true)}>
        {confirmText || "Yes"}
    </Button>,
];

export default ConfirmDialogButtons;
