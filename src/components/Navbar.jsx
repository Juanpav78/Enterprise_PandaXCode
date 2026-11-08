import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { config } from '../config'
import Logo from './Logo'

const links = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/retos', label: 'Retos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

// Transparente arriba; al bajar un poco gana fondo para que el texto siga legible
function useConScroll(umbral = 12) {
  const [activo, setActivo] = useState(false)
  useEffect(() => {
    const revisar = () => setActivo(window.scrollY > umbral)
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [umbral])
  return activo
}

// El subrayado de la página activa es una barra que escala en X (transform), no un borde
const NavItem = ({ to, label }) => (
  <NavLink to={to} className="group relative py-1 text-sm">
    {({ isActive }) => (
      <>
        <span className={`transition-colors group-hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`}>{label}</span>
        <span
          aria-hidden
          className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}
        />
      </>
    )}
  </NavLink>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const conScroll = useConScroll()
  const solido = conScroll || open

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40">
      {/* Capa de fondo aparte: así sólo se anima su opacidad y no el color del header */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 border-b border-line bg-bg/80 backdrop-blur-md transition-opacity duration-300 ${solido ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Barra hacia la tienda PandaX Tech: sólo aparece cuando VITE_TIENDA_URL tiene un enlace real */}
      {config.tiendaUrl && (
        <div className="border-b border-line/60 text-xs text-muted">
          <div className="container-px flex h-8 items-center gap-2">
            <span className="text-ink">PandaX Code</span>
            <span className="text-line">|</span>
            <a href={config.tiendaUrl} className="transition-colors hover:text-accent">
              PandaX Tech
            </a>
          </div>
        </div>
      )}

      <nav className="container-px flex h-16 items-center justify-between" aria-label="Principal">
        <Link to="/" aria-label="PandaX Code, ir al inicio">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavItem {...l} />
            </li>
          ))}
        </ul>

        <Link to="/contacto" className="btn-ghost hidden !py-2 md:inline-flex">
          Cotizar proyecto <ArrowUpRight size={16} />
        </Link>

        <button
          className="rounded-md p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line md:hidden">
          <ul className="container-px flex flex-col gap-4 py-5">
            {links.map((l) => (
              <li key={l.to}>
                <NavItem {...l} />
              </li>
            ))}
            <li>
              <Link to="/contacto" className="btn-primary mt-2 w-full justify-center">
                Cotizar proyecto <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
