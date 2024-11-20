import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.ts";
import { handleError } from "../utils";
import { UploadedFile } from "../interfaces";

interface FirebaseUploadHook {
    uploadFile: (file: File, path: string, name?: string) => Promise<UploadedFile>;
    deleteFile: (path: string) => Promise<void>;
}

const useFirebaseUpload = (): FirebaseUploadHook => {
    const uploadFile = async (file: File, path: string, name?: string): Promise<UploadedFile> => {
        const defaultName = new Date().getTime().toString();
        try {
            const storageRef = ref(storage, `${path}/${name || defaultName}`);

            const result = await uploadBytes(storageRef, file);

            const url = await getDownloadURL(result.ref);

            return {
                bucket: result.ref.bucket,
                fullPath: result.ref.fullPath,
                url,
                size: file.size,
                originalName: file.name,
            };
        } catch (error) {
            throw handleError(error, "Error uploading file");
        }
    };

    const deleteFile = async (path: string): Promise<void> => {
        try {
            const storageRef = ref(storage, path);

            await deleteObject(storageRef);
        } catch (error) {
            throw handleError(error, "Error deleting file");
        }
    };

    return { uploadFile, deleteFile };
};

export default useFirebaseUpload;
