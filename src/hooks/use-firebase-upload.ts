import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.ts";
import { handleError } from "../utils";
import { UploadedFile } from "../interfaces";

interface FirebaseUploadHook {
    uploadFile: (file: File, path: string, name?: string) => Promise<UploadedFile>;
}

const useFirebaseUpload = (): FirebaseUploadHook => {
    const uploadFile = async (file: File, path: string, name?: string): Promise<UploadedFile> => {
        try {
            const storageRef = ref(storage, `${path}/${name || file.name}`);

            const result = await uploadBytes(storageRef, file);

            const url = await getDownloadURL(result.ref);

            return {
                bucket: result.ref.bucket,
                fullPath: result.ref.fullPath,
                url,
            };
        } catch (error) {
            throw handleError(error, "Error uploading file");
        }
    };

    return { uploadFile };
};

export default useFirebaseUpload;
