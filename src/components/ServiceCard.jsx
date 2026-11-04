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
import { formatCOP } from '../utils/format'

// El backend guarda el nombre del ícono como texto (campo "icon")
const icons = {
  layout: LayoutTemplate,
  monitor: Monitor,
  'shopping-bag': ShoppingBag,
  'pen-tool': PenTool,
  code: Code2,
  rocket: Rocket,
}

const priceText = (s) => {
  if (s.priceLabel) return s.priceLabel
  if (typeof s.priceFrom !== 'number') return 'Cotiza tu proyecto'
  return `${s.priceLabelPrefix || 'Desde'} ${formatCOP(s.priceFrom)}${s.priceSuffix || ''}`
}

export default function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Sparkles

  return (
    <article className="card group flex flex-col overflow-hidden transition hover:border-accent/40">
      <div className="flex flex-1 flex-col p-6">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
          <Icon size={20} />
        </span>
        <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
        <span className="mt-2 block h-0.5 w-8 bg-accent" />
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-line px-6 py-4 text-sm">
        <span className="flex items-center gap-2 text-ink/90">
          <CheckCircle2 size={16} className="text-accent" />
          {priceText(service)}
        </span>
        <Link
          to={`/contacto?servicio=${encodeURIComponent(service.slug || service.title)}`}
          className="flex items-center gap-1 text-accent transition group-hover:gap-2"
        >
          Cotizar <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  )
}
