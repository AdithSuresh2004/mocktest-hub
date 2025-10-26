import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

const pwaConfig = {
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
  },
  manifest: {
    name: 'MockTest Hub',
    short_name: 'MockTest',
    description: 'An offline-first mock test platform.',
    theme_color: '#ffffff',
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(pwaConfig)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'react-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons'
            }
            return 'vendor'
          }
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
