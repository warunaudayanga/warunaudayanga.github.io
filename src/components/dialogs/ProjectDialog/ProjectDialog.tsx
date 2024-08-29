import { JSX, useRef, useState } from "react";
import { ProjectDocument, ProjectDto, PropsWithCloseAndData } from "../../../interfaces";
import { DialogButtonSection } from "../../layout";
import DialogBodySection from "../../layout/Dialog/DialogBodySection.tsx";
import FormControl from "../../other/FormControl.tsx";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "../../other";
import FileUpload from "../../other/FileUpload.tsx";

const ProjectDialog = ({ close, data }: PropsWithCloseAndData<ProjectDocument, ProjectDto>): JSX.Element => {
    const [isSubmitting, setSubmitting] = useState(false);
    const form = useRef<HTMLFormElement>(null);

    const defaultValues: ProjectDto = {
        name: data?.name || "",
        cover: undefined,
        info: data?.info || "",
        status: data?.status || "draft",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = handleSubmit(async (projectDto: ProjectDto): Promise<void> => {
        try {
            setSubmitting(true);
            await Promise.resolve();
            // toast.success("Logged in successfully");
            close(projectDto as ProjectDocument);
        } catch (error) {
            // toast.success("Logged in successfully");
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <>
            <DialogBodySection full={true}>
                <form ref={form} onSubmit={onSubmit} className="flex flex-col gap-6">
                    <FormControl control={control} name="name" size="small" title="Name" required error={errors.name} />
                    {/* eslint-disable-next-line no-console */}
                    <FileUpload title="Cover" image onFileSelect={files => console.log(files)} required />
                    <FormControl control={control} name="info" size="small" title="Info" required error={errors.name} />
                    <FormControl
                        control={control}
                        type="textarea"
                        size="small"
                        name="description"
                        title="Description"
                        required
                        error={errors.name}
                        fullWidth={true}
                    />
                </form>
            </DialogBodySection>
            <DialogButtonSection>
                <Button disabled={isSubmitting} className="btn-small" color="gray" onClick={() => close()}>
                    Cancel
                </Button>
                <Button disabled={isSubmitting} className="btn-small" onClick={() => form.current?.requestSubmit()}>
                    {isSubmitting ? "Saving..." : "Save"}
                    {isSubmitting && <Spinner />}
                </Button>
            </DialogButtonSection>
        </>
    );
};

export default ProjectDialog;
