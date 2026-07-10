import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  // entry-server.tsx never imports CSS, so skip the Tailwind plugin for the SSR build.
  plugins: isSsrBuild ? [react()] : [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  ssr: {
    target: 'webworker',
    noExternal: true,
  },
  build: isSsrBuild
    ? {
        outDir: 'dist-ssr',
        ssr: 'src/entry-server.tsx',
        rollupOptions: {
          output: {
            entryFileNames: 'entry-server.js',
            format: 'es',
          },
        },
      }
    : {
        rollupOptions: {
          output: {
            manualChunks: {
              swiper: ['swiper', 'swiper/react', 'swiper/modules'],
            },
          },
        },
      },
}))
