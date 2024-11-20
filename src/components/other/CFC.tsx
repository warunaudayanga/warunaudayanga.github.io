// noinspection JSUnusedGlobalSymbols

import { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { Control, Controller, FieldError, RegisterOptions } from "react-hook-form";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    required?: boolean;
    rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    error?: FieldError;
    size?: "small" | "large";
    fullWidth?: boolean;
    className?: string;
    inputClassName?: string;
}

const CFC = ({ control, name, size, error, fullWidth, inputClassName }: Props): JSX.Element => {
    return (
        <div className="inline-block p-3">
            <div className="font-bold mb-2">CFC</div>
            <Controller
                control={control}
                name={name}
                rules={{ required: "This is required." }}
                render={({ field, fieldState }) => (
                    <input
                        id={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        className={twMerge(
                            inputClassName,
                            "w-full border rounded outline-0 px-3 py-1",
                            size === "small" ? "h-[30px]" : size === "large" ? "h-[50px]" : "h-[40px]",
                            fullWidth ? "w-full" : "",
                            fieldState.invalid
                                ? "border-danger focus:shadow-danger focus:border-danger"
                                : "focus:shadow-secondary focus:border-secondary",
                        )}
                    />
                )}
            />
            <div>{error && <small className="text-danger">{error.message}</small>}</div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CFC;
