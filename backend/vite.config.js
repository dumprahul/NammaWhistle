import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["re2", "koffi"]
  },
  plugins: [react()],
  build: {
    commonjsOptions: {
      ignoreTryCatch: (id) => id.includes("re2") || id.includes("koffi"),
    }
  }
})
