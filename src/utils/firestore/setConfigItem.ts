// noinspection JSUnusedGlobalSymbols

import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { createCollectionRef } from "./createCollectionRef";
import { Collection, firestore } from "../../config/firebase.ts";
import { Config, ConfigDto } from "../../interfaces/config.interface.ts";

export const setConfigItem = async (key: keyof Config, value: Config[keyof Config]): Promise<boolean> => {
    try {
        const collectionRef = createCollectionRef<ConfigDto>(firestore, Collection.CONFIGURATION);

        const q = query(collectionRef, where("key", "==", key));

        const snapshot = await getDocs(q);

        if (snapshot.docs.length) {
            const doc = snapshot.docs[0];
            await updateDoc(doc.ref, { value });
            return true;
        }

        const data = await addDoc(collectionRef, {
            key,
            value,
        });

        return Boolean(data);
    } catch (error) {
        throw new Error(`Error adding document: ${error}`);
    }
};
