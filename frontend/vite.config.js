import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/static/",   // ← CRITICAL FIX
  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: "esnext",
    cssMinify: "esbuild",
    modulePreload: { polyfill: false },
    rollupOptions: {},
  },
  plugins: [react()],
})
