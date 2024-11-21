// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules/react")) {
                        return "react";
                    }
                    if (id.includes("node_modules/firebase")) {
                        return "firebase";
                    }
                },
            },
        },
    },
    optimizeDeps: {
        include: [
            "react",
            "react-dom",
            "firebase",
            "zustand",
            // Add any other libraries you want to optimize
        ],
    },
    plugins: [react()],
});
