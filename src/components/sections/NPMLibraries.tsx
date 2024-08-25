// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";
import { Section } from "../index.ts";

const NPMLibraries = (): JSX.Element => {
    return <Section title="NPM Libraries" route={Route.NPM}></Section>;
};

export default NPMLibraries;
