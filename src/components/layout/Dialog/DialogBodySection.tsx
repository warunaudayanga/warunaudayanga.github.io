import { JSX, PropsWithChildren } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { classNames } from "primereact/utils";

const DialogBodySection = ({ children, full }: PropsWithChildren<{ full?: boolean }>): JSX.Element => {
    return (
        <ScrollPanel
            className="flex-grow"
            style={{ maxHeight: "calc(100% - 110px)" }}
            pt={{ content: { className: "h-full" } }}
        >
            <div
                className={classNames({
                    "dialog-body px-5": true,
                    "h-full": full,
                })}
            >
                {children}
            </div>
        </ScrollPanel>
    );
};

export default DialogBodySection;
