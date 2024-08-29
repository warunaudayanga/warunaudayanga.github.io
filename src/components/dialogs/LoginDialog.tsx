import { JSX, useState } from "react";
import { DialogComponent, LoginDto, PropsWithCloseAndData } from "../../interfaces";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import { Button, FormControl, Spinner } from "../other";
import { DialogBodySection } from "../layout";
import { toast } from "react-toastify";

const LoginDialog: DialogComponent = ({ close }: PropsWithCloseAndData<LoginDto>): JSX.Element => {
    const [isSubmitting, setSubmitting] = useState(false);
    let { login } = useAuth();

    const defaultValues = { email: "", password: "" };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = handleSubmit(async (loginDto: LoginDto): Promise<void> => {
        try {
            setSubmitting(true);
            await login(loginDto.email, loginDto.password);
            toast.success("Logged in successfully");
            close();
        } catch (error) {
            // errorToast((error as Error).message);
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <DialogBodySection>
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-3">
                <FormControl control={control} name="email" title="E-mail" required fullWidth error={errors.email} />
                <FormControl
                    control={control}
                    type="password"
                    name="password"
                    title="Password"
                    required
                    fullWidth
                    error={errors.password}
                />
                <div className="flex justify-center gap-3 pt-4">
                    <Button type="button" disabled={isSubmitting} color="gray" onClick={() => close()}>
                        Cancel
                    </Button>
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? "Logging in" : "Login"}
                        {isSubmitting && <Spinner className="ml-2" />}
                    </Button>
                </div>
            </form>
        </DialogBodySection>
    );
};

export default LoginDialog;
