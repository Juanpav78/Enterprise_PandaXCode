import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, Gauge, Headphones, PenTool, Rocket, ShieldCheck, Smartphone, Zap } from 'lucide-react'
import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import ServicesGrid from '../components/ServicesGrid'
import ProjectsGrid from '../components/ProjectsGrid'
import CtaBand from '../components/CtaBand'
import Testimonials from '../components/Testimonials'
import HeroVisual from '../components/HeroVisual'

const pillars = [
  { icon: PenTool, title: 'Diseño estratégico', text: 'Interfaces que comunican y conectan.' },
  { icon: Code2, title: 'Desarrollo moderno', text: 'Tecnología escalable, rápida y segura.' },
  { icon: Smartphone, title: 'Experiencia enfocada', text: 'UX/UI que convierte visitantes en clientes.' },
  { icon: Rocket, title: 'Rendimiento óptimo', text: 'Sitios rápidos, optimizados y preparados para crecer.' },
]

const benefits = [
  { icon: Zap, title: 'Rápido y optimizado', text: 'Sitios veloces que mejoran la experiencia y el posicionamiento en Google.' },
  { icon: ShieldCheck, title: 'Seguro y confiable', text: 'Buenas prácticas de seguridad para proteger tu sitio.' },
  { icon: Gauge, title: '100% responsive', text: 'Diseños que se adaptan a cualquier dispositivo.' },
  { icon: Headphones, title: 'Soporte dedicado', text: 'Acompañamiento continuo para que tu proyecto siga en marcha.' },
]

export default function Home() {
  return (
    <>
      <Seo />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
        <div className="container-px relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Diseño · Desarrollo · Experiencia</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Experiencias digitales que <span className="text-accent">elevan marcas.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Diseñamos y desarrollamos sitios web modernos, rápidos y memorables que conectan con tus usuarios y
              hacen crecer tu negocio.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contacto" className="btn-primary">
                Cotizar proyecto <ArrowUpRight size={16} />
              </Link>
              <Link to="/portafolio" className="btn-ghost">
                Ver proyectos <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Mockup con los proyectos destacados de la API. Para usar una imagen propia, basta con
              poner public/hero.webp: HeroVisual la detecta y la muestra en su lugar. */}
          <HeroVisual />
        </div>

        <div className="container-px pb-10">
          <div className="card grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="container-px mt-20" id="servicios">
        <SectionHeader
          eyebrow="Servicios"
          title="Soluciones digitales hechas"
          highlight="a tu medida"
          description="Creamos experiencias digitales modernas, rápidas y funcionales que elevan tu marca y conectan con tus usuarios."
        />
        <ServicesGrid />

        <div className="card mt-8 grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <Icon size={22} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />

      {/* Portafolio */}
      <section className="container-px mt-24">
        <SectionHeader
          eyebrow="Portafolio"
          title="Proyectos que"
          highlight="hablan por nosotros"
          description="Una selección de sitios y tiendas que hemos diseñado y desarrollado."
        />
        <ProjectsGrid featured limit={3} />
        <div className="mt-10 text-center">
          <Link to="/portafolio" className="btn-ghost">
            Ver más proyectos <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Testimonials />
    </>
  )
}
