import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets':  path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/assets'),
      '@modules': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/modules'),
      '@shared':  path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/shared'),
      '@':        path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
    }
  }
})
