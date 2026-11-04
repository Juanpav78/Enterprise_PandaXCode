import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function CtaBand() {
  return (
    <section className="container-px mt-24">
      <div className="card flex flex-col items-center justify-between gap-6 px-8 py-10 text-center md:flex-row md:text-left">
        <div>
          <p className="eyebrow">¿Tienes un proyecto en mente?</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            Hablemos y hagámoslo <span className="text-accent">realidad.</span>
          </h2>
        </div>
        <Link to="/contacto" className="btn-primary">
          Cotizar proyecto <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  )
}
