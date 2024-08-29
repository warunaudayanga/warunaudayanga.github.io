// noinspection JSIgnoredPromiseFromCall

import { JSX } from "react";
import { Card } from "primereact/card";
import { useAuth, useDialog } from "../../hooks";
import { ProjectViewDialog } from "../dialogs";
import gamehub from "../../assets/projects/gamehub/gamehub.png";
import { ProjectDocument } from "../../interfaces";
import Button from "./Button.tsx";
import { FaPen } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Id, toast } from "react-toastify";

const ProjectCard = (): JSX.Element => {
    const { user } = useAuth();
    // const { uploadFile } = useFirebaseUpload();
    const { openDialog } = useDialog();

    // const handleUpload = async (e: ChangeEvent): Promise<void> => {
    //     if ((e.target as HTMLInputElement).files?.length) {
    //         const file = await uploadFile((e.target as HTMLInputElement).files![0], "images");
    //
    //         const dto: ProjectDto = {
    //             name: "Game Hub",
    //             description: "React Website for Video Game Information (Ratings, Reviews, etc.).",
    //             cover: file,
    //             thumbnail: file,
    //             info:
    //                 "This project was created as a hobby to practice my React skills. It is a game showcase where " +
    //                 "users can search for games by genre, platform, and rating, and view details including " +
    //                 "screenshots, trailers, and descriptions. It uses the RAWG Video Games Database API to fetch " +
    //                 "game data. (The RAWG Video Games Database API is a REST API that provides access to a large " +
    //                 "collection of video game data for developers and gaming enthusiasts. The data includes game " +
    //                 "titles, ratings, platforms, release dates, and more)",
    //             screenshots: [file],
    //             status: "draft",
    //         };
    //
    //         // const projectRef = await addCollectionItem<ProjectDto>(firestore, Path.PROJECTS, dto);
    //         //
    //         // console.log(projectRef);
    //     }
    // };

    const handleView = (): void => {
        // noinspection JSUnusedLocalSymbols
        // let project: ProjectDocument | null = await getCollectionItem<ProjectDocument>(
        //     firestore,
        //     Path.PROJECTS,
        //     "GzaNDEMxdbECajIZVceJ",
        // );
        // console.log(project);
        const project: ProjectDocument = {
            id: "",
            name: "Game Hub",
            description: "React Website for Video Game Information (Ratings, Reviews, etc.).",
            cover: {
                bucket: "",
                fullPath: "",
                url: gamehub,
            },
            thumbnail: {
                bucket: "",
                fullPath: "",
                url: gamehub,
            },
            info:
                "This project was created as a hobby to practice my React skills. It is a game showcase where " +
                "users can search for games by genre, platform, and rating, and view details including " +
                "screenshots, trailers, and descriptions. It uses the RAWG Video Games Database API to fetch " +
                "game data. (The RAWG Video Games Database API is a REST API that provides access to a large " +
                "collection of video game data for developers and gaming enthusiasts. The data includes game " +
                "titles, ratings, platforms, release dates, and more)",
            languages: [{ name: "Angular", icon: "Angular" }],
            databases: [{ name: "Angular", icon: "Angular" }],
            deployment: [{ name: "Angular", icon: "Angular" }],
            services: [{ name: "Angular", icon: "Angular" }],
            coreLibs: [{ name: "Angular", icon: "Angular" }],
            uiLibs: [{ name: "Angular", icon: "Angular" }],
            stateManageLibs: [{ name: "Angular", icon: "Angular" }],
            backendLibs: [{ name: "Angular", icon: "Angular" }],
            databaseLibs: [{ name: "Angular", icon: "Angular" }],
            otherLibs: [{ name: "Angular", icon: "Angular" }],
            screenshots: [
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
                {
                    bucket: "",
                    fullPath: "",
                    url: gamehub,
                },
            ],
            extra: "",
            status: "draft",
            createdAt: "",
            updatedAt: "",
        };

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (project) {
            openDialog(ProjectViewDialog, {
                heading: `Project - ${project.name}`,
                full: true,
                width: "90vw",
                data: project,
            });
        }
    };

    const notify = (): Id => toast.success("Wow so easy!");

    return (
        <div className="w-1/2 odd:pr-4 even:pl-4 pb-8">
            <Card
                pt={{ content: { className: "p-0" }, body: { className: "p-8" } }}
                className="bg-white shadow-lg relative"
            >
                {/* <input type="file" onChange={handleUpload} />*/}
                {user && (
                    <div className="flex gap-2 absolute top-[-10px] right-[-10px]">
                        <Button icon={<FaPen />} rounded className="w-7 h-7"></Button>
                        <Button icon={<FaTimes />} rounded className="w-7 h-7" color="danger"></Button>
                    </div>
                )}
                <div className="flex flex-col gap-3 mb-5">
                    <img src={gamehub} className="rounded" alt="card-image" />
                </div>
                <div className="text-xl font-bold">Game Hub</div>
                <p className="mb-3">Lorem ipsum dolor sit amet</p>
                <div className="flex gap-8">
                    <Button className="flex-grow justify-center" onClick={handleView}>
                        View
                    </Button>
                    <Button className="flex-grow justify-center" onClick={notify}>
                        Open
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProjectCard;
