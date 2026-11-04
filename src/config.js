// Configuración central del sitio. Todo lo que cambia entre entornos viene del .env
export const config = {
  apiUrl: (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/, ''),
  site: import.meta.env.VITE_SITE || 'code',
  whatsapp: import.meta.env.VITE_WHATSAPP || '',
  email: import.meta.env.VITE_EMAIL || 'contacto@tudominio.com',
  instagram: import.meta.env.VITE_INSTAGRAM || '#',
  tiendaUrl: import.meta.env.VITE_TIENDA_URL || '#',
  brand: 'PandaX Code',
}

export const whatsappLink = (message = 'Hola, quiero cotizar un proyecto web') =>
  config.whatsapp
    ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`
    : '#'
