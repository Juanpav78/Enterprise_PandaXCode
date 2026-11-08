import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import MuroRetos from '../components/MuroRetos'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'

export default function Retos() {
  return (
    <>
      <Seo
        title="Retos"
        description="Una temática al azar, una landing nueva. Los retos de PandaX Code en Instagram, TikTok y YouTube."
      />
      <Reveal as="section" className="container-px relative pt-20">
        <div aria-hidden className="puntos-centro pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />
        <SectionHeader
          eyebrow="Retos"
          title="Una temática al azar,"
          highlight="una landing nueva"
          description="Sale una temática al azar y diseño y programo una landing completa para ella. Lo grabo y lo publico en redes; cada reto nuevo ocupa una casilla de este muro."
          center={false}
        />
        <div className="mt-10">
          <MuroRetos minimo={9} />
        </div>
      </Reveal>
      <CtaBand />
    </>
  )
}
