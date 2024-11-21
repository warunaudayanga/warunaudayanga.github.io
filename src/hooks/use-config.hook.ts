import { useEffect, useState } from "react";
import { Config } from "../interfaces";
import { getConfigItems } from "../utils/firestore/getConfigItems.ts";

export const useConfig = (): {
    config: Config;
    setConfig: (key: keyof Config, value: Config[keyof Config]) => void;
    loading: boolean;
    error: string;
} => {
    const [config, setConfig] = useState<Config>({} as Config);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        getConfigItems()
            .then(config => {
                setConfig(config);
            })
            .catch((err: Error) => {
                setError(err.message || "An error occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const setConfigItem = (key: keyof Config, value: Config[keyof Config]): void => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    return { config, setConfig: setConfigItem, loading, error };
};
