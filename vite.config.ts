import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { githubApiPlugin } from './vite.github-plugin.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), githubApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
