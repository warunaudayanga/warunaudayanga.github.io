import { Firestore, doc, DocumentData, DocumentReference } from "firebase/firestore";
import { createFirestoreDataConverter } from "./createFirestoreDataConverter";
import configuration from "../../config/configuration.ts";

export const createDocRef = <T extends DocumentData>(
    db: Firestore,
    collectionPath: string,
    docPath?: string,
): DocumentReference<T> => {
    if (!docPath) {
        return doc(db, `${configuration().firebase.firestorePrefix}${collectionPath}`).withConverter(
            createFirestoreDataConverter<T>(),
        );
    }
    return doc(db, `${configuration().firebase.firestorePrefix}${collectionPath}`, docPath).withConverter(
        createFirestoreDataConverter<T>(),
    );
};
