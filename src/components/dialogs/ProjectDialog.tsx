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
import {
    FaCloud,
    FaCode,
    FaCog,
    FaDatabase,
    FaFileAlt,
    FaGithub,
    FaImage,
    FaInfoCircle,
    FaNpm,
    FaToggleOn,
    FaUser,
} from "react-icons/fa";

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
                <div className="max-w-6xl mx-auto">
                    <form ref={form} onSubmit={onSubmit} className="space-y-8">
                        {/* Project Category */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FaCog className="text-blue-600" />
                                Project Category
                            </h3>
                            <FormControl
                                control={control}
                                type="select"
                                options={Object.entries(ProjectCategory).map(([, value]) => ({
                                    label: value === ProjectCategory.NPM ? "NPM" : value,
                                    value,
                                }))}
                                name="category"
                                title="Category"
                                required
                                className="w-full md:w-1/3"
                                onSelected={value => setSelectedCategory(value as ProjectCategory)}
                            />
                        </div>

                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaInfoCircle className="text-blue-600" />
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormControl control={control} name="name" title="Project Name" required />
                                <FormControl control={control} name="codeName" title="Code Name" required />
                                <FormControl control={control} name="projectType" title="Project Type" />
                                <FormControl control={control} name="company" title="Company" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="md:col-span-2">
                                    <FormControl control={control} name="client" title="Client" />
                                </div>
                                <FormControl control={control} name="clientType" title="Client Type" />
                            </div>
                        </div>

                        {/* Role & Position */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaUser className="text-green-600" />
                                Role & Position
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormControl control={control} name="position" title="Position" />
                                <FormControl control={control} name="role" title="Role" />
                            </div>
                        </div>

                        {/* Media & Assets */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaImage className="text-purple-600" />
                                Media & Assets
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FileUpload
                                    control={control}
                                    name="cover"
                                    title="Cover Image"
                                    image
                                    fullPreview
                                    onFileSelect={handleFileSelect("cover")}
                                />
                                <FileUpload
                                    control={control}
                                    name="thumbnail"
                                    title="Thumbnail"
                                    image
                                    fullPreview
                                    onFileSelect={handleFileSelect("thumbnail")}
                                />
                            </div>
                            {selectedCategory !== ProjectCategory.NPM && (
                                <div className="mt-6">
                                    <FileUpload
                                        control={control}
                                        name="screenshots"
                                        title="Screenshots"
                                        image
                                        onFileSelect={handleFileSelect("screenshots")}
                                        multiple
                                    />
                                </div>
                            )}
                        </div>

                        {/* Project Description */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaFileAlt className="text-indigo-600" />
                                Project Description
                            </h3>
                            <div className="space-y-6">
                                <FormControl
                                    control={control}
                                    type="textarea"
                                    name="info"
                                    title="Brief Info"
                                    required
                                    fullWidth
                                />
                                <FormControl
                                    control={control}
                                    type="textarea"
                                    name="description"
                                    title="Detailed Description"
                                    required
                                    fullWidth
                                />
                                <FormControl control={control} name="remarks" title="Remarks" fullWidth />
                            </div>
                        </div>

                        {/* Core Technologies */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaCode className="text-blue-600" />
                                Core Technologies
                            </h3>
                            <div className="space-y-6">
                                <ToolSelector
                                    control={control}
                                    name="techStack"
                                    title="Tech Stack"
                                    fullWidth
                                    value={values.techStack}
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <ToolSelector
                                        control={control}
                                        name="languages"
                                        title="Programming Languages"
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
                                </div>
                            </div>
                        </div>

                        {/* Infrastructure & Services */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaCloud className="text-green-600" />
                                Infrastructure & Services
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ToolSelector
                                    control={control}
                                    name="deployment"
                                    title="Deployment Platforms"
                                    fullWidth
                                    value={values.deployment}
                                />
                                <ToolSelector
                                    control={control}
                                    name="services"
                                    title="Cloud Services"
                                    fullWidth
                                    value={values.services}
                                />
                            </div>
                        </div>

                        {/* Libraries & Frameworks */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaDatabase className="text-purple-600" />
                                Libraries & Frameworks
                            </h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                        title="Frontend Libraries / Frameworks"
                                        fullWidth
                                        value={values.uiLibs}
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                        title="Other Tools & Libraries"
                                        fullWidth
                                        value={values.otherLibs}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Source Code & Links */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                {selectedCategory === ProjectCategory.NPM ? (
                                    <FaNpm className="text-red-600" />
                                ) : (
                                    <FaGithub className="text-gray-800" />
                                )}
                                {selectedCategory === ProjectCategory.NPM
                                    ? "NPM Package Links"
                                    : "Source Code & Project Links"}
                            </h3>
                            {selectedCategory === ProjectCategory.NPM ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormControl control={control} name="githubName" title="GitHub Repository Name" />
                                    <FormControl control={control} name="githubUrl" title="GitHub Repository URL" />
                                    <FormControl control={control} name="npmName" title="NPM Package Name" />
                                    <FormControl control={control} name="npmUrl" title="NPM Package URL" />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormControl
                                            control={control}
                                            name="frontendGit"
                                            title="Frontend Repository URL"
                                        />
                                        <FormControl
                                            control={control}
                                            name="backendGit"
                                            title="Backend Repository URL"
                                        />
                                    </div>
                                    <FormControl
                                        control={control}
                                        name="projectUrl"
                                        title="Live Project URL"
                                        fullWidth
                                    />
                                </div>
                            )}
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaInfoCircle className="text-orange-600" />
                                Additional Information
                            </h3>
                            <FormControl
                                control={control}
                                type="textarea"
                                name="extra"
                                title="Extra Details"
                                fullWidth
                            />
                        </div>

                        {/* Publication Status */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FaToggleOn className="text-green-600" />
                                Publication Status
                            </h3>
                            <FormControl
                                control={control}
                                type="switch"
                                switchValues={["draft", "published"]}
                                name="status"
                                title="Published"
                            />
                        </div>
                    </form>
                </div>
            </DialogBodySection>
            <DialogButtonSection>
                <div className="flex justify-center gap-4">
                    <Button disabled={isSubmitting} variant="outline" onClick={() => close()} className="min-w-32">
                        Cancel
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        variant="action"
                        color="primary"
                        onClick={handleSave}
                        className="min-w-32"
                    >
                        {isSubmitting ? "Saving..." : "Save Project"}
                        {isSubmitting && <Spinner className="ml-2 border-white" />}
                    </Button>
                </div>
            </DialogButtonSection>
        </>
    );
};

export default ProjectDialog;
