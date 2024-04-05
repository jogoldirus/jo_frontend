import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      // '/api': {
      //   target: "https://mypaotscan.com",
      //   changeOrigin: true,
      //   secure: false,
      //   // rewrite: (path) => path.replace(/^\/api/, '')
      // },
    }
  },
  resolve: {
    alias: {
      unfetch: path.resolve(__dirname, "node_modules/unfetch/dist/unfetch.mjs"),
    }
  }
})
