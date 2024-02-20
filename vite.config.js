import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            /**
             * Ignore "use client" waning since we are not using SSR
             * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
             */
            onwarn(warning, warn) {
                if (
                    warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
                    warning.message.includes(`"use client"`)
                ) {
                    return;
                }
                warn(warning);
            },
        },
    },
    server: {
        port: 12453,
    },
    resolve: {
        alias: {
            '@assets': path.resolve(
                path.dirname(fileURLToPath(import.meta.url)),
                'src/assets',
            ),
            '@modules': path.resolve(
                path.dirname(fileURLToPath(import.meta.url)),
                'src/modules',
            ),
            '@shared': path.resolve(
                path.dirname(fileURLToPath(import.meta.url)),
                'src/shared',
            ),
            '@': path.resolve(
                path.dirname(fileURLToPath(import.meta.url)),
                'src',
            ),
        },
    },
});
