import { JSX, ReactNode, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MenuItem } from "../../interfaces";
import classNames from "classnames";

interface Props {
    items?: MenuItem[];
    title?: string;
}

const PopupMenu = ({ items, title }: Props): JSX.Element => {
    const avatarRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const [opened, setOpened] = useState(false);

    const avatarBounds = avatarRef.current?.getBoundingClientRect();

    const PopupMenuPanel = (): ReactNode =>
        ReactDOM.createPortal(
            <div
                className={classNames({
                    "absolute z-[1000]": true,
                    hidden: !opened,
                })}
                style={{
                    top: avatarBounds?.bottom || 0,
                    right: window.innerWidth - (avatarBounds?.right || 0),
                }}
            >
                <div
                    className="w-0 h-0 border-transparent border-[15px] border-b-white border-t-0 relative"
                    style={{ left: "calc(100% - 35px)" }}
                ></div>
                <div className="rounded-md bg-white shadow-lg shadow-gray-300 py-2 flex flex-col">
                    {items?.map((item, i) => (
                        <div
                            key={i}
                            className="px-5 py-1 h-[40px] flex items-center cursor-pointer hover:bg-gray gap-2"
                            onClick={() => item.action?.()}
                        >
                            {item.icon}
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>,
            document.body,
        );

    return (
        <div ref={panelRef}>
            <div className="relative">
                <div
                    ref={avatarRef}
                    className="text-primary-darker bg-accent w-10 h-10 rounded-full flex justify-center items-center font-bold text-xl cursor-pointer"
                    onClick={() => setOpened(!opened)}
                >
                    {title?.[0].toUpperCase()}
                </div>
                <PopupMenuPanel></PopupMenuPanel>
            </div>
        </div>
    );
};

export default PopupMenu;
