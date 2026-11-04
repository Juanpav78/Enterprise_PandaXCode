import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import ServicesGrid from '../components/ServicesGrid'
import CtaBand from '../components/CtaBand'

const steps = [
  { n: '01', title: 'Brief', text: 'Conocemos tu negocio, tus objetivos y lo que necesitas.' },
  { n: '02', title: 'Propuesta', text: 'Te enviamos alcance, tiempos y valor. Con el anticipo arrancamos.' },
  { n: '03', title: 'Diseño', text: 'Diseñamos la experiencia y la ajustamos contigo.' },
  { n: '04', title: 'Desarrollo', text: 'Construimos un sitio rápido, seguro y responsive.' },
  { n: '05', title: 'Entrega', text: 'Publicamos, te capacitamos y quedamos para soporte.' },
]

export default function Services() {
  return (
    <>
      <Seo title="Servicios" description="Landing pages, sitios corporativos, e-commerce, rediseño y mantenimiento web." />
      <section className="container-px pt-20">
        <SectionHeader
          eyebrow="Servicios"
          title="Soluciones digitales hechas"
          highlight="a tu medida"
          description="Elige el servicio que mejor se ajusta a tu negocio. Todos incluyen diseño responsive y optimización básica para Google."
        />
        <ServicesGrid />
      </section>

      <section className="container-px mt-24">
        <SectionHeader eyebrow="Proceso" title="Así trabajamos" highlight="contigo" />
        <ol className="mt-12 grid gap-5 md:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="card p-5">
              <span className="text-sm font-semibold text-accent">{s.n}</span>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  )
}
