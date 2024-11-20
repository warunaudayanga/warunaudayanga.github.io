import { UploadedFile } from "./firebase.interfaces.ts";

export interface Config {
    title?: string;
    subtitle?: string;
    profileImage?: UploadedFile;
}
export interface ConfigDto {
    key: keyof Config;
    value: Config[keyof Config];
}

export interface ConfigDocument extends ConfigDto {
    id: string;
}
