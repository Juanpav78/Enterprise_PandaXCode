import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Monitor,
  PenTool,
  Rocket,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import ContadorPrecio from './ContadorPrecio'

// TODO: confirmar cuál es el servicio más pedido y poner aquí su slug (p. ej. 'landing-pages').
// Mientras esté vacío no se muestra el chip: no se afirma algo que no está confirmado.
const MAS_PEDIDO = ''

// El backend guarda el nombre del ícono como texto (campo "icon")
const icons = {
  layout: LayoutTemplate,
  monitor: Monitor,
  'shopping-bag': ShoppingBag,
  'pen-tool': PenTool,
  code: Code2,
  rocket: Rocket,
}

// Texto del precio. Con un precio numérico, la cifra se anima al entrar en pantalla.
const Precio = ({ service: s }) => {
  if (s.priceLabel) return s.priceLabel
  if (typeof s.priceFrom !== 'number') return 'Cotiza tu proyecto'
  return (
    <>
      {s.priceLabelPrefix || 'Desde'}{' '}
      {/* La cifra y el sufijo ("/mes") nunca se separan en dos líneas */}
      <span className="whitespace-nowrap">
        <ContadorPrecio valor={s.priceFrom} />
        {s.priceSuffix || ''}
      </span>
    </>
  )
}

export default function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Sparkles

  const destacado = MAS_PEDIDO && service.slug === MAS_PEDIDO

  return (
    // Al pasar el mouse: sube 4px, el borde pasa a menta y el ícono se desplaza. El borde menta
    // es una capa aparte que sólo cambia de opacidad (así todo se anima con transform/opacity).
    <article className="card group relative flex flex-col transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 focus-within:-translate-y-1">
      <span aria-hidden className="pointer-events-none absolute -inset-px rounded-md border border-accent/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="icon-box">
            <Icon size={20} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {destacado && <span className="chip">Más pedido</span>}
        </div>
        <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
        <span className="mt-2 block h-0.5 w-8 bg-accent" />
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 text-sm">
        <span className="flex items-center gap-2 text-ink/90">
          <CheckCircle2 size={16} className="shrink-0 text-accent" />
          <span><Precio service={service} /></span>
        </span>
        <Link
          to={`/contacto?servicio=${encodeURIComponent(service.slug || service.title)}`}
          className="flex shrink-0 items-center gap-1 font-medium text-accent"
        >
          Cotizar <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  )
}
