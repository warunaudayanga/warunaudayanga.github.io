import { ReactNode } from "react";

export interface MenuItem {
    label: string;
    icon?: ReactNode;
    url?: string;
    elementId?: string;
    action?: () => void;
}
