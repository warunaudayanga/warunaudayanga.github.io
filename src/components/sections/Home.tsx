import { JSX, useEffect, useState } from "react";
import { BackgroundArt } from "../index.ts";
import { useThemeStore } from "../../stores";
import { Route } from "../../enums";
import avatar from "../../assets/images/avatar.jpg";
import { innerHTML, scrollIntoElement } from "../../utils";
import { useAuth, useFirebaseUpload } from "../../hooks";
import { FaCamera, FaCheck, FaPen } from "react-icons/fa6";
import FileUpload from "../other/FileUpload.tsx";
import { useForm } from "react-hook-form";
import { Config, ProjectDocument, UploadedFile } from "../../interfaces";
import Button from "../other/Button.tsx";
import { setConfigItem } from "../../utils/firestore/setConfigItem.ts";
import { useConfig } from "../../hooks/use-config.hook.ts";
import { FormControl, Spinner } from "../other";
import { useQueryCollection } from "../../hooks/use-query-collection.hook.ts";
import { Collection } from "../../config/firebase.ts";
import { ProjectActionType } from "../../reducers";
import { useProjectState } from "../../hooks/use-project-state.ts";
import classNames from "classnames";

const Home = (): JSX.Element => {
    const { user } = useAuth();
    let { setColors } = useThemeStore();
    const { config, setConfig, loading: configLoading } = useConfig();
    const { uploadFile, deleteFile } = useFirebaseUpload();
    const { dispatch } = useProjectState();

    const [loading, setLoading] = useState(false);
    const [titleEdit, setTitleEdit] = useState<boolean>(false);
    const [subTitleEdit, setSubTitleEdit] = useState<boolean>(false);

    const { items, loading: projectsLoading } = useQueryCollection<ProjectDocument>(Collection.PROJECTS);

    useEffect(() => {
        dispatch({ type: ProjectActionType.SET_PROJECTS, projects: items });
    }, [items]);

    const { control, setValue, clearErrors, getValues } = useForm<Config>({
        values: {
            title: config.title,
            subtitle: config.subtitle,
            profileImage: config.profileImage || null,
        },
        mode: "all",
    });

    const handleHueChange = (primaryHue: number, accentHue: number): void => {
        setColors(primaryHue, accentHue);
    };

    const handleFileSelect = () => {
        return async (files?: File | UploadedFile | (File | UploadedFile)[]): Promise<void> => {
            if (files) {
                const file = files as File;

                setValue("profileImage", file);
                clearErrors("profileImage");

                try {
                    if ((config.profileImage as UploadedFile | undefined)?.fullPath) {
                        await deleteFile((config.profileImage as UploadedFile).fullPath);
                    }
                } catch {
                    /* empty */
                }

                const uploadedFile = await uploadFile(file, "images");

                setLoading(true);
                await setConfigItem("profileImage", uploadedFile);
                setConfig("profileImage", uploadedFile);
                setLoading(false);
            }
        };
    };

    const handleEditTitle = async (): Promise<void> => {
        setLoading(true);
        await setConfigItem("title", getValues("title"));
        setConfig("title", getValues("title"));
        setLoading(false);
    };

    const handleEditSubTitle = async (): Promise<void> => {
        setLoading(true);
        await setConfigItem("subtitle", getValues("subtitle"));
        setConfig("subtitle", getValues("subtitle"));
        setLoading(false);
    };

    return (
        <BackgroundArt changeType="random" onHueChange={handleHueChange}>
            {(configLoading || projectsLoading || loading) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <Spinner className="h-60 w-60 border-accent-darker" />
                </div>
            )}
            {!configLoading && !projectsLoading && !loading && (
                <div className="h-full flex flex-col">
                    <div id={Route.HOME} className="h-[450px] flex flex-col items-center justify-center">
                        <div
                            className="bg-no-repeat bg-cover bg-center border-8 rounded-full border-accent"
                            style={{
                                backgroundImage: `url(${(config.profileImage as UploadedFile).url || avatar})`,
                                height: "200px",
                                width: "200px",
                            }}
                        >
                            {user && (
                                <FileUpload
                                    // className="hidden"
                                    control={control}
                                    name="profileImage"
                                    image
                                    onFileSelect={handleFileSelect()}
                                    overlay={
                                        <div className="flex justify-center h-full rounded-full hover:bg-black/50">
                                            <FaCamera
                                                style={{ height: "auto", position: "relative" }}
                                                size={35}
                                                className="text-white"
                                            />
                                        </div>
                                    }
                                    // required
                                />
                            )}
                        </div>
                        <div
                            className={classNames({
                                "flex items-center justify-center gap-4 w-10/12 max-w-screen-lg mt-5": true,
                                "ml-10": user,
                            })}
                        >
                            {!titleEdit && (
                                <h2
                                    className="text-[60px] fredoka-one text-accent "
                                    dangerouslySetInnerHTML={innerHTML(config.title || "Set Your Title")}
                                ></h2>
                            )}
                            {titleEdit && (
                                <FormControl
                                    control={control}
                                    name="title"
                                    inputClassName="text-[40px] fredoka-one text-center !h-[80px]"
                                    fullWidth={true}
                                />
                            )}
                            {user && (
                                <Button
                                    icon={titleEdit ? <FaCheck size={20} /> : <FaPen size={20} />}
                                    rounded
                                    className="w-10 h-10"
                                    color="black"
                                    onClick={async () => {
                                        setTitleEdit(!titleEdit);
                                        if (titleEdit) {
                                            await handleEditTitle();
                                        }
                                    }}
                                ></Button>
                            )}
                        </div>
                        <div
                            className={classNames({
                                "flex items-center justify-center gap-4 w-10/12 max-w-screen-lg": true,
                                "ml-10": user,
                            })}
                        >
                            {!subTitleEdit && (
                                <h4
                                    className="text-[30px] fredoka-one text-center text-accent-darker"
                                    dangerouslySetInnerHTML={innerHTML(config.subtitle || "Set Your Subtitle")}
                                ></h4>
                            )}
                            {subTitleEdit && (
                                <FormControl
                                    control={control}
                                    name="subtitle"
                                    type="textarea"
                                    rows={2}
                                    fullWidth={true}
                                    inputClassName="text-[25px] fredoka-one text-center"
                                />
                            )}
                            {user && (
                                <Button
                                    icon={subTitleEdit ? <FaCheck size={20} /> : <FaPen size={20} />}
                                    rounded
                                    className="w-10 h-10"
                                    color="black"
                                    onClick={async () => {
                                        setSubTitleEdit(!subTitleEdit);
                                        if (subTitleEdit) {
                                            await handleEditSubTitle();
                                        }
                                    }}
                                ></Button>
                            )}
                        </div>
                    </div>
                    <div className="flex-grow flex gap-10 justify-center items-center pb-10 fredoka-one text-[40px]">
                        <a href="/#" onClick={() => scrollIntoElement(Route.ABOUT)}>
                            <div className="glass text-accent-dark fredoka-one p-5 border-8 border-accent rounded-[45px] w-[300px] text-center">
                                About Me
                            </div>
                        </a>
                        <div className="text-accent text-[60px]">|</div>
                        <a href="/#" onClick={() => scrollIntoElement(Route.WORK_PROJECTS)}>
                            <div className="glass text-accent-dark fredoka-one p-5 border-8 border-accent rounded-[45px] w-[300px] text-center">
                                My Projects
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </BackgroundArt>
    );
};

export default Home;
