import { JSX } from "react";
import { Button } from "primereact/button";
import { PropsWithCloseAndData } from "../../interfaces";

interface Props {
    cancelText?: string;
    confirmText?: string;
}

const ConfirmDialogButtons = ({
    close,
    cancelText,
    confirmText,
}: PropsWithCloseAndData<unknown, boolean, Props>): JSX.Element[] => [
    <Button className="btn-small" key="no" label={cancelText || "No"} onClick={() => close(false)} />,
    <Button className="btn-small" key="yes" label={confirmText || "Yes"} onClick={() => close(true)} />,
];

export default ConfirmDialogButtons;
