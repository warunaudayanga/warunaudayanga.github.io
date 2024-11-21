// noinspection JSIgnoredPromiseFromCall

import { JSX } from "react";
import { useAuth, useDialog } from "../../hooks";
import { ProjectDialog, ProjectViewDialog } from "../dialogs";
import { ProjectDocument } from "../../interfaces";
import Button from "./Button.tsx";
import { FaChevronLeft, FaChevronRight, FaPen } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import ProjectPlaceholder from "./ProjectPlaceholder/ProjectPlaceholder.tsx";
import { useProjectState } from "../../hooks/use-project-state.ts";
import { ProjectActionType } from "../../reducers";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import githubLogo from "../../assets/images/logos/github.png";
import npmLogo from "../../assets/images/logos/npm.png";
import classNames from "classnames";

interface Props {
    project: ProjectDocument;
    onChangeOrder?: (id: string, decrease?: boolean) => void;
    onDeleted?: (id: string) => void;
}

const ProjectCard = ({ project, onChangeOrder, onDeleted }: Props): JSX.Element => {
    const { user } = useAuth();
    const { openDialog, confirmDialog } = useDialog();
    const { getProject, dispatch } = useProjectState();

    const currentProject = getProject(project.id) || project;

    const handleView = (): void => {
        openDialog(ProjectViewDialog, {
            heading: `Project - ${currentProject.name}`,
            full: true,
            width: "90vw",
            data: currentProject,
        });
    };

    const handleEdit = async (): Promise<void> => {
        const dialogRef = openDialog(ProjectDialog, {
            heading: `Project - ${currentProject.name}`,
            full: true,
            width: "90vw",
            data: currentProject,
        });

        const result = await dialogRef.result;
        if (result) {
            dispatch({ type: ProjectActionType.UPDATE_PROJECT, project: result });
        }
    };

    const handleDelete = async (): Promise<void> => {
        const ref = await confirmDialog({
            heading: "Delete Project",
            message: "Are you sure you want to delete this project?",
            cancelText: "Cancel",
            confirmText: "Delete",
            severity: "danger",
        });
        if (ref) {
            onDeleted?.(currentProject.id);
        }
    };

    return (
        <div className="w-1/2 odd:pr-4 even:pl-4 pb-8">
            <div className="p-8 bg-white shadow-lg relative rounded-lg h-full flex flex-col justify-between">
                {user && (
                    <div className="flex gap-2 absolute top-[-10px] right-[-10px]">
                        <Button
                            icon={<FaChevronLeft />}
                            rounded
                            className="w-7 h-7"
                            color="accent-darker"
                            onClick={() => onChangeOrder?.(currentProject.id, true)}
                        ></Button>
                        <Button
                            icon={<FaChevronRight />}
                            rounded
                            className="w-7 h-7"
                            color="accent-darker"
                            onClick={() => onChangeOrder?.(currentProject.id)}
                        ></Button>
                        <Button icon={<FaPen />} rounded className="w-7 h-7" onClick={() => handleEdit()}></Button>
                        <Button
                            icon={<FaTimes />}
                            rounded
                            className="w-7 h-7"
                            color="danger"
                            onClick={handleDelete}
                        ></Button>
                    </div>
                )}
                <div className="flex flex-col gap-3 mb-5">
                    {currentProject.thumbnail?.url ? (
                        <img src={currentProject.thumbnail.url} className="rounded" alt="card-image" />
                    ) : (
                        <ProjectPlaceholder />
                    )}
                </div>
                <div>
                    <div className="text-xl font-bold">{project.name}</div>
                    <p className="mb-3">{project.info}</p>

                    {project.category !== ProjectCategory.NPM && (
                        <div className="flex gap-4 mb-3">
                            {project.frontendGit && (
                                <div className="flex gap-2 items-center mb-3">
                                    <img alt="logo" className="w-[20px]" src={githubLogo} />
                                    <a
                                        className="underline"
                                        href={project.frontendGit}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {project.frontendGit.split("/").pop()}
                                    </a>
                                </div>
                            )}
                            {project.backendGit && (
                                <div className="flex gap-2 items-center mb-3">
                                    <img alt="logo" className="w-[20px]" src={githubLogo} />
                                    <a className="underline" href={project.backendGit} target="_blank" rel="noreferrer">
                                        {project.backendGit.split("/").pop()}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {project.category === ProjectCategory.NPM && (
                        <div className="flex gap-4 mb-3">
                            {project.githubUrl && (
                                <div className="flex gap-2 items-center mb-3">
                                    <img alt="logo" className="w-[20px]" src={githubLogo} />
                                    <a className="underline" href={project.githubUrl} target="_blank" rel="noreferrer">
                                        {project.githubUrl.split("/").pop()}
                                    </a>
                                </div>
                            )}
                            {project.npmUrl && (
                                <div className="flex gap-2 items-center mb-3">
                                    <img alt="logo" className="w-[20px]" src={npmLogo} />
                                    <a className="underline" href={project.githubUrl} target="_blank" rel="noreferrer">
                                        {project.githubUrl.split("/").pop()}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex gap-8">
                        <Button
                            className={classNames({
                                "justify-center": true,
                                "w-1/2": project.npmUrl || project.projectUrl,
                                "w-full": !project.npmUrl && !project.projectUrl,
                            })}
                            onClick={handleView}
                        >
                            View Details
                        </Button>
                        {(project.npmUrl || project.projectUrl) && (
                            <Button
                                type="link"
                                className="w-1/2 justify-center"
                                link={project.category === ProjectCategory.NPM ? project.npmUrl : project.projectUrl}
                            >
                                Open App
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
