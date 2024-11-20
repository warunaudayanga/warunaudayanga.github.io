/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";

export const handleError = (err: any, defaultMessage?: string): any => {
    // eslint-disable-next-line no-console
    console.log(err);
    // eslint-disable-next-line no-console
    if (defaultMessage) console.log(defaultMessage);
    return err;
};

export const cn = (...classes: ClassValue[]): string => {
    return twMerge(clsx(...classes));
};

export const scrollIntoElement = (id?: string): void => {
    if (id) {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
        element?.focus();
    }
};

export const sanitizeHTML = (html?: string): string => {
    if (!html) return "";
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
};

export const innerHTML = (html?: string): { __html: string } => {
    return { __html: sanitizeHTML(html) };
};
