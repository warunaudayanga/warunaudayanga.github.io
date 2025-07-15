import { JSX, PropsWithChildren } from "react";
import classNames from "classnames";

const Header = ({ show, children }: PropsWithChildren<{ show?: boolean }>): JSX.Element => {
    return (
        <div
            className={classNames({
                "rounded-none fixed top-0 left-0 h-0 z-[1000] bg-[var(--secondary)] w-full flex justify-between": true,
                "h-[var(--header)]": show,
            })}
            style={{ transition: "height 0.3s" }}
        >
            <div className="h-full w-full max-w-screen-xl m-auto px-4 sm:px-6 md:px-10 flex justify-between items-center gap-5 relative">
                {children}
            </div>
        </div>
    );
};

export default Header;
