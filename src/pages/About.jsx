import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import CtaBand from '../components/CtaBand'
import FotoFundador from '../components/FotoFundador'
import ProcesoPasos from '../components/ProcesoPasos'

// TODO: 3–4 líneas de historia personal en primera persona (quién eres, por qué empezaste,
// qué te importa al construir una web). Cada elemento es un párrafo; mientras esté vacío
// no se muestra nada inventado y sólo queda la presentación del estudio.
const historia = []

const values = [
  { title: 'Cercanía', text: 'Hablas directamente con quien diseña y desarrolla tu proyecto.' },
  { title: 'Calidad', text: 'Código limpio, sitios rápidos y diseño cuidado en cada detalle.' },
  { title: 'Claridad', text: 'Precios, tiempos y entregables definidos desde el inicio.' },
]

export default function About() {
  return (
    <>
      <Seo title="Nosotros" description="Conoce quién está detrás de PandaX Code." />
      <Reveal as="section" className="container-px grid items-center gap-12 pt-20 md:grid-cols-[5fr_7fr] md:gap-16">
        <FotoFundador className="mx-auto w-full max-w-sm md:order-none" />
        <div>
          <SectionHeader eyebrow="Sobre mí" title="Detrás de" highlight="PandaX Code" center={false} />
          <p className="mt-6 text-lg text-ink/90">
            Soy <span className="font-semibold">Juan Alvarado</span>, diseñador y desarrollador web. PandaX Code es mi
            estudio: cuando trabajas con nosotros, trabajas directamente conmigo.
          </p>
          {historia.map((parrafo) => (
            <p key={parrafo} className="mt-4 text-muted">{parrafo}</p>
          ))}
          <p className="mt-4 text-muted">
            Somos un estudio de diseño y desarrollo web enfocado en ayudar a negocios y emprendedores a tener una
            presencia digital profesional. Combinamos diseño estratégico con tecnología moderna para crear sitios que
            se ven bien, cargan rápido y generan resultados.
          </p>
          <p className="mt-4 text-muted">
            Trabajamos con React, Node.js, MongoDB y Next.js, y acompañamos a cada cliente desde la idea hasta la
            publicación y el mantenimiento.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="container-px mt-20 grid gap-5 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card p-6">
            <h3 className="font-semibold text-accent">{v.title}</h3>
            <p className="mt-2 text-sm text-muted">{v.text}</p>
          </div>
        ))}
      </Reveal>

      <Reveal as="section" className="container-px mt-24">
        <SectionHeader eyebrow="Proceso" title="Cómo" highlight="trabajo" />
        <ProcesoPasos />
      </Reveal>

      <CtaBand />
    </>
  )
}
