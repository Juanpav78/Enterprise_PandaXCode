import { Link } from 'react-router-dom'
import { Instagram, Mail, MessageCircle, Youtube } from 'lucide-react'
import { config, whatsappLink } from '../config'
import Logo from './Logo'
import PandaPixel from './PandaPixel'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-px grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted">
            Diseñamos y desarrollamos sitios web modernos, rápidos y memorables que hacen crecer tu
            negocio.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-accent" to="/servicios">Servicios</Link></li>
            <li><Link className="hover:text-accent" to="/portafolio">Portafolio</Link></li>
            <li><Link className="hover:text-accent" to="/retos">Retos</Link></li>
            <li><Link className="hover:text-accent" to="/nosotros">Nosotros</Link></li>
            <li><Link className="hover:text-accent" to="/privacidad">Política de privacidad</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a className="flex items-center gap-2 hover:text-accent" href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-accent" href={`mailto:${config.email}`}>
                <Mail size={16} /> {config.email}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-accent" href={config.instagram} target="_blank" rel="noreferrer">
                <Instagram size={16} /> Instagram
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-accent" href={config.youtube} target="_blank" rel="noreferrer">
                <Youtube size={16} /> YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-px flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">© {year} PandaX Code. Todos los derechos reservados.</p>
          <a
            href={config.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <PandaPixel size={48} guinoCada={6000} />
            @pandaxcode
          </a>
        </div>
      </div>
    </footer>
  )
}
