/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
