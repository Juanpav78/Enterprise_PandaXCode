// Rutas de tu backend compartido.
// Si tus rutas se llaman distinto, cámbialas SOLO aquí y el resto del frontend sigue igual.
export const endpoints = {
  services: '/services', // GET  ?site=code
  projects: '/projects', // GET  ?site=code&featured=true&limit=3
  project: (slug) => `/projects/${slug}`, // GET
  testimonials: '/testimonials', // GET  ?site=code
  contact: '/contact', // POST { name, email, phone, company, service, budget, message, site }
}
