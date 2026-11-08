import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, Gauge, Headphones, PenTool, Rocket, ShieldCheck, Smartphone, Zap } from 'lucide-react'
import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import ServicesGrid from '../components/ServicesGrid'
import ProjectsGrid from '../components/ProjectsGrid'
import CtaBand from '../components/CtaBand'
import Testimonials from '../components/Testimonials'
import HeroVisual from '../components/HeroVisual'
import FirmaPixel from '../components/FirmaPixel'
import TitularAnimado from '../components/TitularAnimado'
import Reveal from '../components/Reveal'
import FotoFundador from '../components/FotoFundador'
import MuroRetos from '../components/MuroRetos'

// Opciones que se barajaron para el titular:
//  - "Tu negocio merece una web que se recuerde."
//  - "Diseño y código para webs que trabajan por tu negocio."
// Se eligió esta por concreta: dice qué consigue el cliente (vender) y cuál es el diferencial.
const titular = [
  { texto: 'Webs que' },
  { texto: 'venden,', destacado: true },
  { texto: 'hechas con criterio de diseño.' },
]

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
        <div aria-hidden className="hero-puntos pointer-events-none absolute inset-0" />
        <div className="container-px relative grid items-center gap-14 pt-14 pb-20 md:grid-cols-2 md:pt-20 md:pb-24">
          <div>
            <p className="eyebrow">Diseño · Desarrollo · Experiencia</p>
            <TitularAnimado
              partes={titular}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            />
            <p className="mt-6 max-w-lg text-lg text-muted">
              Diseñamos y desarrollamos sitios web modernos, rápidos y memorables que conectan con tus usuarios y
              hacen crecer tu negocio.
            </p>
            {/* Presentación en primera persona: la marca es PandaX Code, pero hay alguien detrás */}
            <p className="mt-5 max-w-lg border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink/85">
              Soy <span className="font-semibold text-ink">Juan Alvarado</span>, diseñador y desarrollador web en
              Colombia. Trabajas directamente conmigo, de la idea al lanzamiento.
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

          <div className="relative">
            {/* Firma pixel detrás del mockup; se extiende hasta el borde derecho de la pantalla */}
            <FirmaPixel className="absolute -top-10 -bottom-6 -left-14 -right-[50vw]" />
            {/* Mockup con los proyectos destacados de la API. Para usar una imagen propia, basta con
                poner public/hero.webp: HeroVisual la detecta y la muestra en su lugar. */}
            <div className="relative">
              <HeroVisual />
            </div>
          </div>
        </div>

        <Reveal className="container-px relative pb-10">
          <div className="card grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="icon-box">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Servicios */}
      <Reveal as="section" className="container-px mt-20" id="servicios">
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
      </Reveal>

      <CtaBand />

      {/* El estudio: versión corta de /nosotros, para que se vea quién está detrás */}
      <Reveal as="section" className="container-px mt-24">
        <div className="grid items-center gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
          <FotoFundador className="mx-auto w-full max-w-[18rem]" />
          <div>
            <p className="eyebrow">El estudio</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Un estudio pequeño, <span className="text-accent">a propósito</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Sin intermediarios ni cuentas que pasan de mano en mano: quien escucha tu idea es quien la diseña, la
              programa y la publica. Por eso cada proyecto tiene criterio y nadie se pierde en el camino.
            </p>
            <Link to="/nosotros" className="btn-ghost mt-8">
              Conóceme <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Portafolio */}
      <Reveal as="section" className="container-px mt-24">
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
      </Reveal>

      {/* Retos: el contenido de redes, conectado con la web */}
      <Reveal as="section" className="container-px mt-24">
        <SectionHeader
          eyebrow="Retos"
          title="Una landing, una temática al azar,"
          highlight="contrarreloj"
          description="Así practico en público: sale una temática al azar y diseño y programo una landing contra el reloj. Cada reto que publico en redes llena una casilla."
        />
        <div className="mt-10">
          <MuroRetos minimo={6} />
        </div>
        <div className="mt-6 text-center">
          <Link to="/retos" className="btn-ghost">
            Ver todos los retos <ArrowUpRight size={16} />
          </Link>
        </div>
      </Reveal>

      <Testimonials />
    </>
  )
}
