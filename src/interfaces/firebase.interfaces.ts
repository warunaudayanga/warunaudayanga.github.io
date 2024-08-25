export interface FirestoreDocument {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface UploadedFile {
    bucket: string;
    fullPath: string;
    url: string;
}
