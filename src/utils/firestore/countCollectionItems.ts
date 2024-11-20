// noinspection JSUnusedGlobalSymbols

import { Firestore, getCountFromServer, query, QueryConstraint } from "firebase/firestore";
import { createCollectionRef } from "./createCollectionRef";

/**
 * Asynchronously queries a Firestore collection based on the provided query constraints and returns the count of the queried documents.
 *
 * @template T - The type that extends `DocumentData` which the queried documents are expected to conform to.
 * @param {Firestore} db - The Firestore database instance.
 * @param {string} collectionPath - The path to the Firestore collection.
 * @param {QueryConstraint[]} conditions - An array of query constraints to apply.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of the queried documents.
 *
 * @throws {Error} Will throw an error if the query could not be executed.
 *
 * @example
 * ```typescript
 * const db: Firestore = getFirestore();
 * const conditions: QueryConstraint[] = [where('age', '>=', 21), orderBy('age')];
 * const count = await countCollectionItems(db, 'users', conditions);
 * ```
 */

export const countCollectionItems = async (
    db: Firestore,
    collectionPath: string,
    conditions?: QueryConstraint[],
): Promise<number> => {
    try {
        const collectionRef = createCollectionRef(db, collectionPath);

        const q = query(collectionRef, ...(conditions || []));
        const snapshot = await getCountFromServer(q);

        return snapshot.data().count;
    } catch (error) {
        throw new Error(`Error counting collection: ${error}`);
    }
};
