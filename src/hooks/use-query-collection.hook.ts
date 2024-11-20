import { DocumentData, QueryConstraint } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { queryCollectionItems } from "../utils";
import { firestore } from "../config/firebase.ts";

export const useQueryCollection = <T extends DocumentData>(
    collection: string,
    conditions?: QueryConstraint[],
): { items: T[]; setItems: Dispatch<SetStateAction<T[]>>; loading: boolean; error: string } => {
    const [items, setItems] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        queryCollectionItems<T>(firestore, collection, conditions)
            .then(snapshot => {
                const fetchedItems: T[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(fetchedItems);
            })
            .catch((err: Error) => {
                setError(err.message || "An error occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [collection]);

    return { items, setItems, loading, error };
};
