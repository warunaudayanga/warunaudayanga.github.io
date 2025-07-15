// noinspection JSIgnoredPromiseFromCall

import { JSX } from "react";
import { useAuth, useDialog } from "../../hooks";
import { ProjectDialog, ProjectViewDialog } from "../dialogs";
import { ProjectDocument } from "../../interfaces";
import Button from "./Button.tsx";
import { FaChevronLeft, FaChevronRight, FaPen } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useProjectState } from "../../hooks/use-project-state.ts";
import { ProjectActionType } from "../../reducers";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import githubLogo from "../../assets/images/logos/github.png";
import npmLogo from "../../assets/images/logos/npm.png";
import classNames from "classnames";
import StackIcon from "./StackIcon.tsx";
import { stackIcon } from "../../data/stack-icons.ts";
import npmCover from "../../assets/svg/npm.svg";
import { clsx } from "clsx";

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
        <div className="w-1/2 odd:pr-6 even:pl-6 pb-12">
            <div
                className={clsx({
                    "p-8 shadow-xl relative rounded-lg h-full flex flex-col": true,
                    "bg-white": !user,
                    "bg-amber-100": user && project.status === "draft",
                })}
            >
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
                <div
                    className="flex flex-col gap-3 mb-5"
                    style={{ backgroundColor: currentProject.category === ProjectCategory.NPM ? "#c73636" : "" }}
                >
                    {currentProject.thumbnail?.url ? (
                        <img src={currentProject.thumbnail.url} className="rounded" alt="card-image" />
                    ) : project.category === ProjectCategory.NPM ? (
                        <img src={npmCover} className="w-1/2 m-auto" alt="card-image" />
                    ) : (
                        <div
                            className="bg-primary-darker w-full flex items-center justify-center relative"
                            style={{ aspectRatio: "16/9" }}
                        >
                            <h2 className="text-5xl text-white text-center font-bold relative z-10">
                                {currentProject.name}
                            </h2>
                            <div
                                className="h-full w-full absolute overflow-hidden z-0"
                                style={{
                                    background:
                                        "transparent linear-gradient(225deg, var(--primary) 0,var(--primary-darker) 100%) 0 0 no-repeat padding-box",
                                }}
                            >
                                <svg
                                    className="absolute bottom-[-40px] right-[-50px] opacity-70 fill-primary-darker"
                                    height="200"
                                    width="200"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle r="100" cx="100" cy="100" />
                                </svg>
                                <svg
                                    className="absolute top-[-50px] left-[50%] opacity-70 fill-primary-dark"
                                    height="80"
                                    width="80"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle r="40" cx="40" cy="40" />
                                </svg>
                                <svg
                                    className="absolute top-[-80px] left-[-30px] opacity-70 fill-primary"
                                    height="150"
                                    width="150"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle r="75" cx="75" cy="75" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-grow flex flex-col">
                    <div className="text-xl font-bold flex justify-between">
                        <div>{project.name}</div>
                        {project.techStack && (
                            <div className="flex gap-1 ms-3">
                                {project.techStack.map(icon => (
                                    <StackIcon key={icon} icon={stackIcon[icon].icon} size="20px" />
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="mb-3 flex-grow text-gray-600">{project.info}</p>

                    {project.projectType && <p className="mb-3 text-gray-600 font-bold">{project.projectType}</p>}

                    {project.company && <p className="mb-3 text-gray-600 font-bold">Company — {project.company}</p>}

                    {!project.company && project.client && (
                        <p className="mb-3 text-gray-600 font-bold">
                            {project.clientType || "Client"} — {project.client}
                        </p>
                    )}

                    {project.remarks && <p className="mb-3 text-gray-600 font-bold">{project.remarks}</p>}

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
                                    <a className="underline" href={project.npmUrl} target="_blank" rel="noreferrer">
                                        {project.npmUrl.split("/").pop()}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex gap-8">
                        <Button
                            color="primary-dark"
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
                                color="primary-dark"
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
