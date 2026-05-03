import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
// CHANGE TO STATIC BEFORE GOING INTO PRODUCTION!!!!!!!!!
export default defineConfig({
  base: "/static/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "esnext",
    modulePreload: { polyfill: false },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
});
