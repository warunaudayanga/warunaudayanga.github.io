import { JSX } from "react";
import { twMerge } from "tailwind-merge";

const Spinner = ({ className }: { className?: string }): JSX.Element => {
    return (
        <div
            className={twMerge(
                "inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current",
                "border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] flex-shrink-0",
                className,
            )}
            role="status"
        ></div>
    );
};

export default Spinner;
