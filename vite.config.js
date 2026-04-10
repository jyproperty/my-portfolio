import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
  resolve: {
    alias: {
      // MUI v7 + Vite 8 (Rolldown) ESM 호환성 패치
      '@mui/styled-engine': path.resolve(__dirname, 'node_modules/@mui/styled-engine/esm/index.js'),
    },
  },
})
