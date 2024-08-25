// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";
import { Section } from "../index.ts";

const PersonalProjects = (): JSX.Element => {
    return <Section title="Personal Projects" route={Route.PERSONAL}></Section>;
};

export default PersonalProjects;
