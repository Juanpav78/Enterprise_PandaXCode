// Configuración central del sitio. Todo lo que cambia entre entornos viene del .env
export const config = {
  apiUrl: (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/, ''),
  site: import.meta.env.VITE_SITE || 'code',
  whatsapp: import.meta.env.VITE_WHATSAPP || '',
  email: import.meta.env.VITE_EMAIL || 'contacto@tudominio.com',
  instagram: import.meta.env.VITE_INSTAGRAM || 'https://www.instagram.com/pandaxcode/',
  youtube: import.meta.env.VITE_YOUTUBE || 'https://www.youtube.com/@pandaxcode9228',
  // Vacío mientras la tienda no exista: la barra superior con el enlace no se muestra
  tiendaUrl: import.meta.env.VITE_TIENDA_URL && import.meta.env.VITE_TIENDA_URL !== '#' ? import.meta.env.VITE_TIENDA_URL : '',
  brand: 'PandaX Code',
}

export const whatsappLink = (message = 'Hola, quiero cotizar un proyecto web') =>
  config.whatsapp
    ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`
    : '#'
