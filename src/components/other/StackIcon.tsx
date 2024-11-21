import { JSX } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    icon: string;
    size?: string;
    className?: string;
}

const StackIcon = ({ icon, size = "25px", className }: Props): JSX.Element => {
    return (
        <span
            className={twMerge("inline-block", className)}
            style={{
                backgroundImage: `url(${icon})`,
                height: size,
                width: size,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};

export default StackIcon;
