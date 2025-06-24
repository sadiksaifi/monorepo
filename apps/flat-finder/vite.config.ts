import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ autoCodeSplitting: false }), viteReact(), tailwindcss()],
  server: {
    proxy:
      process.env.NODE_ENV === 'development'
        ? {
            '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
            },
          }
        : {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
