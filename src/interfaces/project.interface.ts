import { FirestoreDocument, UploadedFile } from "./firebase.interfaces.ts";
import { stackIcon } from "../data/stack-icons.ts";

export interface UsedTools {
    category: string;
    items: string[] | UsedTools[];
}

export interface Tool {
    name: string;
    icon?: keyof typeof stackIcon;
}

export type ProjectStatus = "draft" | "published" | "deleted";

export interface ProjectDto {
    name: string;
    info?: string;
    description?: string;
    cover?: UploadedFile;
    thumbnail?: UploadedFile;
    tools?: UsedTools[];
    languages?: Tool[];
    databases?: Tool[];
    deployment?: Tool[];
    services?: Tool[];
    coreLibs?: Tool[];
    uiLibs?: Tool[];
    stateManageLibs?: Tool[];
    backendLibs?: Tool[];
    databaseLibs?: Tool[];
    otherLibs?: Tool[];
    extra?: string;
    screenshots?: UploadedFile[];
    status: ProjectStatus;
}

export type ProjectDocument = ProjectDto & FirestoreDocument;
