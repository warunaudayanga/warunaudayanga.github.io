/* eslint-disable comma-spacing */
import { JSX } from "react";
import { DialogProps } from "../../../interfaces";
import DialogBackdrop from "./DialogBackdrop.tsx";
import { DialogBodySection, DialogButtonSection, DialogHeadingSection } from "../index";
import classNames from "classnames";
import { Button } from "../../other";

const Dialog = ({
    component,
    options: { heading, width, buttons, content, full, data },
    close,
}: DialogProps): JSX.Element => {
    const hasButtons = buttons || (!component && typeof content !== "function");
    const body = component?.({ close, data });

    return (
        <DialogBackdrop>
            <div
                className={classNames({
                    "flex flex-col bg-white rounded shadow-xl": true,
                    "w-full h-full": full,
                    "w-[550px]": !full,
                })}
                style={{
                    width,
                    maxHeight: "var(--dialog-max-height)",
                    maxWidth: "var(--dialog-max-width)",
                    paddingBlock: "var(--dialog-padding)",
                }}
            >
                {heading && <DialogHeadingSection>{heading}</DialogHeadingSection>}
                {body}
                {content && <DialogBodySection full={full}>{content}</DialogBodySection>}
                {hasButtons && (
                    <DialogButtonSection>
                        {buttons
                            ? buttons(close).map(button => button)
                            : !component &&
                              typeof content !== "function" && (
                                  <Button color="gray" onClick={() => close()}>
                                      Close
                                  </Button>
                              )}
                    </DialogButtonSection>
                )}
            </div>
        </DialogBackdrop>
    );
};

export default Dialog;
