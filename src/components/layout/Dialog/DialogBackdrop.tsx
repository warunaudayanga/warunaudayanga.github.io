import { JSX, PropsWithChildren } from "react";

const DialogBackdrop = ({ children }: PropsWithChildren): JSX.Element => {
    const BACKDROP_OPACITY = 0.2;

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1001]"
            style={{ backgroundColor: `rgba(0, 0, 0, ${BACKDROP_OPACITY})` }}
        >
            {children}
        </div>
    );
};

export default DialogBackdrop;
