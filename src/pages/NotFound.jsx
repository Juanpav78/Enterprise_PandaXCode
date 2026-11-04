import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <section className="container-px flex flex-col items-center py-32 text-center">
      <Seo title="Página no encontrada" />
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Esta página no existe</h1>
      <p className="mt-2 text-muted">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link to="/" className="btn-primary mt-8">Volver al inicio</Link>
    </section>
  )
}
