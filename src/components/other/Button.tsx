import { CSSProperties, JSX, MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Color } from "../../types";
import classNames from "classnames";

interface Props {
    icon?: ReactNode;
    rounded?: boolean;
    className?: string;
    style?: CSSProperties;
    color?: Color;
    type?: "button" | "submit" | "reset" | "link";
    size?: "small" | "large";
    disabled?: boolean;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    link?: string;
}

const Button = ({
    icon,
    color,
    rounded,
    className,
    style,
    type = "button",
    size,
    disabled,
    children,
    onClick,
    link,
}: Props): JSX.Element => {
    let focusShadow: string;

    switch (color) {
        case "primary":
            focusShadow = "focus:shadow-primary";
            break;
        case "secondary":
            focusShadow = "focus:shadow-secondary";
            break;
        case "accent":
            focusShadow = "focus:shadow-accent";
            break;
        case "accent-dark":
            focusShadow = "focus:shadow-accent";
            break;
        case "accent-darker":
            focusShadow = "focus:shadow-accent";
            break;
        case "success":
            focusShadow = "focus:shadow-green";
            break;
        case "info":
            focusShadow = "focus:shadow-blue";
            break;
        case "help":
            focusShadow = "focus:shadow-yellow";
            break;
        case "warning":
            focusShadow = "focus:shadow-yellow";
            break;
        case "danger":
            focusShadow = "focus:shadow-red";
            break;
        case "black":
            focusShadow = "focus:shadow-black";
            break;
        case "white":
            focusShadow = "focus:shadow-white";
            break;
        case "gray":
            focusShadow = "focus:shadow-gray";
            break;
        default:
            focusShadow = "focus:shadow-primary";
            break;
    }

    const classes = twMerge(
        "border px-3 flex justify-center items-center h-[40px] font-bold",
        `bg-${color || "primary"}`,
        `border-${color || "primary"}`,
        icon && children ? "gap-2" : "gap-0",
        size === "small" ? "h-[30px]" : size === "large" ? "h-[50px]" : "h-[40px]",
        rounded ? "rounded-full" : "rounded-[6px] min-w-24",
        color === "white" ? "text-black" : color?.startsWith("accent") ? "text-black" : "text-white",
        className,
        focusShadow,
    );

    if (type === "link") {
        return (
            <a
                href={link}
                className={classNames({
                    [classes]: true,
                    "cursor-pointer": !disabled,
                    "pointer-events-none": disabled,
                })}
                target="_blank"
                rel="noreferrer"
            >
                <button style={style} type="button" disabled={disabled}>
                    <div>{icon}</div>
                    <div>{children}</div>
                </button>
            </a>
        );
    }

    return (
        <button className={classes} style={style} type={type} disabled={disabled} onClick={onClick}>
            <div>{icon}</div>
            <div>{children}</div>
        </button>
    );
};

export default Button;
