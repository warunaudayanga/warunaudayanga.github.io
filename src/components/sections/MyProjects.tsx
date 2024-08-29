// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";
import { Section } from "../index.ts";
import { ProjectCard } from "../other";

const MyProjects = (): JSX.Element => {
    return (
        <Section title="My Projects" route={Route.PROJECTS}>
            <br />
            <br />
            <br />
            <div className="flex flex-wrap mx-3">
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
            </div>
        </Section>
    );
};

export default MyProjects;
