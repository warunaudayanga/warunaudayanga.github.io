import { JSX, PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className="p-5 pt-12">{children}</div>;
};

export default Page;
