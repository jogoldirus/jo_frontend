import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3010",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  resolve: {
    alias: {
      unfetch: path.resolve(__dirname, "node_modules/unfetch/dist/unfetch.mjs"),
    }
  }
})
