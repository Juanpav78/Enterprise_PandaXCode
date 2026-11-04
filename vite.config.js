import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 5173 lo usa el portafolio (con el admin); así ambos corren a la vez contra la misma API
  server: { port: 5174, strictPort: true },
})
