import { ChangeEvent, HTMLInputTypeAttribute, JSX } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { FormControlSelectOptions } from "../../interfaces";
import { toTitleCase } from "hichchi-utils";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    type?: HTMLInputTypeAttribute | "textarea" | "switch" | "select";
    options?: FormControlSelectOptions[];
    switchValues?: [string, string];
    title?: string;
    required?: boolean;
    rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    size?: "small" | "large";
    fullWidth?: boolean;
    className?: string;
    inputClassName?: string;
}

const FormControl = ({
    control,
    name,
    type,
    switchValues,
    options,
    title,
    required,
    rules,
    size,
    fullWidth,
    className,
    inputClassName,
}: Props): JSX.Element => {
    return (
        <div className={twMerge(className, "form-control inline-block p-3", fullWidth ? "w-full" : "")}>
            {title && <div className="font-bold mb-2">{title}</div>}
            <Controller
                control={control}
                name={name}
                rules={{ required: required ? `${title} is required.` : undefined, ...rules }}
                render={({ field, fieldState }) => {
                    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>): void => {
                        field.onChange({
                            target: {
                                value: switchValues
                                    ? e.target.checked
                                        ? switchValues[1]
                                        : switchValues[0]
                                    : e.target.checked,
                            },
                        });
                    };

                    const { ref, ...rest } = field;

                    const inputRef = (elem: HTMLElement | null): void => {
                        ref({
                            ...elem,
                            focus: () => {
                                const formControl = elem?.closest(".form-control");
                                if (formControl) {
                                    formControl.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                        inline: "start",
                                    });
                                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                    new Promise(resolve => {
                                        const observer = new IntersectionObserver(entries => {
                                            if (entries[0].isIntersecting) {
                                                observer.disconnect();
                                                resolve(true);
                                            }
                                        });
                                        observer.observe(formControl);
                                    }).then();
                                }
                            },
                        });
                    };

                    switch (type) {
                        case "textarea":
                            return (
                                <textarea
                                    id={field.name}
                                    ref={inputRef}
                                    {...rest}
                                    className={twMerge(
                                        inputClassName,
                                        "border rounded outline-0 px-3 py-1 focus:shadow-secondary focus:border-secondary resize-none",
                                        fullWidth ? "w-full" : "fullWidth",
                                        fieldState.invalid
                                            ? "border-danger focus:shadow-danger focus:border-danger"
                                            : "focus:shadow-secondary focus:border-secondary",
                                    )}
                                    rows={7}
                                />
                            );

                        case "select":
                            return (
                                <select
                                    id={field.name}
                                    ref={inputRef}
                                    {...rest}
                                    className={twMerge(
                                        inputClassName,
                                        "w-full border rounded outline-0 px-3 py-1",
                                        size === "small" ? "h-[30px]" : size === "large" ? "h-[50px]" : "h-[40px]",
                                        fullWidth ? "w-full" : "",
                                        fieldState.invalid
                                            ? "border-danger focus:shadow-danger focus:border-danger"
                                            : "focus:shadow-secondary focus:border-secondary",
                                    )}
                                >
                                    {options?.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label || toTitleCase(option.value)}
                                        </option>
                                    )) ?? null}
                                </select>
                            );

                        case "switch":
                            return (
                                <label
                                    className={classNames({
                                        "relative inline-block w-16 h-8": true,
                                        "opacity-30 pointer-events-none": field.disabled,
                                    })}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        name={field.name}
                                        checked={switchValues ? field.value === switchValues[1] : field.value}
                                        onBlur={field.onBlur}
                                        onChange={handleSwitchChange}
                                        disabled={field.disabled}
                                    />
                                    <span className="absolute cursor-pointer inset-0 rounded-full transition-colors duration-300 bg-gray-400 peer-checked:bg-primary"></span>
                                    <span className="absolute cursor-pointer left-1 bottom-1 h-6 w-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-8"></span>
                                </label>
                            );
                        default:
                            return (
                                <>
                                    <input
                                        id={field.name}
                                        type={type}
                                        ref={inputRef}
                                        {...rest}
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
                                    <div>
                                        {fieldState.error && (
                                            <small className="text-danger">{fieldState.error.message}</small>
                                        )}
                                    </div>
                                </>
                            );
                    }
                }}
            />
        </div>
    );
};

export default FormControl;
