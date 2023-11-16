import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      customElement: true,
      // enable run-time checks when not in production
      dev: true,
    }
  })
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      input: 'src/components/Button.svelte',
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks: undefined,
        exports: 'named',
        sourcemap: true,
        sourcemapExcludeSources: false,
        inlineDynamicImports: false,
        plugins: [],
      },
      plugins: [],
    }
  },
})
