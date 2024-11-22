import { JSX, PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className="pt-12">{children}</div>;
};

export default Page;
