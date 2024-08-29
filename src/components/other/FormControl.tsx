import classNames from "classnames";
import { HTMLInputTypeAttribute, JSX } from "react";
import { Control, Controller, FieldError, RegisterOptions } from "react-hook-form";

interface Props {
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
}

const FormControl = ({ control, name, type, title, required, rules, size, error, fullWidth }: Props): JSX.Element => {
    return (
        <div className="w-full">
            {title && <div className="font-bold mb-2">{title}</div>}
            <Controller
                control={control}
                name={name}
                rules={{ required: required ? `${title} is required.` : undefined, ...rules }}
                render={({ field, fieldState }) =>
                    type === "textarea" ? (
                        <textarea
                            id={field.name}
                            {...field}
                            autoFocus
                            className={classNames({
                                "w-full": fullWidth,
                                "form-control-invalid": fieldState.invalid,
                                "resize-none": true,
                            })}
                            rows={7}
                        />
                    ) : (
                        <input
                            id={field.name}
                            type={type}
                            {...field}
                            autoFocus
                            className={classNames({
                                "border rounded outline-0 px-3 py-1": true,
                                "h-[30px]": size === "small",
                                "h-[40px]": !size,
                                "h-[50px]": size === "large",
                                "w-full": fullWidth,
                                "border-danger focus:shadow-danger": fieldState.invalid,
                            })}
                            // pt={{ root: { className: `form-control-${size}` } }}
                        />
                    )
                }
            />
            <div>{error && <small className="text-danger fonb">{error.message}</small>}</div>
        </div>
    );
};

export default FormControl;
