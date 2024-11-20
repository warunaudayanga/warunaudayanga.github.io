import { JSX } from "react";
import { BackgroundArt } from "../index.ts";
import { useThemeStore } from "../../stores";
import { Route } from "../../enums";
import avatar from "../../assets/images/avatar.jpg";
import { innerHTML, scrollIntoElement } from "../../utils";
import { useAuth, useFirebaseUpload } from "../../hooks";
import { FaCamera, FaPen } from "react-icons/fa6";
import FileUpload from "../other/FileUpload.tsx";
import { useForm } from "react-hook-form";
import { UploadedFile } from "../../interfaces";
import Button from "../other/Button.tsx";
import { setConfigItem } from "../../utils/firestore/setConfigItem.ts";
import { useConfig } from "../../hooks/use-config.hook.ts";
import { Spinner } from "../other";

const Home = (): JSX.Element => {
    const { user } = useAuth();
    let { setColors } = useThemeStore();
    const { config, setConfig, loading } = useConfig();
    const { uploadFile, deleteFile } = useFirebaseUpload();

    const { control, setValue, clearErrors } = useForm<{ profileImage: File | UploadedFile | null }>({
        values: {
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

                await setConfigItem("profileImage", uploadedFile);
                setConfig("profileImage", uploadedFile);
            }
        };
    };

    const handleEditTitle = async (): Promise<void> => {
        await setConfigItem("title", "Hi !, I&apos;m Waruna");
    };

    const handleEditSubTitle = async (): Promise<void> => {
        await setConfigItem("subtitle", "A Senior Software Engineer <br /> specializing in Full Stack Development.");
    };

    return (
        <BackgroundArt changeType="random" onHueChange={handleHueChange}>
            {loading && (
                <div className="h-full flex flex-col items-center justify-center">
                    <Spinner className="h-60 w-60 border-accent-darker" />
                </div>
            )}
            {!loading && (
                <div className="h-full flex flex-col">
                    <div id={Route.HOME} className="h-[450px] flex flex-col items-center justify-center">
                        <div
                            className="bg-no-repeat bg-cover bg-center border-8 rounded-full border-accent"
                            style={{
                                backgroundImage: `url(${config.profileImage?.url || avatar})`,
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
                                        <div className="flex h-full rounded-full hover:bg-black/50">
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
                        <div className="relative">
                            <h2
                                className="text-[60px] fredoka-one text-accent "
                                dangerouslySetInnerHTML={innerHTML(config.title || "Set Your Title")}
                            ></h2>
                            {user && (
                                <Button
                                    icon={<FaPen size={20} />}
                                    rounded
                                    className="absolute top-[-15px] right-[-35px] w-10 h-10"
                                    color="black"
                                    onClick={() => handleEditTitle()}
                                ></Button>
                            )}
                        </div>
                        <div className="relative">
                            <h4
                                className="text-[30px] fredoka-one text-center text-accent-darker"
                                dangerouslySetInnerHTML={innerHTML(config.subtitle || "Set Your Subtitle")}
                            ></h4>
                            {user && (
                                <Button
                                    icon={<FaPen size={20} />}
                                    rounded
                                    className="absolute top-[-15px] right-[-35px] w-10 h-10"
                                    color="black"
                                    onClick={() => handleEditSubTitle()}
                                ></Button>
                            )}
                        </div>
                    </div>
                    <div className="flex-grow flex gap-10 justify-center items-center pb-10 fredoka-one text-[40px]">
                        <a href="/#" onClick={() => scrollIntoElement(Route.ABOUT)}>
                            <div className="glass text-accent-darker fredoka-one p-5 border-8 border-accent rounded-[45px] w-[300px] text-center">
                                About Me
                            </div>
                        </a>
                        <div className="text-accent text-[60px]">|</div>
                        <a href="/#" onClick={() => scrollIntoElement(Route.WORK_PROJECTS)}>
                            <div className="glass text-accent-darker fredoka-one p-5 border-8 border-accent rounded-[45px] w-[300px] text-center">
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
