// noinspection SpellCheckingInspection

import { JSX, ReactNode } from "react";
import { Route } from "../../enums";
import { Section } from "../index.ts";
import { ProjectCard } from "../other";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import { toFirstCase } from "hichchi-utils";
import { handleProjectOrder } from "../../utils";
import { handleProjectDelete } from "../../utils/project-utils.ts";
import { useProjectState } from "../../hooks/use-project-state.ts";
import { ProjectActionType } from "../../reducers";

interface Props {
    category: ProjectCategory;
    route: Route;
    description?: ReactNode;
    bgSecondary?: boolean;
}

const Projects = ({ category, route, description, bgSecondary }: Props): JSX.Element | null => {
    const { getProjects, dispatch } = useProjectState();

    const projects = getProjects(category);

    const handleOrder = async (id: string, decrease?: boolean): Promise<void> => {
        const orderedProjects = await handleProjectOrder(projects, id, decrease);
        dispatch({ type: ProjectActionType.UPDATE_PROJECTS, projects: orderedProjects });
        // const x = projects.map((project, i) => ({ ...project, order: i }));
        // console.log(x);
        // for await (const x1 of x) {
        //     await updateCollectionItem(firestore, Collection.PROJECTS, x1.id, x1);
        // }
    };

    const handleDelete = async (id: string): Promise<void> => {
        const updatedProjects = await handleProjectDelete(projects, id);
        dispatch({ type: ProjectActionType.DELETE_PROJECT, projectId: id });
        dispatch({ type: ProjectActionType.UPDATE_PROJECTS, projects: updatedProjects });
    };

    if (!projects.length) return null;

    return (
        <Section
            title={category === ProjectCategory.NPM ? "NPM Libraries" : `${toFirstCase(category)} Projects`}
            route={route}
            className={bgSecondary ? "bg-gray-175" : "bg-gray-100"}
        >
            {description}
            <div className="flex flex-wrap mx-3">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onChangeOrder={handleOrder}
                        onDeleted={handleDelete}
                    ></ProjectCard>
                ))}
            </div>
        </Section>
    );
};

export default Projects;
