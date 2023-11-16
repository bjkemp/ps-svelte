import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

// Get all .svelte files in the src/components directory
const components = fs.readdirSync(path.resolve(__dirname, 'src/components'))
  .filter(file => file.endsWith('.svelte'))
  .map(file => path.resolve(__dirname, 'src/components', file));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        // enable run-time checks when not in production
        dev: true,
      },
    }),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist/WEB_ROOT/ps-svelte/',
    assetsDir: 'ps-svelte/assets',
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      input: components,
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks: undefined,
        exports: 'named',
        sourcemap: false,
        sourcemapExcludeSources: false,
        inlineDynamicImports: false,
        plugins: [],
      },
      plugins: [],
    },
  },
});
