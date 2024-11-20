import { ChangeEvent, DragEvent, DragEventHandler, JSX, ReactNode, useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";
import Button from "./Button.tsx";
import { FaTimes } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { UploadedFile } from "../../interfaces";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    title?: string;
    image?: boolean;
    multiple?: boolean;
    onFileSelect: (files: File | UploadedFile | (UploadedFile | File)[] | undefined) => void;
    className?: string;
    required?: boolean;
    overlay?: ReactNode;
}

const FileUpload = ({
    control,
    name,
    title,
    image,
    multiple,
    onFileSelect,
    className,
    required,
    overlay,
}: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<(File | UploadedFile)[]>([]);
    const [loadedImages, setLoadedImages] = useState<number[]>([]);

    return (
        <div
            className={classNames({
                "w-full h-full": overlay,
                "w-full md:w-2/3 lg:w-1/2 px-3": !overlay,
            })}
        >
            {title && <div className="font-bold mb-2">{title}</div>}
            <Controller
                control={control}
                name={name}
                rules={{ required: required ? `${title} is required.` : undefined }}
                render={({ field, fieldState }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        const files: (UploadedFile | File)[] = multiple
                            ? field.value || []
                            : [field.value].filter(Boolean);

                        setFiles(files);
                    }, [control]);

                    const handleFiles = (fileList: FileList | null): void => {
                        const newFiles = Array.from(fileList || []);
                        let allFiles: (File | UploadedFile)[] = [];

                        if (multiple) {
                            allFiles = [...files, ...newFiles];
                            setFiles(allFiles);
                        } else if (newFiles.length > 0) {
                            allFiles = [newFiles[0]];
                            setFiles(allFiles);
                        }

                        field.onChange({
                            target: {
                                value: multiple ? allFiles : allFiles[0] || null,
                            },
                        });

                        onFileSelect(multiple ? allFiles : allFiles[0] || null);
                    };

                    const handleChange = (e: ChangeEvent): void => {
                        handleFiles((e.target as HTMLInputElement).files);
                    };

                    const handleDrop: DragEventHandler = (e: DragEvent<HTMLDivElement>): void => {
                        e.preventDefault();
                        handleFiles(e.dataTransfer.files);
                    };

                    const handleImageLoad = (i: number): void => {
                        setLoadedImages([...loadedImages, i]);
                    };

                    const handleRemove = (i: number): void => {
                        const allFiles = files.filter((_, j) => i !== j);
                        setFiles(allFiles);

                        field.onChange({
                            target: {
                                value: multiple ? allFiles : allFiles[0] || null,
                            },
                        });

                        onFileSelect(multiple ? allFiles : allFiles[0] || null);
                    };

                    return (
                        <>
                            <div
                                id={name}
                                className={classNames({ "file-upload": true, "p-invalid": false, "h-full": overlay })}
                            >
                                <input
                                    name={field.name}
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    accept={image ? "image/png,image/jpeg,image/bmp" : "*/*"}
                                    onChange={handleChange}
                                    onBlur={field.onBlur}
                                    multiple={multiple}
                                />
                                {overlay ? (
                                    <div
                                        className="cursor-pointer w-full h-full"
                                        onClick={() => inputRef.current?.click()}
                                    >
                                        {overlay}
                                    </div>
                                ) : (
                                    <div
                                        className={twMerge(
                                            className,
                                            "h-[80px] rounded-lg p-3 cursor-pointer bg-gray-100",
                                            fieldState.invalid
                                                ? "border border-danger focus:shadow-danger focus:border-danger"
                                                : "focus:shadow-secondary focus:border-secondary",
                                            field.disabled ? "opacity-30 pointer-events-none" : "",
                                        )}
                                        onClick={() => inputRef.current?.click()}
                                        onDragOver={e => e.preventDefault()}
                                        onDropCapture={handleDrop}
                                    >
                                        <div className="w-full h-full border-2 rounded border-dashed flex justify-center items-center border-gray-400">
                                            <div
                                                className={classNames({
                                                    "text-gray-200": field.disabled,
                                                    "text-gray-600": !field.disabled,
                                                })}
                                            >
                                                Drop {multiple ? "" : "a"} {image ? "image" : "file"}
                                                {multiple ? "s" : ""} here or browse
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!overlay &&
                                    (multiple ? (
                                        <div>
                                            {files.map((file, i) => (
                                                <div key={i} className="flex items-center mt-5 relative">
                                                    <div
                                                        className="h-10 w-20 bg-no-repeat bg-contain bg-center"
                                                        style={{
                                                            backgroundImage: `url(${file instanceof File ? URL.createObjectURL(file) : file.url})`,
                                                            width: "5rem",
                                                        }}
                                                    />
                                                    <div
                                                        className="ml-3 mr-3 text-sm text-gray-600"
                                                        style={{ width: "5rem" }}
                                                    >
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </div>
                                                    <div
                                                        className="overflow-hidden overflow-ellipsis"
                                                        style={{ width: "calc(100% - 15rem)" }}
                                                    >
                                                        {file instanceof File ? file.name : file.originalName}
                                                    </div>
                                                    <Button
                                                        icon={<FaTimes />}
                                                        color="danger"
                                                        rounded
                                                        className="absolute right-0 w-[2rem] h-[2rem]"
                                                        onClick={() => handleRemove(i)}
                                                    ></Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>
                                            {files.map((file, i) => (
                                                <div key={i} className="inline-flex items-center mt-5 relative">
                                                    <img
                                                        src={
                                                            file instanceof File ? URL.createObjectURL(file) : file.url
                                                        }
                                                        alt="file"
                                                        className="h-80 rounded-lg"
                                                        onLoad={() => handleImageLoad(i)}
                                                    />
                                                    {loadedImages.includes(i) && (
                                                        <Button
                                                            icon={<FaTimes />}
                                                            color="danger"
                                                            rounded
                                                            className="h-8 w-8 absolute top-[-10px] right-[-10px]"
                                                            onClick={() => handleRemove(i)}
                                                        ></Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                            <div>
                                {fieldState.error && <small className="text-danger">{fieldState.error.message}</small>}
                            </div>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default FileUpload;
