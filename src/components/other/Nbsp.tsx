import { JSX } from "react";

const Nbsp = ({ count = 1 }: { count: number }): JSX.Element => {
    return <span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(count) }}></span>;
};

export default Nbsp;
