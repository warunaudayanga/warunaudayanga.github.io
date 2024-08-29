import { JSX, ReactNode, UIEvent } from "react";
import "./Content.css";
import ScrollPane from "../ScrollPane.tsx";

interface Props {
    onContentScroll: (e: UIEvent<HTMLDivElement>) => void;
    children?: ReactNode;
}

const Content = ({ onContentScroll, children }: Props): JSX.Element => {
    return (
        <ScrollPane
            full
            height="100vh"
            width="100vw"
            className="fixed left-0 top-0 right-0 bottom-0 bg-gray-100"
            thumbColor="var(--secondary)"
            barColor="rgba(0, 0, 0, 0.3)"
            onScroll={onContentScroll}
        >
            {children}
        </ScrollPane>
    );
};

export default Content;
