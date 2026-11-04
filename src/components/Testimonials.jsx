import { Quote } from 'lucide-react'
import { api } from '../api/client'
import { useApi } from '../hooks/useApi'
import { fallbackTestimonials } from '../data/fallback'
import { idOf } from '../utils/format'
import SectionHeader from './SectionHeader'

// La sección se oculta sola si todavía no tienes testimonios
export default function Testimonials() {
  const { data } = useApi(api.getTestimonials, fallbackTestimonials)
  if (!data?.length) return null

  return (
    <section className="container-px mt-24">
      <SectionHeader eyebrow="Testimonios" title="Lo que dicen" highlight="nuestros clientes" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {data.slice(0, 3).map((t) => (
          <figure key={idOf(t)} className="card p-6">
            <Quote size={22} className="text-accent" />
            <blockquote className="mt-4 text-sm leading-relaxed text-ink/90">“{t.text || t.quote}”</blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-semibold">{t.name}</span>
              {(t.company || t.role) && <span className="block text-muted">{t.company || t.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
