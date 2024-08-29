import { ChangeEvent, DragEvent, DragEventHandler, JSX, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import classNames from "classnames";
import Button from "./Button.tsx";

interface Props {
    title?: string;
    image?: boolean;
    multiple?: boolean;
    onFileSelect: (files: File | File[] | undefined) => void;
    className?: string;
    required?: boolean;
    error?: FieldError;
}

const FileUpload = ({ title, image, multiple, onFileSelect, className, error }: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleFiles = (fileList: FileList | null): void => {
        const newFiles = Array.from(fileList || []);
        let allFiles: File[] = [];
        if (multiple) {
            allFiles = [...files, ...newFiles];
            setFiles(allFiles);
        } else if (newFiles.length > 0) {
            allFiles = [newFiles[0]];
            setFiles(allFiles);
        }
        onFileSelect(multiple ? allFiles : allFiles[0]);
    };

    const handleChange = (e: ChangeEvent): void => {
        handleFiles((e.target as HTMLInputElement).files);
    };

    const handleDrop: DragEventHandler = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleRemove = (i: number): void => {
        const allFiles = files.filter((_, j) => i !== j);
        setFiles(allFiles);
        onFileSelect(multiple ? allFiles : allFiles[0]);
    };

    return (
        <div className="w-full md:w-2/3 lg:w-1/2">
            {title && <div className="font-bold mb-2">{title}</div>}
            <div className={classNames({ "file-upload": true, "p-invalid": false })}>
                <div
                    className={`bg-gray-300 h-[80px] rounded-lg p-3 cursor-pointer ${className}`}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDropCapture={handleDrop}
                >
                    <div className="w-full h-full border-2 rounded border-dashed border-gray-400 flex justify-center items-center">
                        <div>
                            Drop {multiple ? "" : "a"} {image ? "image" : "file"}
                            {multiple ? "s" : ""} here or browse
                        </div>
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept={image ? "image/png,image/jpeg,image/bmp" : "*/*"}
                        onChange={handleChange}
                    />
                </div>
                {multiple ? (
                    <div>
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center mt-5 relative">
                                <div
                                    className="h-10 w-20 bg-no-repeat bg-contain bg-center rounded-lg"
                                    style={{
                                        backgroundImage: `url(${URL.createObjectURL(file)})`,
                                        width: "5rem",
                                    }}
                                />
                                <div className="mr-3 text-sm text-gray-600" style={{ width: "5rem" }}>
                                    {(file.size / 1024).toFixed(2)} KB
                                </div>
                                <div
                                    className="overflow-hidden overflow-ellipsis"
                                    style={{ width: "calc(100% - 15rem)" }}
                                >
                                    {file.name}
                                    {file.name}
                                    {file.name}
                                </div>
                                <Button
                                    icon="pi pi-times"
                                    color="danger"
                                    className="rounded-full absolute right-0 w-[2rem] h-[2rem]"
                                    onClick={() => handleRemove(i)}
                                ></Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {files.map((file, i) => (
                            <div key={i} className="inline-flex items-center mt-5 relative">
                                <img src={URL.createObjectURL(file)} alt="file" className="h-80 rounded-lg" />
                                <Button
                                    icon="pi pi-times"
                                    color="danger"
                                    className="h-8 w-8 rounded-full absolute top-[-10px] right-[-10px]"
                                    onClick={() => handleRemove(i)}
                                ></Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>{error && <small className="p-error">{error.message}</small>}</div>
        </div>
    );
};

export default FileUpload;
