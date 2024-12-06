import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/node';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          input: './src/main.tsx',
          output: {
            entryFileNames: 'static/main.js',
          },
          onwarn(warning, warn) {
            // Suppress "Module level directives cause errors when bundled" warnings
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
              return;
            }
            warn(warning);
          },
        },
      },
    };
  } else {
    return {
      plugins: [
        build(),
        devServer({
          entry: 'src/index.tsx',
        }),
      ],
    };
  }
});
