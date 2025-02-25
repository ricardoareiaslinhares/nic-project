import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],/*
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("@tanstack/react-query")) return "tanstack-query-vendor";
            if (id.includes("react-hook-form") || id.includes("formik")) return "forms-vendor";
            if (id.includes("@mui")) return "mui-vendor";
            return "vendor"; // Default bucket for other libs
          }
        },
      },
    }
  }
    */
  
})

