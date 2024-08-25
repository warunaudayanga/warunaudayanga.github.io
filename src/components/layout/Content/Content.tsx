import { JSX, ReactNode, UIEvent } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import "./Content.css";

interface Props {
    onContentScroll: (e: UIEvent<HTMLDivElement>) => void;
    children?: ReactNode;
}

const Content = ({ onContentScroll, children }: Props): JSX.Element => {
    return (
        <ScrollPanel className="content bg-gray-100" onScrollCapture={onContentScroll}>
            {children}
            <div className="scrollbar"></div>
        </ScrollPanel>
    );
};

export default Content;
