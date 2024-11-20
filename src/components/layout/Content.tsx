import { JSX, ReactNode, UIEvent } from "react";
import ScrollPane from "./ScrollPane/ScrollPane.tsx";

interface Props {
    onContentScroll: (e: UIEvent<HTMLDivElement>) => void;
    children?: ReactNode;
}

const Content = ({ onContentScroll, children }: Props): JSX.Element => {
    return (
        <ScrollPane className="bg-gray-100" maxHeight="100vh" full onScrollCapture={onContentScroll}>
            {children}
        </ScrollPane>
    );
};

export default Content;
