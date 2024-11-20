import { ProjectDocument } from "../interfaces";
import { Dispatch, SetStateAction } from "react";
import { deleteCollectionItem, updateCollectionItem } from "./firestore";
import { Collection, firestore } from "../config/firebase.ts";
import { toast } from "react-toastify";

export const handleProjectOrder = async (
    projects: ProjectDocument[],
    setItems: Dispatch<SetStateAction<ProjectDocument[]>>,
    id: string,
    decrease?: boolean,
): Promise<void> => {
    const index = projects.findIndex(p => p.id === id);
    const newIndex = decrease ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= projects.length) return;

    // Save the original state for rollback
    const originalProjects = [...projects];

    // Copy the array for safe modification
    const reorderedProjects = [...projects];

    // Identify swapped items with index and id
    const swappedItems = [
        { id: reorderedProjects[index].id, index: newIndex }, // Moving item
        { id: reorderedProjects[newIndex].id, index }, // Swapped item
    ];

    // Reorder the items
    const [removed] = reorderedProjects.splice(index, 1);
    reorderedProjects.splice(newIndex, 0, removed);

    // Update the state optimistically
    setItems(reorderedProjects);

    try {
        // Update items in the backend
        for await (const swappedItem of swappedItems) {
            await updateCollectionItem(firestore, Collection.PROJECTS, swappedItem.id, {
                order: swappedItem.index,
            });
        }
    } catch (error) {
        // Revert the state on error
        setItems(originalProjects);
    }
};

export const handleProjectDelete = async (
    projects: ProjectDocument[],
    setItems: Dispatch<SetStateAction<ProjectDocument[]>>,
    id: string,
): Promise<void> => {
    // Save the original state for rollback
    const originalProjects = [...projects];

    // Find the index of the item to be deleted
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) return; // Item not found

    // Remove the item from the list
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);

    // Track items whose order needs updating
    const changedItems = updatedProjects.slice(index).map((item, i) => ({
        id: item.id,
        index: index + i, // Update index after the deleted item
    }));

    // Update the state optimistically
    setItems(updatedProjects);

    try {
        // Delete the item from the backend
        await deleteCollectionItem(firestore, Collection.PROJECTS, id);

        toast.success("Project deleted successfully");

        // Update the order of remaining items in the backend
        for await (const changedItem of changedItems) {
            await updateCollectionItem(firestore, Collection.PROJECTS, changedItem.id, {
                order: changedItem.index,
            });
        }
    } catch {
        // Revert the state on error
        setItems(originalProjects);
    }
};
