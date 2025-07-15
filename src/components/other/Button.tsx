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
    size?: "small" | "large" | "icon";
    variant?: "default" | "admin" | "link-button" | "action" | "outline";
    disabled?: boolean;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    link?: string;
    title?: string;
}

const Button = ({
    icon,
    color,
    rounded,
    className,
    style,
    type = "button",
    size,
    variant = "default",
    disabled,
    children,
    onClick,
    link,
    title,
}: Props): JSX.Element => {
    // Base classes for all buttons
    const baseClasses =
        "flex items-center justify-center transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Variant-specific classes
    const getVariantClasses = (): string => {
        switch (variant) {
            case "admin":
                return twMerge(
                    baseClasses,
                    "bg-white/90 hover:bg-white shadow-md text-gray-700",
                    size === "icon" ? "w-8 h-8" : "px-3 py-2",
                    rounded ? "rounded-full" : "rounded-md",
                    "focus:ring-blue-500",
                );

            case "link-button":
                return twMerge(
                    baseClasses,
                    "px-3 py-2 text-sm rounded-lg",
                    color === "github"
                        ? "bg-gray-900 hover:bg-gray-800 text-white"
                        : color === "npm"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-900 hover:bg-gray-800 text-white",
                    "focus:ring-gray-500",
                );

            case "action":
                return twMerge(
                    baseClasses,
                    "flex-1 gap-2 py-3 px-4 rounded-lg font-medium",
                    color === "primary"
                        ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                        : color === "success"
                          ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                          : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
                );

            case "outline":
                return twMerge(
                    baseClasses,
                    "border-2 bg-transparent hover:bg-gray-50",
                    color === "danger"
                        ? "border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
                    size === "small" ? "px-2 py-1 text-sm" : "px-4 py-2",
                    rounded ? "rounded-full" : "rounded-md",
                );

            default: // "default" variant - legacy support
                // eslint-disable-next-line no-case-declarations
                let focusShadow: string;
                switch (color) {
                    case "primary":
                        focusShadow = "focus:shadow-primary";
                        break;
                    case "danger":
                        focusShadow = "focus:shadow-red";
                        break;
                    default:
                        focusShadow = "focus:shadow-primary";
                        break;
                }

                return twMerge(
                    baseClasses,
                    "border font-bold",
                    `bg-${color || "primary"}`,
                    `border-${color || "primary"}`,
                    icon && children ? "gap-2" : "gap-0",
                    size === "small" ? "px-2 py-1 text-sm" : size === "large" ? "px-4 py-3" : "px-3 py-2",
                    rounded ? "rounded-full" : "rounded-[6px] min-w-24",
                    color === "white" ? "text-black" : color?.startsWith("accent") ? "text-black" : "text-white",
                    focusShadow,
                );
        }
    };

    const classes = twMerge(
        getVariantClasses(),
        // Special handling for danger variant in admin buttons
        variant === "admin" && color === "danger" && "bg-red-500/90 hover:bg-red-500 text-white",
        className,
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
                title={title}
                style={style}
            >
                {icon && <span>{icon}</span>}
                {children && <span>{children}</span>}
            </a>
        );
    }

    return (
        <button className={classes} style={style} type={type} disabled={disabled} onClick={onClick} title={title}>
            {icon && <span>{icon}</span>}
            {children && <span>{children}</span>}
        </button>
    );
};

export default Button;
