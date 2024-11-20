import { FirestoreDocument, UploadedFile } from "./firebase.interfaces.ts";
import { stackIcon } from "../data/stack-icons.ts";
import { ProjectCategory } from "../enums/project-category.enum.ts";

export interface Tool {
    name: string;
    icon?: keyof typeof stackIcon;
}

export type ProjectStatus = "draft" | "published";

export interface ProjectDto {
    name: string;
    // cover?: UploadedFile;
    // thumbnail?: UploadedFile;
    cover: File | UploadedFile | null;
    thumbnail: File | UploadedFile | null;
    category: ProjectCategory;
    order: number;
    info: string;
    description: string | null;
    languages: (keyof typeof stackIcon)[] | null;
    databases: (keyof typeof stackIcon)[] | null;
    deployment: (keyof typeof stackIcon)[] | null;
    services: (keyof typeof stackIcon)[] | null;
    coreLibs: (keyof typeof stackIcon)[] | null;
    uiLibs: (keyof typeof stackIcon)[] | null;
    stateManageLibs: (keyof typeof stackIcon)[] | null;
    backendLibs: (keyof typeof stackIcon)[] | null;
    databaseLibs: (keyof typeof stackIcon)[] | null;
    otherLibs: (keyof typeof stackIcon)[] | null;
    extra: string | null;
    screenshots: (File | UploadedFile)[] | null;
    status: ProjectStatus;
}

export interface ProjectDocument extends Omit<ProjectDto, "cover" | "thumbnail" | "screenshots">, FirestoreDocument {
    cover?: UploadedFile;
    thumbnail?: UploadedFile;
    screenshots?: UploadedFile[];
}
