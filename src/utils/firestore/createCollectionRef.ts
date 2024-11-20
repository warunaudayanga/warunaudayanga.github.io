import { createFirestoreDataConverter } from "./createFirestoreDataConverter";
import { DocumentData, collection, Firestore, CollectionReference } from "firebase/firestore";
import configuration from "../../config/configuration.ts";

export const createCollectionRef = <T extends DocumentData>(
    db: Firestore,
    collectionPath: string,
): CollectionReference<T> => {
    return collection(db, `${configuration().firebase.firestorePrefix}${collectionPath}`).withConverter(
        createFirestoreDataConverter<T>(),
    );
};
