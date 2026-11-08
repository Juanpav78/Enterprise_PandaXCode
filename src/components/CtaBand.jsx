import Reveal from './Reveal'
import { EsquinaPixel } from './Pixeles'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function CtaBand() {
  return (
    <Reveal as="section" className="container-px mt-24">
      <div className="card relative overflow-hidden flex flex-col items-center justify-between gap-6 px-8 py-10 text-center md:flex-row md:text-left">
        {/* Escalera pixel en la esquina: el guiño de marca dentro de la banda */}
        <EsquinaPixel esquina="tr" className="absolute top-0 right-0" />
        <div className="relative">
          <p className="eyebrow">¿Tienes un proyecto en mente?</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            Hablemos y hagámoslo <span className="text-accent">realidad.</span>
          </h2>
        </div>
        <Link to="/contacto" className="btn-primary relative">
          Cotizar proyecto <ArrowUpRight size={16} />
        </Link>
      </div>
    </Reveal>
  )
}
