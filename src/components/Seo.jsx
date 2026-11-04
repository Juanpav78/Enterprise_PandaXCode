import { Helmet } from 'react-helmet-async'
import { config } from '../config'

export default function Seo({ title, description, image }) {
  const fullTitle = title ? `${title} | ${config.brand}` : `${config.brand} | Diseño y desarrollo web`
  const desc =
    description ||
    'Diseñamos y desarrollamos sitios web modernos, rápidos y memorables que hacen crecer tu negocio.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  )
}
