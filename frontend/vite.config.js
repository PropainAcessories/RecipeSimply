import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    bundler: "rollup",   // ← THIS is the key line
    target: "esnext",
    cssMinify: "esbuild",
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {},   // optional but fine
  },
  plugins: [react()],
})
