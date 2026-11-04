import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import CtaBand from '../components/CtaBand'
import NosotrosVisual from '../components/NosotrosVisual'

const values = [
  { title: 'Cercanía', text: 'Hablas directamente con quien diseña y desarrolla tu proyecto.' },
  { title: 'Calidad', text: 'Código limpio, sitios rápidos y diseño cuidado en cada detalle.' },
  { title: 'Claridad', text: 'Precios, tiempos y entregables definidos desde el inicio.' },
]

export default function About() {
  return (
    <>
      <Seo title="Nosotros" description="Conoce quién está detrás de PandaX Code." />
      <section className="container-px grid items-center gap-12 pt-20 md:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Nosotros" title="Detrás de" highlight="PandaX Code" center={false} />
          {/* Cuenta aquí tu historia: quién eres, por qué empezaste y cómo trabajas */}
          <p className="mt-6 text-muted">
            Somos un estudio de diseño y desarrollo web enfocado en ayudar a negocios y emprendedores a tener una
            presencia digital profesional. Combinamos diseño estratégico con tecnología moderna para crear sitios que
            se ven bien, cargan rápido y generan resultados.
          </p>
          <p className="mt-4 text-muted">
            Trabajamos con React, Node.js, MongoDB y Next.js, y acompañamos a cada cliente desde la idea hasta la
            publicación y el mantenimiento.
          </p>
        </div>
        <NosotrosVisual />
      </section>

      <section className="container-px mt-20 grid gap-5 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card p-6">
            <h3 className="font-semibold text-accent">{v.title}</h3>
            <p className="mt-2 text-sm text-muted">{v.text}</p>
          </div>
        ))}
      </section>

      <CtaBand />
    </>
  )
}
