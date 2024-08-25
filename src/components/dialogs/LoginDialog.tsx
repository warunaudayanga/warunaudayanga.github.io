import { JSX, useState } from "react";
import { DialogComponent, LoginDto, PropsWithCloseAndData } from "../../interfaces";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useAuth } from "../../hooks";
import { Spinner } from "../other";
import useToast from "../../hooks/use-toast.ts";
import FormControl from "../FormControl.tsx";

const LoginDialog: DialogComponent = ({ close }: PropsWithCloseAndData<LoginDto>): JSX.Element => {
    const [isSubmitting, setSubmitting] = useState(false);
    let { login } = useAuth();
    const { successToast, errorToast } = useToast();

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
            successToast("Logged in successfully");
            close();
        } catch (error) {
            errorToast((error as Error).message);
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-3 w-80">
            <FormControl control={control} name="email" title="E-mail" required error={errors.email} />
            <FormControl
                control={control}
                type="password"
                name="password"
                title="Password"
                required
                error={errors.password}
            />
            <div className="flex justify-center gap-3">
                <Button
                    type="button"
                    disabled={isSubmitting}
                    className="btn-small flex gap-2"
                    severity="secondary"
                    onClick={() => close()}
                >
                    Cancel
                </Button>
                <Button disabled={isSubmitting} className="btn-small flex gap-2">
                    {isSubmitting ? "Logging in" : "Login"}
                    {isSubmitting && <Spinner />}
                </Button>
            </div>
        </form>
    );
};

export default LoginDialog;
