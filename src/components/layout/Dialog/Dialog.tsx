/* eslint-disable comma-spacing */
import { JSX } from "react";
import { Dialog as PrimeDialog } from "primereact/dialog";
import { DialogProps } from "../../../interfaces";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import DialogButtonSection from "./DialogButtonSection";
import DialogHeadingSection from "./DialogHeadingSection";
import DialogBodySection from "./DialogBodySection";
import "./Dialog.css";
import ProjectDialog from "../../dialogs/ProjectDialog/ProjectDialog.tsx";

const Dialog = ({
    component,
    options: { heading, width, buttons, content, full, data },
    close,
}: DialogProps): JSX.Element => {
    const hasButtons = buttons || (!component && typeof content !== "function");

    return (
        <PrimeDialog
            modal
            visible={true}
            onHide={() => close()}
            pt={{
                root: { className: full ? "max-h-[95vh] h-[95vh]" : "", style: { width: width || "95vw" } },
            }}
            content={() => (
                <div
                    className={classNames({
                        "bg-white rounded-lg p-5": true,
                        "h-full flex flex-col": full,
                    })}
                >
                    {heading && <DialogHeadingSection>{heading}</DialogHeadingSection>}
                    {/* {component?.({ close, data })}*/}
                    <ProjectDialog close={close} data={data}></ProjectDialog>
                    {content && <DialogBodySection full={full}>{content}</DialogBodySection>}
                    {hasButtons && (
                        <DialogButtonSection>
                            {buttons
                                ? buttons(close).map(button => button)
                                : !component &&
                                  typeof content !== "function" && (
                                      <Button size="small" onClick={() => close()}>
                                          Ok
                                      </Button>
                                  )}
                        </DialogButtonSection>
                    )}
                </div>
            )}
        ></PrimeDialog>
    );
};

export default Dialog;
