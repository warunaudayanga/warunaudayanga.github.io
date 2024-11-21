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

    const allowedAttributes = [
        // Global Attributes
        "id",
        "class",
        "style",
        "title",
        "lang",
        "dir",
        "tabindex",

        // ARIA Attributes
        "aria-label",
        "aria-hidden",
        "aria-expanded",
        "aria-role",
        "aria-live",
        "aria-disabled",
        "aria-controls",
        "aria-describedby",
        "aria-labelledby",

        // Data Attributes
        "data-*",

        // Link Attributes (for <a>)
        "href",
        "target",
        "rel",

        // Form Attributes (for <input>, <textarea>, <form>)
        "type",
        "name",
        "value",
        "placeholder",
        "required",
        "maxlength",

        // Image Attributes (for <img>)
        "src",
        "alt",
        "width",
        "height",
        "srcset",
        "sizes",

        // Table Attributes (for <table>, <th>, <tr>, <td>)
        "border",
        "cellpadding",
        "cellspacing",
        "colspan",
        "rowspan",

        // Video and Audio Attributes (for <video>, <audio>)
        "src",
        "controls",
        "autoplay",
        "loop",
        "muted",
        "preload",
        "poster",
        "width",
        "height",

        // Other Media and Object Elements
        "type",
        "src",
        "width",
        "height",
        "poster",
        "autoplay",
        "loop",
        "controls",

        // Script and Style Tags (if allowed)
        "src",
        "type",
        "media",
        "rel",
        "integrity",
        "crossorigin",
    ];

    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, ADD_ATTR: allowedAttributes });
};

export const innerHTML = (html?: string): { __html: string } => {
    return { __html: sanitizeHTML(html) };
};
