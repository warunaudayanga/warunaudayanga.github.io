// noinspection JSUnusedGlobalSymbols

import { getDocs, query } from "firebase/firestore";
import { createCollectionRef } from "./createCollectionRef";
import { Collection, firestore } from "../../config/firebase.ts";
import { Config, ConfigDocument } from "../../interfaces/config.interface.ts";

export const getConfigItems = async (): Promise<Config> => {
    try {
        const collectionRef = createCollectionRef<ConfigDocument>(firestore, Collection.CONFIGURATION);

        const q = query(collectionRef);

        const snapshot = await getDocs(q);

        return snapshot.docs.reduce<Config>((acc, doc) => {
            const data = doc.data();
            return { ...acc, [data.key]: data.value };
        }, {});
    } catch (error) {
        throw new Error(`Error adding document: ${error}`);
    }
};
