import { JSX, PropsWithChildren } from "react";
import ScrollPane from "../ScrollPane.tsx";

const DialogBodySection = ({ children, full }: PropsWithChildren<{ full?: boolean }>): JSX.Element => {
    const maxHeight =
        "calc(var(--dialog-max-height) - var(--dialog-header) - var(--dialog-footer) - var(--dialog-padding) * 2";

    return (
        <div className="max-w-full">
            <ScrollPane
                style={{
                    maxHeight,
                    height: full ? maxHeight : "auto",
                }}
            >
                {children}
            </ScrollPane>
        </div>
    );
};

export default DialogBodySection;
