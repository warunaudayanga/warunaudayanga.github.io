import { JSX, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useAppState, useClickOutside } from "../../hooks";
import { MenuItem } from "../../interfaces";
import { scrollIntoElement } from "../../utils";
import { FaBars, FaTimes } from "react-icons/fa";

interface Props {
    items?: MenuItem[];
    className?: string;
    scrolled?: boolean;
}

const Menu = ({ items, className, scrolled }: Props): JSX.Element => {
    let location = useLocation();
    const { state } = useAppState();
    const menuRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useClickOutside(menuRef, () => setIsMobileMenuOpen(false));

    useEffect(() => {
        items?.forEach((item, i) => {
            if (item.url === `#${state.route}` || item.elementId === state.route) setActiveIndex(i);
        });
    }, [location, state.route]);

    const handleMenuItemClick = (item: MenuItem): void => {
        scrollIntoElement(item.elementId);
        item.action?.();
        setIsMobileMenuOpen(false);
    };

    return (
        <div ref={menuRef} className={twMerge("h-full flex items-center", className)}>
            {/* Desktop Menu - Hidden on mobile */}
            {scrolled && (
                <div className="hidden md:flex items-center gap-5">
                    {items?.map((item, i) =>
                        item.hidden ? null : (
                            <a key={i} href={item.url} onClick={() => handleMenuItemClick(item)}>
                                <div
                                    className={classNames({
                                        "px-4 py-2 cursor-pointer rounded-md flex items-center gap-2": true,
                                        "hover:bg-secondary-dark": activeIndex !== i,
                                        "bg-secondary-darker hover:bg-secondary-darker": activeIndex === i,
                                    })}
                                >
                                    {item.icon}
                                    {item.label}
                                </div>
                            </a>
                        ),
                    )}
                </div>
            )}

            {/* Mobile Hamburger Menu - Visible only on mobile */}
            <div className="md:hidden">
                {/* Hamburger Button */}
                {scrolled && (
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md hover:bg-secondary-dark transition-colors duration-200"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                )}

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-secondary border border-secondary-dark shadow-lg z-[1001]">
                        <div className="py-2">
                            {items?.map((item, i) =>
                                item.hidden ? null : (
                                    <a
                                        key={i}
                                        href={item.url}
                                        onClick={() => handleMenuItemClick(item)}
                                        className="block"
                                    >
                                        <div
                                            className={classNames({
                                                "px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-secondary-dark transition-colors duration-200":
                                                    true,
                                                "bg-secondary-darker": activeIndex === i,
                                            })}
                                        >
                                            {item.icon}
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                    </a>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
