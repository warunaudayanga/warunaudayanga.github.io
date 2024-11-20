import { JSX, useEffect, useRef, useState } from "react";
import { ProjectDocument, ProjectDto, PropsWithCloseAndData, UploadedFile } from "../../interfaces";
import { DialogButtonSection } from "../layout";
import DialogBodySection from "../layout/Dialog/DialogBodySection.tsx";
import FormControl from "../other/FormControl.tsx";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "../other";
import FileUpload from "../other/FileUpload.tsx";
import ToolSelector from "../other/ToolSelector.tsx";
import { addCollectionItem, getCollectionItem, scrollIntoElement } from "../../utils";
import { firestore, Collection } from "../../config/firebase.ts";
import { useFirebaseUpload } from "../../hooks";
import { toast } from "react-toastify";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import { countCollectionItems } from "../../utils/firestore/countCollectionItems.ts";

const ProjectDialog = ({ close, data }: PropsWithCloseAndData<ProjectDocument, ProjectDocument>): JSX.Element => {
    const [isSubmitting, setSubmitting] = useState(false);
    const form = useRef<HTMLFormElement>(null);
    const { uploadFile, deleteFile } = useFirebaseUpload();

    const values: ProjectDto = {
        name: data?.name || "",
        order: data?.order || 0,
        category: data?.category || ProjectCategory.PERSONAL,
        cover: data?.cover || null,
        thumbnail: data?.thumbnail || null,
        info: data?.info || "",
        description: data?.description || "",
        languages: data?.languages || [],
        databases: data?.databases || [],
        deployment: data?.deployment || [],
        services: data?.services || [],
        coreLibs: data?.coreLibs || [],
        uiLibs: data?.uiLibs || [],
        stateManageLibs: data?.stateManageLibs || [],
        backendLibs: data?.backendLibs || [],
        databaseLibs: data?.databaseLibs || [],
        otherLibs: data?.otherLibs || [],
        extra: data?.extra || null,
        screenshots: data?.screenshots || null,
        status: data?.status || "draft",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        setFocus,
        clearErrors,
    } = useForm({ values, mode: "all" });

    const scrollToError = (): void => {
        const errorObj = Object.entries(errors);
        if (errorObj.length) {
            scrollIntoElement(errorObj[0][0]);
        }
    };

    useEffect(() => {
        setFocus("name");
    }, []);

    const handleSave = (): void => {
        form.current?.requestSubmit();
        scrollToError();
    };

    const onSubmit = handleSubmit(async (projectDto: ProjectDto): Promise<void> => {
        try {
            setSubmitting(true);

            if (projectDto.cover instanceof File) {
                try {
                    if (data?.cover?.fullPath) {
                        await deleteFile(data.cover.fullPath);
                    }
                } catch {
                    /* empty */
                }

                projectDto.cover = await uploadFile(projectDto.cover, "images");
            }

            if (projectDto.thumbnail instanceof File) {
                try {
                    if (data?.thumbnail?.fullPath) {
                        await deleteFile(data.thumbnail.fullPath);
                    }
                } catch {
                    /* empty */
                }

                projectDto.thumbnail = await uploadFile(projectDto.thumbnail, "images");
            }

            if (Array.isArray(projectDto.screenshots) && projectDto.screenshots.some(s => s instanceof File)) {
                for await (const screenshot of data?.screenshots || []) {
                    try {
                        if (
                            !projectDto.screenshots.find(s => (s as UploadedFile).fullPath === screenshot.fullPath) &&
                            screenshot.fullPath
                        ) {
                            await deleteFile(screenshot.fullPath);
                        }
                    } catch {
                        /* empty */
                    }
                }

                const screenshots: UploadedFile[] = [];
                for await (const screenshot of projectDto.screenshots) {
                    if (screenshot instanceof File) {
                        screenshots.push(await uploadFile(screenshot, "images"));
                    } else {
                        screenshots.push(screenshot);
                    }
                }
                projectDto.screenshots = screenshots;
            }

            projectDto.order = await countCollectionItems(firestore, Collection.PROJECTS);

            const projectRef = await addCollectionItem<ProjectDto>(
                firestore,
                Collection.PROJECTS,
                projectDto,
                data?.id,
            );

            const doc = await getCollectionItem<ProjectDocument>(firestore, Collection.PROJECTS, projectRef.id);

            toast.success("Project saved successfully");
            close(doc ?? undefined);
        } catch {
            toast.error("Error saving project");
        } finally {
            setSubmitting(false);
        }
    });

    const handleFileSelect = (name: keyof ProjectDto) => {
        return (files?: File | UploadedFile | (File | UploadedFile)[]): void => {
            if (files) {
                setValue(name, files);
                clearErrors(name);
            }
        };
    };

    return (
        <>
            <DialogBodySection full={true}>
                <form ref={form} onSubmit={onSubmit} className="flex flex-col items-start gap-6 pr-1">
                    <FormControl
                        control={control}
                        type="select"
                        options={Object.entries(ProjectCategory).map(([, value]) => ({ value }))}
                        name="category"
                        title="Category"
                        required
                        className="w-1/2"
                    />
                    <FormControl control={control} name="name" title="Name" required className="w-1/2" />
                    <FileUpload
                        control={control}
                        name="cover"
                        title="Cover"
                        image
                        onFileSelect={handleFileSelect("cover")}
                        // required
                    />
                    <FileUpload
                        control={control}
                        name="thumbnail"
                        title="Thumbnail"
                        image
                        onFileSelect={handleFileSelect("thumbnail")}
                        // required
                    />
                    <FormControl control={control} type="textarea" name="info" title="Info" required fullWidth />
                    <FormControl
                        control={control}
                        type="textarea"
                        name="description"
                        title="Description"
                        required
                        fullWidth
                    />
                    <ToolSelector
                        control={control}
                        name="languages"
                        title="Languages"
                        fullWidth
                        value={values.languages}
                    />
                    <ToolSelector
                        control={control}
                        name="databases"
                        title="Databases"
                        fullWidth
                        value={values.databases}
                    />
                    <ToolSelector
                        control={control}
                        name="deployment"
                        title="Deployment"
                        fullWidth
                        value={values.deployment}
                    />
                    <ToolSelector
                        control={control}
                        name="services"
                        title="Services"
                        fullWidth
                        value={values.services}
                    />
                    <ToolSelector
                        control={control}
                        name="coreLibs"
                        title="Core Libraries / Frameworks"
                        fullWidth
                        value={values.coreLibs}
                    />
                    <ToolSelector
                        control={control}
                        name="uiLibs"
                        title="UI Libraries / Frameworks"
                        fullWidth
                        value={values.uiLibs}
                    />
                    <ToolSelector
                        control={control}
                        name="stateManageLibs"
                        title="State Management Libraries"
                        fullWidth
                        value={values.stateManageLibs}
                    />
                    <ToolSelector
                        control={control}
                        name="backendLibs"
                        title="Backend Libraries / Frameworks"
                        fullWidth
                        value={values.backendLibs}
                    />
                    <ToolSelector
                        control={control}
                        name="databaseLibs"
                        title="Database Libraries"
                        fullWidth
                        value={values.databaseLibs}
                    />
                    <ToolSelector
                        control={control}
                        name="otherLibs"
                        title="Other Tools"
                        fullWidth
                        value={values.otherLibs}
                    />
                    <FileUpload
                        control={control}
                        name="screenshots"
                        title="Screenshots"
                        image
                        onFileSelect={handleFileSelect("screenshots")}
                        multiple
                    />
                    <FormControl
                        control={control}
                        type="switch"
                        switchValues={["draft", "published"]}
                        name="status"
                        title="Published"
                    />
                </form>
            </DialogBodySection>
            <DialogButtonSection>
                <Button disabled={isSubmitting} className="btn-small" color="gray" onClick={() => close()}>
                    Cancel
                </Button>
                <Button disabled={isSubmitting} className="btn-small" onClick={handleSave}>
                    {isSubmitting ? "Saving... " : "Save"}
                    {isSubmitting && <Spinner className="ml-2 border-white" />}
                </Button>
            </DialogButtonSection>
        </>
    );
};

export default ProjectDialog;
