import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seo from './vite-plugin-seo.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), seo({ rutas: ['/', '/servicios', '/portafolio', '/nosotros', '/contacto', '/privacidad'] })],
  // 5173 lo usa el portafolio (con el admin); así ambos corren a la vez contra la misma API
  server: { port: 5174, strictPort: true },
})
