// noinspection JSUnusedGlobalSymbols

import type { Config } from "tailwindcss/types/config";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} as Config;

