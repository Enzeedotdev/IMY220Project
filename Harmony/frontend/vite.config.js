import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Locally the backend is on localhost. In Docker it is a separate container,
// reached by its container name, which docker run passes in as VITE_API_TARGET.
const apiTarget = process.env.VITE_API_TARGET || 'http://localhost:3001'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': apiTarget,
    },
  },
})
