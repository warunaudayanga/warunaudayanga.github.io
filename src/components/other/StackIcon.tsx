import { JSX } from "react";
import classNames from "classnames";

const StackIcon = ({ icon, size = "25px", inline }: { icon: string; size?: string; inline?: boolean }): JSX.Element => {
    return (
        <span
            className={classNames({
                "inline-block": true,
                "relative top-[3px]": inline,
            })}
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
