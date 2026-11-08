import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PandaPixel from '../components/PandaPixel'

export default function NotFound() {
  return (
    <section className="container-px flex flex-col items-center py-24 text-center md:py-32">
      <Seo title="Página no encontrada" />
      <PandaPixel size={176} guinoCada={4000} titulo="Mascota de PandaX Code" />
      <p className="mt-8 font-pixel text-sm text-accent">ERROR 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Esta página se perdió en el bosque de bambú</h1>
      <p className="mt-3 max-w-md text-muted">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link to="/" className="btn-primary mt-8">
        Volver al inicio <ArrowUpRight size={16} />
      </Link>
    </section>
  )
}
