import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    {enforce: 'pre', ...mdx()},
    react({
      fastRefresh: true
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-navigation-menu', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@mdx-js/react', '@radix-ui/react-navigation-menu', 'lucide-react'],
    exclude: ['path']
  },
  server: {
    port: 8080,
    hmr: {
      overlay: true
    }
  },
});