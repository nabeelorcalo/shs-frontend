import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch:
    {
      usePolling: true,
    },
  },
  plugins: [svgr(), react()],
  optimizeDeps: {
    exclude: ['react-icons']
  }
})
