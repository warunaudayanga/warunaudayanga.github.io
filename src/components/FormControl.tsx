import { HTMLInputTypeAttribute, JSX } from "react";
import { Control, Controller, FieldError, RegisterOptions } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

const FormControl = ({
    control,
    name,
    type,
    title,
    required,
    rules,
    size,
    error,
    fullWidth,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    type?: HTMLInputTypeAttribute | "textarea";
    title?: string;
    required?: boolean;
    rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    error?: FieldError;
    size?: "small" | "large";
    fullWidth?: boolean;
}): JSX.Element => {
    return (
        <div className="mb-3 w-full">
            {title && <div className="font-bold mb-2">{title}</div>}
            <Controller
                control={control}
                name={name}
                rules={{ required: required ? `${title} is required.` : undefined, ...rules }}
                render={({ field, fieldState }) =>
                    type === "textarea" ? (
                        <InputTextarea
                            id={field.name}
                            {...field}
                            autoFocus
                            className={classNames({
                                "w-full": fullWidth,
                                "p-invalid": fieldState.invalid,
                                "resize-none": true,
                            })}
                            rows={7}
                        />
                    ) : (
                        <InputText
                            id={field.name}
                            type={type}
                            {...field}
                            autoFocus
                            className={classNames({ "w-full": fullWidth, "p-invalid": fieldState.invalid })}
                            pt={{ root: { className: `form-control-${size}` } }}
                        />
                    )
                }
            />
            {error && <small className="p-error">{error.message}</small>}
        </div>
    );
};

export default FormControl;
