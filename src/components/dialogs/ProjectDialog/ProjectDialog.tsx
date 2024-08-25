import { JSX, useState } from "react";
import { ProjectDocument, ProjectDto, PropsWithCloseAndData } from "../../../interfaces";
import { DialogButtonSection } from "../../layout";
import { Button } from "primereact/button";
import DialogBodySection from "../../layout/Dialog/DialogBodySection.tsx";
import FormControl from "../../FormControl.tsx";
import { useForm } from "react-hook-form";
import useToast from "../../../hooks/use-toast.ts";
import { Spinner } from "../../other";

const ProjectDialog = ({ close, data }: PropsWithCloseAndData<ProjectDocument, ProjectDto>): JSX.Element => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { successToast, errorToast } = useToast();

    const defaultValues: ProjectDto = { name: data?.name ?? "", status: data?.status ?? "draft" };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = handleSubmit(async (projectDto: ProjectDto): Promise<void> => {
        try {
            setSubmitting(true);
            await Promise.resolve();
            successToast("Logged in successfully");
            close(projectDto as ProjectDocument);
        } catch (error) {
            errorToast((error as Error).message);
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <>
            <DialogBodySection full={true}>
                <form onSubmit={onSubmit} className="flex flex-col items-center gap-3">
                    <FormControl control={control} size="small" name="name" title="Name" required error={errors.name} />
                    <FormControl control={control} size="small" name="info" title="Info" required error={errors.name} />
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
                <Button disabled={isSubmitting} className="btn-small" severity="secondary" onClick={() => close()}>
                    Cancel
                </Button>
                <Button disabled={isSubmitting} className="btn-small" onClick={() => close()}>
                    {isSubmitting ? "Saving..." : "Save"}
                    {isSubmitting && <Spinner />}
                </Button>
            </DialogButtonSection>
        </>
    );
};

export default ProjectDialog;
