// noinspection JSIgnoredPromiseFromCall

import { JSX, useState } from "react";
import { useAuth, useDialog } from "../../hooks";
import { ProjectDialog, ProjectViewDialog } from "../dialogs";
import { ProjectDocument } from "../../interfaces";
import Button from "./Button.tsx";
import { FaChevronLeft, FaChevronRight, FaEye, FaPen } from "react-icons/fa6";
import { FaExternalLinkAlt, FaGithub, FaNpm, FaTimes } from "react-icons/fa";
import { useProjectState } from "../../hooks/use-project-state.ts";
import { ProjectActionType } from "../../reducers";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import StackIcon from "./StackIcon.tsx";
import { stackIcon } from "../../data/stack-icons.ts";
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
    const [isHovered, setIsHovered] = useState(false);

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
        <div className="w-full md:w-1/2 px-3 pb-6">
            <div
                className={clsx({
                    "relative rounded-xl h-full flex flex-col overflow-hidden transition-all group": true,
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    "bg-white shadow-lg hover:shadow-2xl": !user || (user && project.status === "published"),
                    "bg-amber-50 shadow-lg hover:shadow-2xl border-2 border-amber-200":
                        user && project.status === "draft",
                })}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Admin Controls */}
                {user && (
                    <div
                        className={clsx({
                            "absolute top-3 right-3 flex gap-1 z-10 transition-opacity duration-200": true,
                            "opacity-0 group-hover:opacity-100": !isHovered,
                            "opacity-100": isHovered,
                        })}
                    >
                        <Button
                            icon={<FaChevronLeft />}
                            variant="admin"
                            size="icon"
                            rounded
                            onClick={() => onChangeOrder?.(currentProject.id, true)}
                            title="Move Left"
                        />
                        <Button
                            icon={<FaChevronRight />}
                            variant="admin"
                            size="icon"
                            rounded
                            onClick={() => onChangeOrder?.(currentProject.id)}
                            title="Move Right"
                        />
                        <Button
                            icon={<FaPen />}
                            variant="admin"
                            size="icon"
                            rounded
                            onClick={() => handleEdit()}
                            title="Edit Project"
                        />
                        <Button
                            icon={<FaTimes />}
                            variant="admin"
                            size="icon"
                            rounded
                            color="danger"
                            onClick={handleDelete}
                            title="Delete Project"
                        />
                    </div>
                )}
                {/* Project Image/Thumbnail */}
                <div className="relative">
                    {currentProject.thumbnail?.url ? (
                        <div className="flex justify-center">
                            <div className="p-4">
                                <div className="rounded-lg overflow-hidden">
                                    <img
                                        src={currentProject.thumbnail.url}
                                        className="h-80 w-auto object-cover transition-transform rounded-lg"
                                        alt={`${currentProject.name} thumbnail`}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : project.category === ProjectCategory.NPM ? (
                        <div className="p-4">
                            <div className="w-full h-60 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                                <FaNpm size={180} color="white"></FaNpm>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="bg-primary-darker rounded-lg w-full h-80 flex items-center justify-center relative overflow-hidden">
                                <h2 className="text-3xl md:text-4xl text-white text-center font-bold relative z-10 px-4">
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
                        </div>
                    )}
                </div>
                {/* Main Content */}
                <div className="flex-grow flex flex-col p-6">
                    {/* Project Header */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{project.name}</h3>

                        {/* Project Type and Company/Client Info */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.projectType && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                    {project.projectType}
                                </span>
                            )}
                            {project.company && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                    {project.company}
                                </span>
                            )}
                            {!project.company && project.client && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                    {project.clientType || "Client"}: {project.client}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{project.info}</p>

                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <div
                                        key={tech}
                                        className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                                        title={stackIcon[tech].label || tech}
                                    >
                                        <StackIcon icon={stackIcon[tech].icon} size="16px" />
                                        <span className="text-xs text-gray-600">{stackIcon[tech].label || tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Remarks */}
                    {project.remarks && (
                        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                            <p className="text-sm text-yellow-800 font-medium">{project.remarks}</p>
                        </div>
                    )}

                    {/* Project Links */}
                    <div className="mb-6">
                        {project.category !== ProjectCategory.NPM && (
                            <div className="flex flex-wrap gap-3">
                                {project.frontendGit && (
                                    <Button
                                        type="link"
                                        variant="link-button"
                                        color="github"
                                        link={project.frontendGit}
                                        icon={<FaGithub className="w-4 h-4 me-2" />}
                                    >
                                        Frontend
                                    </Button>
                                )}
                                {project.backendGit && (
                                    <Button
                                        type="link"
                                        variant="link-button"
                                        color="github"
                                        link={project.backendGit}
                                        icon={<FaGithub className="w-4 h-4 me-2" />}
                                    >
                                        Backend
                                    </Button>
                                )}
                            </div>
                        )}

                        {project.category === ProjectCategory.NPM && (
                            <div className="flex flex-wrap gap-3">
                                {project.githubUrl && (
                                    <Button
                                        type="link"
                                        variant="link-button"
                                        color="github"
                                        link={project.githubUrl}
                                        icon={<FaGithub className="w-4 h-4 me-2" />}
                                    >
                                        {project.githubName || "Repository"}
                                    </Button>
                                )}
                                {project.npmUrl && (
                                    <Button
                                        type="link"
                                        variant="link-button"
                                        color="npm"
                                        link={project.npmUrl}
                                        icon={<FaNpm className="w-4 h-4 me-2" />}
                                    >
                                        {project.npmName || "Package"}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                        <Button
                            variant="action"
                            color="primary"
                            onClick={handleView}
                            icon={<FaEye className="w-4 h-4" />}
                        >
                            View Details
                        </Button>
                        {project.projectUrl && (
                            <Button
                                type="link"
                                variant="action"
                                color="success"
                                link={project.category === ProjectCategory.NPM ? project.npmUrl : project.projectUrl}
                                icon={<FaExternalLinkAlt className="w-4 h-4" />}
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
