import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { config } from '../config'
import Logo from './Logo'

const links = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  const linkClass = ({ isActive }) =>
    `text-sm transition hover:text-accent ${isActive ? 'text-accent' : 'text-ink/80'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      {/* Barra hacia la tienda PandaX Tech: sólo aparece cuando VITE_TIENDA_URL tiene un enlace real */}
      {config.tiendaUrl && (
        <div className="border-b border-line/60 text-xs text-muted">
          <div className="container-px flex h-8 items-center gap-2">
            <span className="text-ink">PandaX Code</span>
            <span className="text-line">|</span>
            <a href={config.tiendaUrl} className="transition hover:text-accent">
              PandaX Tech
            </a>
          </div>
        </div>
      )}

      <nav className="container-px flex h-16 items-center justify-between" aria-label="Principal">
        <Link to="/" aria-label="Inicio">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/contacto" className="btn-ghost hidden !py-2 md:inline-flex">
          Cotizar proyecto <ArrowUpRight size={16} />
        </Link>

        <button
          className="rounded-lg p-2 text-ink md:hidden"
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
                <NavLink to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
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
