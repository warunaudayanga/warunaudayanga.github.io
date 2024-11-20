// noinspection JSIgnoredPromiseFromCall

import { JSX, useState } from "react";
import { useAuth, useDialog } from "../../hooks";
import { ProjectDialog, ProjectViewDialog } from "../dialogs";
import { ProjectDocument } from "../../interfaces";
import Button from "./Button.tsx";
import { FaChevronLeft, FaChevronRight, FaPen } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Id, toast } from "react-toastify";
import ProjectPlaceholder from "./ProjectPlaceholder/ProjectPlaceholder.tsx";

interface Props {
    project: ProjectDocument;
    onChangeOrder?: (id: string, decrease?: boolean) => void;
    onDeleted?: (id: string) => void;
}

const ProjectCard = ({ project, onChangeOrder, onDeleted }: Props): JSX.Element => {
    const { user } = useAuth();
    const { openDialog, confirmDialog } = useDialog();
    const [currentProject, setCurrentProject] = useState<ProjectDocument>(project);

    const handleView = (): void => {
        openDialog(ProjectViewDialog, {
            heading: `Project - ${currentProject.name}`,
            full: true,
            width: "90vw",
            data: currentProject,
        });
    };

    const handleEdit = async (): Promise<void> => {
        const ref = openDialog(ProjectDialog, {
            heading: `Project - ${currentProject.name}`,
            full: true,
            width: "90vw",
            data: currentProject,
        });

        const result = await ref.result;
        if (result) {
            // eslint-disable-next-line no-param-reassign
            setCurrentProject(result);
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

    const notify = (): Id => toast.success("Wow so easy!");

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
                    <p className="mb-3">Lorem ipsum dolor sit amet</p>
                    <div className="flex gap-8">
                        <Button className="flex-grow justify-center" onClick={handleView}>
                            View
                        </Button>
                        <Button className="flex-grow justify-center" onClick={notify}>
                            Open
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
