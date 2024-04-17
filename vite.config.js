import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 // https://vite.js.dev/config/

export default defineConfig({
  base: "/pokedex-app",
  plugins: [react()]
})
