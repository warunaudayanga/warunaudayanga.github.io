import { JSX, ReactNode } from "react";
import { Route } from "../../enums";

interface Props {
    title: string;
    route: Route | string;
    children?: ReactNode;
}

const Section = ({ title, route, children }: Props): JSX.Element => {
    return (
        <div className="page-section max-w-screen-xl m-auto px-0">
            <div id={route} className="route"></div>
            <h1 className="text-2xl font-bold pb-10 text-secondary"># {title}</h1>
            {children}
        </div>
    );
};

export default Section;
