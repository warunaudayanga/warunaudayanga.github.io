import { JSX, ReactNode, UIEvent, useEffect, useRef, useState } from "react";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import "./ScrollPane.css";
import { twMerge } from "tailwind-merge";

interface Props {
    maxHeight?: string;
    height?: string;
    full?: boolean;
    className?: string;
    children: ReactNode;
    onScrollCapture?: (e: UIEvent<HTMLDivElement>) => void;
}

const ScrollPane = ({ maxHeight, height, children, full, className, onScrollCapture }: Props): JSX.Element => {
    const [scrollBehavior, setScrollBehavior] = useState<string>("smooth");
    const scrollPaneRef = useRef<OverlayScrollbarsComponentRef>(null);
    useEffect(() => {
        const scrollPane = scrollPaneRef.current?.getElement();
        if (scrollPane) {
            scrollPane.style.scrollBehavior = scrollBehavior;
        }
    }, [scrollBehavior]);
    return (
        <div className={twMerge(className, "flex-grow")} style={{ maxHeight, height }}>
            <OverlayScrollbarsComponent
                ref={scrollPaneRef}
                options={{ scrollbars: { theme: full ? "scroll-pane-full" : "scroll-pane" } }}
                style={{ maxHeight, height, marginInline: full ? "" : "10px" }}
                defer
                onScrollCapture={onScrollCapture}
                onMouseDown={() => setScrollBehavior("auto")}
                onMouseUp={() => setScrollBehavior("smooth")}
            >
                {children}
            </OverlayScrollbarsComponent>
        </div>
    );
};

export default ScrollPane;
