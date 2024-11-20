/* eslint-disable @typescript-eslint/no-explicit-any */
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

    const { control, handleSubmit } = useForm({ defaultValues });

    const onSubmit = handleSubmit(async (loginDto: LoginDto): Promise<void> => {
        try {
            setSubmitting(true);
            await login(loginDto.email, loginDto.password);
            toast.success("Logged in successfully");
            close();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
            toast.error((error as any).message || "Error logging in");
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <DialogBodySection>
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-3 p-3">
                <FormControl control={control} name="email" title="E-mail" required fullWidth />
                <FormControl control={control} type="password" name="password" title="Password" required fullWidth />
                <div className="flex justify-center gap-3 pt-4">
                    <Button type="button" disabled={isSubmitting} color="gray" onClick={() => close()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                        {isSubmitting && <Spinner className="ml-2 border-white" />}
                    </Button>
                </div>
            </form>
        </DialogBodySection>
    );
};

export default LoginDialog;
