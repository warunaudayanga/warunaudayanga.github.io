import { JSX, MouseEvent as ReMouseEvent, UIEvent, ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    width?: string;
    height?: string;
    barSize?: number;
    barColor?: string;
    thumbColor?: string;
    full?: boolean;
    className?: string;
    children?: ReactNode;
    onScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

const ScrollPane = ({
    width,
    height,
    children,
    barSize = 10,
    barColor = "red",
    thumbColor = "black",
    full,
    className,
    onScroll,
}: Props): JSX.Element => {
    const [isGrabbingX, setGrabbingX] = useState(false);
    const [isGrabbingY, setGrabbingY] = useState(false);

    const [hasBarX, setHasBarX] = useState(false);
    const [hasBarY, setHasBarY] = useState(false);

    const [barYHeight, setBarYHeight] = useState(100);
    const [barXWidth, setBarXWidth] = useState(100);

    const [nativeBarXSize, setNativeBarXSize] = useState(0);
    const [nativeBarYSize, setNativeBarYSize] = useState(0);

    const [startXY, setStartXY] = useState<{ x: number; y: number; top: number; left: number }>({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
    });
    const [currentXY, setCurrentXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const barXRef = useRef<HTMLDivElement>(null);
    const barYRef = useRef<HTMLDivElement>(null);
    const scrollPaneRef = useRef<HTMLDivElement>(null);

    const scrollY = (barYTop: number): void => {
        if (scrollPaneRef.current && barYRef.current) {
            const contentHeight = scrollPaneRef.current.scrollHeight;
            const containerHeight = scrollPaneRef.current.clientHeight;
            const scrollHeight = contentHeight - containerHeight;

            const barMaxTop = containerHeight - barYRef.current.clientHeight;

            const scrollProportion = barYTop / barMaxTop;

            scrollPaneRef.current.style.scrollBehavior = "auto";
            scrollPaneRef.current.scrollTop = scrollProportion * scrollHeight;
            scrollPaneRef.current.style.scrollBehavior = "smooth";
        }
    };

    const scrollX = (barXLeft: number): void => {
        if (scrollPaneRef.current && barXRef.current) {
            const contentWidth = scrollPaneRef.current.scrollWidth;
            const containerWidth = scrollPaneRef.current.clientWidth;
            const scrollWidth = contentWidth - containerWidth;

            const barMaxLeft = containerWidth - barXRef.current.clientWidth;

            const scrollProportion = barXLeft / barMaxLeft;

            scrollPaneRef.current.style.scrollBehavior = "auto";
            scrollPaneRef.current.scrollLeft = scrollProportion * scrollWidth;
            scrollPaneRef.current.style.scrollBehavior = "smooth";
        }
    };

    let handleMouseDownX = (e: ReMouseEvent): void => {
        e.preventDefault();
        if (barXRef.current) {
            const barRect = barXRef.current.getBoundingClientRect();
            setStartXY({ x: e.clientX, y: e.clientY, top: 0, left: barRect.left });
            setGrabbingX(true);
        }
    };

    let handleMouseDownY = (e: ReMouseEvent): void => {
        e.preventDefault();
        if (barYRef.current) {
            const barRect = barYRef.current.getBoundingClientRect();
            setStartXY({ x: e.clientX, y: e.clientY, top: barRect.top, left: 0 });
            setGrabbingY(true);
        }
    };

    const handleMouseMove = (e: MouseEvent): void => {
        e.preventDefault();
        if (barYRef.current) {
            setCurrentXY({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = (e: MouseEvent): void => {
        e.preventDefault();
        setGrabbingX(false);
        setGrabbingY(false);
    };

    const handleScrollCapture = (e: UIEvent<HTMLDivElement>): void => {
        onScroll?.(e);
        if (scrollPaneRef.current) {
            const scrollPane = scrollPaneRef.current;

            if (barXRef.current) {
                const scrollLeft = scrollPane.scrollLeft;
                const contentWidth = scrollPane.scrollWidth;
                const containerWidth = scrollPane.clientWidth;

                const barMaxLeft = containerWidth - barXRef.current.clientWidth;
                const barXLeft = (scrollLeft / (contentWidth - containerWidth)) * barMaxLeft;
                barXRef.current.style.left = `${barXLeft}px`;
            }

            if (barYRef.current) {
                const scrollTop = scrollPane.scrollTop;
                const contentHeight = scrollPane.scrollHeight;
                const containerHeight = scrollPane.clientHeight;

                const barMaxTop = containerHeight - barYRef.current.clientHeight;
                const barYTop = (scrollTop / (contentHeight - containerHeight)) * barMaxTop;
                barYRef.current.style.top = `${barYTop}px`;
            }
        }
    };

    useEffect(() => {
        if (!scrollPaneRef.current) return;

        const handleMutation = (): void => {
            if (scrollPaneRef.current) {
                setHasBarX(scrollPaneRef.current.scrollWidth > scrollPaneRef.current.clientWidth);
                setHasBarY(scrollPaneRef.current.scrollHeight > scrollPaneRef.current.clientHeight);

                if (barXRef.current) {
                    setNativeBarXSize(scrollPaneRef.current.offsetHeight - scrollPaneRef.current.clientHeight);
                }

                if (barYRef.current) {
                    setNativeBarYSize(scrollPaneRef.current.offsetWidth - scrollPaneRef.current.clientWidth);
                }
            }
        };

        const mutationObserver = new MutationObserver(handleMutation);
        mutationObserver.observe(scrollPaneRef.current, { childList: true, subtree: true });

        handleMutation();

        return (): void => {
            mutationObserver.disconnect();
        };
    }, []);

    useEffect((): (() => void) => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return (): void => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (isGrabbingX && barXRef.current) {
            const barXRect = barXRef.current.getBoundingClientRect();

            const left = startXY.left + (currentXY.x - startXY.left) - (startXY.x - startXY.left);
            if (
                left >= scrollPaneRef.current!.getBoundingClientRect().left &&
                left <= scrollPaneRef.current!.getBoundingClientRect().right - barXRect.width
            ) {
                barXRef.current.style.left = `${left}px`;
                scrollX(left);
            } else {
                if (left < scrollPaneRef.current!.getBoundingClientRect().left) {
                    barXRef.current.style.left = "0px";
                    scrollX(0);
                }
                if (left > scrollPaneRef.current!.getBoundingClientRect().right - barXRect.width) {
                    barXRef.current.style.left = `${scrollPaneRef.current!.getBoundingClientRect().right - barXRect.width}px`;
                    scrollX(scrollPaneRef.current!.getBoundingClientRect().right - barXRect.width);
                }
            }
        }

        if (isGrabbingY && barYRef.current) {
            const barYRect = barYRef.current.getBoundingClientRect();

            const top = startXY.top + (currentXY.y - startXY.top) - (startXY.y - startXY.top);
            if (
                top >= scrollPaneRef.current!.getBoundingClientRect().top &&
                top <= scrollPaneRef.current!.getBoundingClientRect().bottom - barYRect.height
            ) {
                barYRef.current.style.top = `${top}px`;
                scrollY(top);
            } else {
                if (top < scrollPaneRef.current!.getBoundingClientRect().top) {
                    barYRef.current.style.top = "0px";
                    scrollY(0);
                }
                if (top > scrollPaneRef.current!.getBoundingClientRect().bottom - barYRect.height) {
                    barYRef.current.style.top = `${scrollPaneRef.current!.getBoundingClientRect().bottom - barYRect.height}px`;
                    scrollY(scrollPaneRef.current!.getBoundingClientRect().bottom - barYRect.height);
                }
            }
        }
    }, [currentXY]);

    useEffect(() => {
        const updateScrollbarLengths = (): void => {
            if (scrollPaneRef.current) {
                const contentWidth = scrollPaneRef.current.scrollWidth;
                const contentHeight = scrollPaneRef.current.scrollHeight;
                const containerWidth = scrollPaneRef.current.clientWidth;
                const containerHeight = scrollPaneRef.current.clientHeight;

                setHasBarX(contentWidth > containerWidth);
                setHasBarY(contentHeight > containerHeight);

                if (barXRef.current) {
                    const barXWidth = (containerWidth / contentWidth) * containerWidth;
                    setBarXWidth(barXWidth);
                }

                if (barYRef.current) {
                    const barYHeight = (containerHeight / contentHeight) * containerHeight;
                    setBarYHeight(barYHeight);
                }
            }
        };

        updateScrollbarLengths();

        window.addEventListener("resize", updateScrollbarLengths);

        return (): void => {
            window.removeEventListener("resize", updateScrollbarLengths);
        };
    }, [scrollPaneRef.current]);

    return (
        <div
            className={`relative overflow-hidden box-content ${className}`}
            style={{ width, height, maxHeight: height }}
        >
            <div
                ref={scrollPaneRef}
                className="overflow-auto scroll-smooth"
                style={{
                    height: `calc(100% + ${nativeBarXSize ? nativeBarXSize + 1 : 18}px)`,
                    width: `calc(100% + ${nativeBarYSize ? nativeBarYSize + 1 : 18}px)`,
                }}
                onScrollCapture={handleScrollCapture}
            >
                {children}
            </div>

            {hasBarX && (
                <div
                    className={twMerge("h-3 absolute left-0", full ? "bottom-0" : "bottom-2")}
                    style={{
                        height: `${barSize}px`,
                        width: full ? (hasBarY ? "calc(100% - 10px)" : "100%") : "100%",
                        paddingInline: full ? "0" : "20px",
                    }}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundColor: barColor,
                            borderRadius: full ? "0" : "0.5rem",
                        }}
                    >
                        <div
                            ref={barXRef}
                            className="absolute left-0 bottom-0"
                            style={{
                                width: barXWidth,
                                height: `${barSize}px`,
                                paddingRight: full ? (hasBarY ? "17px" : "0") : hasBarY ? "calc(20px + 10px)" : "20px",
                                borderRadius: full ? "0" : "0.5rem",
                            }}
                        >
                            <div
                                className="h-full relative "
                                style={{
                                    left: full ? "0" : "20px",
                                    width: full
                                        ? `calc(100% - ${hasBarY ? 10 : 0}px)`
                                        : `calc(100% - 40px + ${hasBarY ? 5 : 0}px)`,
                                    backgroundColor: thumbColor,
                                    borderRadius: full ? "0" : "0.5rem",
                                }}
                                onMouseDown={handleMouseDownX}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {hasBarY && (
                <div
                    className={twMerge("w-3 h-full absolute top-0", full ? "right-0" : "right-2")}
                    style={{ width: `${barSize}px`, paddingBlock: full ? "0" : "20px" }}
                >
                    <div
                        className="w-full h-full"
                        style={{ backgroundColor: barColor, borderRadius: full ? "0" : "0.5rem" }}
                    >
                        <div
                            ref={barYRef}
                            className="absolute top-0 right-0"
                            style={{
                                width: `${barSize}px`,
                                height: barYHeight,
                                paddingBottom: full ? (hasBarX ? "17px" : "0") : "20px",
                                borderRadius: full ? "0" : "0.5rem",
                            }}
                        >
                            <div
                                className="w-full rounded-lg relative"
                                style={{
                                    top: full ? "0" : "20px",
                                    height: full ? "100%" : "calc(100% - 40px)",
                                    backgroundColor: thumbColor,
                                    borderRadius: full ? "0" : "0.5rem",
                                }}
                                onMouseDown={handleMouseDownY}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScrollPane;
