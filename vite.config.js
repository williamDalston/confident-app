// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/confident-app/', // 👈 exactly this, matching the repo name
  plugins: [react()],
})
