// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";

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
                    // Separate React and React DOM into a separate chunk
                    if (id.includes("node_modules/react")) {
                        return "react";
                    }

                    // Separate Firebase into its own chunk
                    if (id.includes("node_modules/firebase")) {
                        return "firebase";
                    }

                    // Other large dependencies can be chunked similarly
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
    plugins: [react(), analyzer()],
});
