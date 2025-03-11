import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Разрешает доступ извне (не только localhost)
    allowedHosts: ['6aa2-2800-810-5fe-1d3-e016-5088-bd15-f2da.ngrok-free.app']
  }
})
