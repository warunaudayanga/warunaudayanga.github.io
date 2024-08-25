import { create, StoreApi, UseBoundStore } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const DEFAULT_PRIMARY_HUE = 163;
const DEFAULT_ACCENT_HUE = 45;

const PRIMARY_SATURATION = "98.36%";
const PRIMARY_LIGHTNESS = "52.16%";

const SECONDARY_SATURATION = "80%";
const SECONDARY_LIGHTNESS = "19%";

const ACCENT_SATURATION = "97%";
const ACCENT_LIGHTNESS = "84%";

interface ThemeStore {
    primaryHue: number;
    accentHue: number;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    setColors(primaryHue: number, accentHue: number): void;
}

const useThemeStore: UseBoundStore<StoreApi<ThemeStore>> = create<ThemeStore>(set => ({
    primaryHue: DEFAULT_PRIMARY_HUE,
    accentHue: DEFAULT_ACCENT_HUE,
    primaryColor: `hsl(${DEFAULT_PRIMARY_HUE}, ${PRIMARY_SATURATION}, ${PRIMARY_LIGHTNESS})`,
    secondaryColor: `hsl(${DEFAULT_PRIMARY_HUE}, ${SECONDARY_SATURATION}, ${SECONDARY_LIGHTNESS})`,
    accentColor: `hsl(${DEFAULT_ACCENT_HUE}, ${ACCENT_SATURATION}, ${ACCENT_LIGHTNESS})`,
    setColors(primaryHue: number, accentHue: number): void {
        set({
            primaryHue,
            accentHue,
            primaryColor: `hsl(${primaryHue}, ${PRIMARY_SATURATION}, ${PRIMARY_LIGHTNESS})`,
            secondaryColor: `hsl(${primaryHue}, ${SECONDARY_SATURATION}, ${SECONDARY_LIGHTNESS})`,
            accentColor: `hsl(${accentHue}, ${ACCENT_SATURATION}, ${ACCENT_LIGHTNESS})`,
        });
        document.documentElement.style.setProperty("--primaryHue", primaryHue.toString());
        document.documentElement.style.setProperty("--accentHue", accentHue.toString());
    },
}));

if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("ThemeStore", useThemeStore);
}

export { useThemeStore };
