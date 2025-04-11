import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
var plugins = [react(), TanStackRouterVite()];
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: plugins,
    base: '/',
    resolve: {
      alias: {
        '@assets': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'src/assets'
        ),
        '@modules': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'src/modules'
        ),
        '@shared': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          'src/shared'
        ),
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
      },
    },
  };
});
