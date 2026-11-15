import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// No GitHub Pages o site fica em /uplaycraft/. Local continua na raiz.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/uplaycraft/' : '/',
}))
