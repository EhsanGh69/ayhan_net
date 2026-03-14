import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          mui: ["@mui/material", 
            "@mui/icons-material", 
            "@emotion/react", "@emotion/cache",
            "@emotion/styled", 
            "stylis", "stylis-plugin-rtl"],
          query: ["@tanstack/react-query"],
          form: ["formik", "yup"],
          date: ["jalali-moment"],
          utils: ["axios", "persian", "react-multi-date-picker"]
        }
      }
    },
    chunkSizeWarningLimit: 2000
  }
})
