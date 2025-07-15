import { JSX, useEffect, useState } from "react";
import { BackgroundArt } from "../index.ts";
import { useThemeStore } from "../../stores";
import { Route } from "../../enums";
import avatar from "../../assets/images/avatar.jpg";
import { innerHTML, scrollIntoElement } from "../../utils";
import { useAuth, useFirebaseUpload } from "../../hooks";
import { FaCamera, FaCheck, FaCode, FaPen, FaUser } from "react-icons/fa6";
import FileUpload from "../other/FileUpload.tsx";
import { useForm } from "react-hook-form";
import { Config, ProjectDocument, UploadedFile } from "../../interfaces";
import Button from "../other/Button.tsx";
import { setConfigItem } from "../../utils/firestore/setConfigItem.ts";
import { useConfig } from "../../hooks/use-config.hook.ts";
import { FormControl } from "../other";
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
    const [isVisible, setIsVisible] = useState(false);

    const { items, loading: projectsLoading } = useQueryCollection<ProjectDocument>(Collection.PROJECTS);

    useEffect(() => {
        dispatch({ type: ProjectActionType.SET_PROJECTS, projects: items });
    }, [items]);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return (): void => clearTimeout(timer);
    }, []);

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

    // Loading skeleton component
    const ProfileSkeleton = (): JSX.Element => (
        <div className="animate-pulse">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <div className="h-8 sm:h-12 md:h-14 lg:h-16 bg-gray-300 rounded-lg mb-3 sm:mb-4 w-4/5 sm:w-3/4 mx-auto"></div>
            <div className="h-6 sm:h-7 md:h-8 bg-gray-300 rounded-lg mb-6 sm:mb-8 w-3/5 sm:w-1/2 mx-auto"></div>
        </div>
    );

    const NavigationSkeleton = (): JSX.Element => (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center items-center animate-pulse px-4">
            <div className="h-16 sm:h-18 md:h-20 w-full sm:w-64 md:w-72 lg:w-80 bg-gray-300 rounded-3xl"></div>
            <div className="h-8 sm:h-12 md:h-16 w-1 sm:w-4 bg-gray-300 hidden sm:block"></div>
            <div className="h-16 sm:h-18 md:h-20 w-full sm:w-64 md:w-72 lg:w-80 bg-gray-300 rounded-3xl"></div>
        </div>
    );

    return (
        <BackgroundArt changeType="random" onHueChange={handleHueChange}>
            {(configLoading || projectsLoading || loading) && (
                <div className="h-full flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-4">
                    <ProfileSkeleton />
                    <NavigationSkeleton />
                </div>
            )}
            {!configLoading && !projectsLoading && !loading && (
                <div className="h-full flex flex-col justify-center space-y-6 sm:space-y-8" id={Route.HOME}>
                    <div
                        className={classNames(
                            "min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8",
                            {
                                "opacity-100 translate-y-0": isVisible,
                                "opacity-0 translate-y-8": !isVisible,
                            },
                        )}
                    >
                        {/* Enhanced Profile Section */}
                        <div className="relative group mb-6 sm:mb-8">
                            <div className="bg-gradient-to-r from-accent to-accent-darker p-1 rounded-full shadow-2xl hover:shadow-accent/50 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56">
                                <div
                                    className="bg-no-repeat bg-cover bg-center rounded-full w-full h-full relative overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${(config.profileImage as UploadedFile).url || avatar})`,
                                    }}
                                >
                                    {user && (
                                        <FileUpload
                                            control={control}
                                            name="profileImage"
                                            image
                                            onFileSelect={handleFileSelect()}
                                            overlay={
                                                <div className="flex justify-center items-center h-full rounded-full bg-black/0 hover:bg-black/60 transition-all duration-300 group-hover:backdrop-blur-sm">
                                                    <FaCamera
                                                        size={40}
                                                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                                                    />
                                                </div>
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Title Section */}
                        <div
                            className={classNames({
                                "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-4xl mb-3 sm:mb-4 group":
                                    true,
                                "sm:ml-12": user && !titleEdit,
                            })}
                        >
                            {!titleEdit && (
                                <h1
                                    className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl fredoka-one text-accent text-center leading-tight tracking-wide drop-shadow-lg px-2"
                                    dangerouslySetInnerHTML={innerHTML(config.title || "Set Your Title")}
                                    style={{
                                        textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                                    }}
                                ></h1>
                            )}
                            {titleEdit && (
                                <FormControl
                                    control={control}
                                    name="title"
                                    inputClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl fredoka-one text-center !h-auto py-3 sm:py-4 bg-white/90 backdrop-blur-sm border-2 border-accent focus:border-accent-darker transition-all duration-300"
                                    fullWidth={true}
                                />
                            )}
                            {user && (
                                <Button
                                    icon={titleEdit ? <FaCheck size={16} /> : <FaPen size={16} />}
                                    rounded
                                    className={classNames(
                                        "w-10 h-10 sm:w-12 sm:h-12 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm flex-shrink-0",
                                        {
                                            "group-hover:opacity-100": !titleEdit,
                                            "bg-green-500 hover:bg-green-600": titleEdit,
                                            "bg-accent hover:bg-accent-darker": !titleEdit,
                                        },
                                    )}
                                    color="white"
                                    onClick={async () => {
                                        setTitleEdit(!titleEdit);
                                        if (titleEdit) {
                                            await handleEditTitle();
                                        }
                                    }}
                                    title={titleEdit ? "Save title" : "Edit title"}
                                />
                            )}
                        </div>

                        {/* Enhanced Subtitle Section */}
                        <div
                            className={classNames({
                                "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-3xl mb-0 sm:mb-10 md:mb-12 relative group":
                                    true,
                                "sm:ml-12": user && !subTitleEdit,
                            })}
                        >
                            {!subTitleEdit && (
                                <h2
                                    className="text-lg md:text-xl lg:text-2xl xl:text-3xl fredoka-one text-center text-accent-darker leading-relaxed tracking-wide opacity-90 hover:opacity-100 transition-opacity duration-300 px-2"
                                    dangerouslySetInnerHTML={innerHTML(config.subtitle || "Set Your Subtitle")}
                                    style={{
                                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                ></h2>
                            )}
                            {subTitleEdit && (
                                <FormControl
                                    control={control}
                                    name="subtitle"
                                    type="textarea"
                                    rows={3}
                                    fullWidth={true}
                                    inputClassName="text-sm sm:text-base md:text-lg lg:text-xl fredoka-one text-center bg-white/90 backdrop-blur-sm border-2 border-accent focus:border-accent-darker transition-all duration-300"
                                />
                            )}
                            {user && (
                                <Button
                                    icon={subTitleEdit ? <FaCheck size={16} /> : <FaPen size={16} />}
                                    rounded
                                    className={classNames(
                                        "w-10 h-10 sm:w-12 sm:h-12 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm flex-shrink-0",
                                        {
                                            "group-hover:opacity-100": !subTitleEdit,
                                            "bg-green-500 hover:bg-green-600": subTitleEdit,
                                            "bg-accent hover:bg-accent-darker": !subTitleEdit,
                                        },
                                    )}
                                    color="white"
                                    onClick={async () => {
                                        setSubTitleEdit(!subTitleEdit);
                                        if (subTitleEdit) {
                                            await handleEditSubTitle();
                                        }
                                    }}
                                    title={subTitleEdit ? "Save subtitle" : "Edit subtitle"}
                                />
                            )}
                        </div>
                    </div>

                    {/* Enhanced Navigation Section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center items-center pb-8 sm:pb-10 sm:px-6 md:px-8 px-10">
                        <a
                            href="/#"
                            onClick={() => scrollIntoElement(Route.ABOUT)}
                            className="group w-full sm:w-auto"
                            aria-label="Navigate to About Me section"
                        >
                            <div className="glass relative text-accent fredoka-one p-5 border-2 sm:border-3 md:border-4 border-accent-darker rounded-2xl sm:rounded-3xl w-full sm:w-64 md:w-72 lg:w-80 text-center hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 backdrop-blur-md group-hover:border-accent group-focus:border-accent">
                                <div className="flex items-center justify-center">
                                    <FaUser className="me-3 text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold block group-hover:text-accent-darker transition-colors duration-300">
                                        About Me
                                    </span>
                                </div>
                                <div className="hidden md:block absolute bottom-3 left-[50%] translate-x-[-50%] w-0 group-hover:w-[90%] h-0.5 bg-accent-darker mx-auto mt-1 sm:mt-2 transition-all duration-300"></div>
                            </div>
                        </a>

                        <div className="text-accent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl opacity-50 hidden sm:block">
                            |
                        </div>

                        <a
                            href="/#"
                            onClick={() => scrollIntoElement(Route.WORK_PROJECTS)}
                            className="group w-full sm:w-auto"
                            aria-label="Navigate to My Projects section"
                        >
                            <div className="glass relative text-accent fredoka-one p-5 border-2 sm:border-3 md:border-4 border-accent-darker rounded-2xl sm:rounded-3xl w-full sm:w-64 md:w-72 lg:w-80 text-center hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 backdrop-blur-md group-hover:border-accent group-focus:border-accent">
                                <div className="flex items-center justify-center">
                                    <FaCode className="me-3 text-xl sm:text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold block group-hover:text-accent-darker transition-colors duration-300">
                                        My Projects
                                    </span>
                                </div>
                                <div className="hidden md:block absolute bottom-3 left-[50%] translate-x-[-50%] w-0 group-hover:w-[90%] h-0.5 bg-accent-darker mx-auto mt-1 sm:mt-2 transition-all duration-300"></div>
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </BackgroundArt>
    );
};

export default Home;
