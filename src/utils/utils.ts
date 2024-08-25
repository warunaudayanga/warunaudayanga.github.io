/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

export const handleError = (err: any, defaultMessage?: string): any => {
    // eslint-disable-next-line no-console
    console.log(err);
    // eslint-disable-next-line no-console
    if (defaultMessage) console.log(defaultMessage);
    return err;
};
