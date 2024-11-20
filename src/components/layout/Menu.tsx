import { JSX, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useAppState } from "../../hooks";
import { MenuItem } from "../../interfaces";
import { scrollIntoElement } from "../../utils";

interface Props {
    items?: MenuItem[];
    className?: string;
}

const Menu = ({ items, className }: Props): JSX.Element => {
    let location = useLocation();
    const { state } = useAppState();

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        items?.forEach((item, i) => {
            if (item.url === `#${state.route}` || item.elementId === state.route) setActiveIndex(i);
        });
    }, [location, state.route]);

    return (
        <div className={twMerge("h-full flex items-center gap-5", className)}>
            {items?.map((item, i) => (
                <a key={i} href={item.url} onClick={() => scrollIntoElement(item.elementId)}>
                    <div
                        className={classNames({
                            "px-4 py-2 cursor-pointer rounded-md flex items-center gap-2": true,
                            "hover:bg-secondary-dark": activeIndex !== i,
                            "bg-secondary-darker hover:bg-secondary-darker": activeIndex === i,
                        })}
                        onClick={() => item.action?.()}
                    >
                        {item.icon}
                        {item.label}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default Menu;
