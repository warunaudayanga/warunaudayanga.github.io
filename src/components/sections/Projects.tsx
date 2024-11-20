// noinspection SpellCheckingInspection

import { JSX } from "react";
import { Route } from "../../enums";
import { Section } from "../index.ts";
import { ProjectCard, Spinner } from "../other";
import { useQueryCollection } from "../../hooks/use-query-collection.hook.ts";
import { ProjectDocument } from "../../interfaces";
import { orderBy, where } from "firebase/firestore";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import { toFirstCase } from "hichchi-utils";
import { handleProjectOrder } from "../../utils";
import { Collection } from "../../config/firebase.ts";
import { handleProjectDelete } from "../../utils/project-utils.ts";

const Projects = ({ category, route }: { category: ProjectCategory; route: Route }): JSX.Element | null => {
    const {
        items: projects,
        setItems,
        loading,
    } = useQueryCollection<ProjectDocument>(Collection.PROJECTS, [where("category", "==", category), orderBy("order")]);

    const handleOrder = async (id: string, decrease?: boolean): Promise<void> => {
        await handleProjectOrder(projects, setItems, id, decrease);
    };

    const handleDelete = async (id: string): Promise<void> => {
        await handleProjectDelete(projects, setItems, id);
    };

    if (!projects.length) return null;

    return (
        <Section title={`${toFirstCase(category)} Projects`} route={route}>
            <div className="flex flex-wrap mx-3">
                {loading ? (
                    <div className="h-[250px] w-full flex justify-center items-center">
                        <Spinner className="h-20 w-20 border-primary"></Spinner>
                    </div>
                ) : (
                    projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onChangeOrder={handleOrder}
                            onDeleted={handleDelete}
                        ></ProjectCard>
                    ))
                )}
            </div>
        </Section>
    );
};

export default Projects;
