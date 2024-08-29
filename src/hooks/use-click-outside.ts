import { useEffect, RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return (): void => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export default useClickOutside;
