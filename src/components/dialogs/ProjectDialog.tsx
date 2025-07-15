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
import { Collection, firestore } from "../../config/firebase.ts";
import { useFirebaseUpload } from "../../hooks";
import { toast } from "react-toastify";
import { ProjectCategory } from "../../enums/project-category.enum.ts";
import { countCollectionItems } from "../../utils/firestore/countCollectionItems.ts";
import { where } from "firebase/firestore";

const ProjectDialog = ({ close, data }: PropsWithCloseAndData<ProjectDocument, ProjectDocument>): JSX.Element => {
    const form = useRef<HTMLFormElement>(null);
    const { uploadFile, deleteFile } = useFirebaseUpload();

    const [isSubmitting, setSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(data?.category || ProjectCategory.WORK);

    const values: ProjectDto = {
        name: data?.name || "",
        codeName: data?.codeName || "",
        projectType: data?.projectType || "",
        company: data?.company || "",
        client: data?.client || "",
        clientType: data?.clientType || "",
        position: data?.position || "",
        role: data?.role || "",
        order: data?.order || 0,
        category: data?.category || ProjectCategory.WORK,
        cover: data?.cover || null,
        thumbnail: data?.thumbnail || null,
        info: data?.info || "",
        description: data?.description || "",
        techStack: data?.techStack || [],
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
        extra: data?.extra || "",
        remarks: data?.remarks || "",
        screenshots: data?.screenshots || null,
        projectName: data?.projectName || "",
        projectUrl: data?.projectUrl || "",
        githubName: data?.githubName || "",
        githubUrl: data?.githubUrl || "",
        frontendGit: data?.frontendGit || "",
        backendGit: data?.backendGit || "",
        npmName: data?.npmName || "",
        npmUrl: data?.npmUrl || "",
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

            if (!data?.id) {
                projectDto.order = await countCollectionItems(firestore, Collection.PROJECTS, [
                    where("category", "==", projectDto.category),
                ]);
            }

            const projectRef = await addCollectionItem<ProjectDto>(
                firestore,
                Collection.PROJECTS,
                projectDto,
                data?.id,
            );

            const doc = await getCollectionItem<ProjectDocument>(firestore, Collection.PROJECTS, projectRef.id);

            toast.success("Project saved successfully");
            close(doc ?? undefined);
        } catch (err) {
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
                        options={Object.entries(ProjectCategory).map(([, value]) => ({
                            label: value === ProjectCategory.NPM ? "NPM" : "",
                            value,
                        }))}
                        name="category"
                        title="Category"
                        required
                        className="w-3/12"
                        onSelected={value => setSelectedCategory(value as ProjectCategory)}
                    />
                    <FormControl control={control} name="name" title="Name" required className="w-1/2" />
                    <FormControl control={control} name="codeName" title="Code Name" required className="w-1/2" />
                    <FormControl control={control} name="projectType" title="Project Type" className="w-1/2" />
                    <FormControl control={control} name="company" title="Company" className="w-1/2" />
                    <div className="w-1/2">
                        <FormControl control={control} name="client" title="Client" className="w-8/12" />
                        <FormControl control={control} name="clientType" title="Client Type" className="w-4/12" />
                    </div>
                    <FormControl control={control} name="position" title="Position" className="w-1/2" />
                    <FormControl control={control} name="role" title="Role" className="w-1/2" />
                    <FileUpload
                        control={control}
                        name="cover"
                        title="Cover"
                        image
                        onFileSelect={handleFileSelect("cover")}
                    />
                    <FileUpload
                        control={control}
                        name="thumbnail"
                        title="Thumbnail"
                        image
                        onFileSelect={handleFileSelect("thumbnail")}
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
                        name="techStack"
                        title="Tech Stack"
                        fullWidth
                        value={values.techStack}
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
                    <FormControl control={control} name="remarks" title="Remarks" className="w-1/2" />
                    {selectedCategory === ProjectCategory.NPM && (
                        <>
                            <FormControl control={control} name="githubName" title="Github Name" className="w-1/2" />
                            <FormControl control={control} name="githubUrl" title="Github URL" className="w-1/2" />
                            <FormControl control={control} name="npmName" title="NPM Name" className="w-1/2" />
                            <FormControl control={control} name="npmUrl" title="NPM URL" className="w-1/2" />
                        </>
                    )}
                    {selectedCategory !== ProjectCategory.NPM && (
                        <>
                            <FormControl
                                control={control}
                                name="frontendGit"
                                title="Frontend Source URL"
                                className="w-1/2"
                            />
                            <FormControl
                                control={control}
                                name="backendGit"
                                title="Backend Source URL"
                                className="w-1/2"
                            />
                            <FormControl control={control} name="projectUrl" title="Project URL" className="w-1/2" />
                        </>
                    )}
                    <FormControl control={control} type="textarea" name="extra" title="Extra" fullWidth />
                    {selectedCategory !== ProjectCategory.NPM && (
                        <FileUpload
                            control={control}
                            name="screenshots"
                            title="Screenshots"
                            image
                            onFileSelect={handleFileSelect("screenshots")}
                            multiple
                        />
                    )}
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
