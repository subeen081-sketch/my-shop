import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 주소: https://subeen081-sketch.github.io/my-shop/
  base: '/my-shop/',
  plugins: [react()],
})
