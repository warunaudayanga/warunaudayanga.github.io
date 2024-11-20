import { JSX, PropsWithChildren } from "react";
import ScrollPane from "../ScrollPane/ScrollPane.tsx";

const DialogBodySection = ({ children, full }: PropsWithChildren<{ full?: boolean }>): JSX.Element => {
    const maxHeight =
        "calc(var(--dialog-max-height) - var(--dialog-header) - var(--dialog-footer) - var(--dialog-padding) * 2";

    return (
        <ScrollPane maxHeight={maxHeight} height={full ? "100%" : ""}>
            {children}
        </ScrollPane>
    );
};

export default DialogBodySection;
