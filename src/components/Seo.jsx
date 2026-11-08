import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { config } from '../config'

// Dominio público (VITE_SITE_URL). Sin él no se emiten URLs absolutas: una relativa no le
// sirve a Google ni a las redes.
const SITIO = (import.meta.env.VITE_SITE_URL || '').trim().replace(/\/$/, '')

/**
 * Título, descripción y URL canónica de cada página. El canonical va aquí (y no en
 * index.html) porque esta web es una SPA: todas las rutas sirven el mismo index.html, y un
 * canonical fijo haría que /servicios o /retos le dijeran a Google que son la portada.
 * noindex: para páginas que no deben aparecer en buscadores (la 404).
 */
export default function Seo({ title, description, image, noindex = false }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${config.brand}` : `${config.brand} | Diseño y desarrollo web`
  const desc =
    description ||
    'Diseñamos y desarrollamos sitios web modernos, rápidos y memorables que hacen crecer tu negocio.'
  // Sin barra final salvo en la portada, igual que las URLs del sitemap
  const url = SITIO ? `${SITIO}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}` : ''

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex" />}
      {url && !noindex && <link rel="canonical" href={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  )
}
