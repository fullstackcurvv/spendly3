import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SpendlyLandingSDK',
      fileName: 'spendly-landing-sdk',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom', 'react-router-dom', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
          'react/jsx-dev-runtime': 'ReactJsxDevRuntime',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDom',
          'lucide-react': 'LucideReact',
        },
      },
    },
  },
})
