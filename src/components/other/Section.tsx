import { JSX, ReactNode } from "react";
import { Route } from "../../enums";
import { twMerge } from "tailwind-merge";

interface Props {
    title: string;
    route: Route | string;
    children?: ReactNode;
    className?: string;
}

const Section = ({ title, route, children, className }: Props): JSX.Element => {
    return (
        <div className={twMerge("page-section m-auto p-0 py-5 md:px-5", className)}>
            <div className="max-w-screen-xl m-auto p-5 px-0 md:px-5">
                <div id={route} className="route"></div>
                <h1 className="text-3xl text-center font-bold mb-8 md:mb-16 text-secondary">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default Section;
