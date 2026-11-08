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
        description="Una landing, una temática al azar, contrarreloj. Los retos de PandaX Code en Instagram, TikTok y YouTube."
      />
      <Reveal as="section" className="container-px pt-20">
        <SectionHeader
          eyebrow="Retos"
          title="Una landing, una temática al azar,"
          highlight="contrarreloj"
          description="Sale una temática al azar, corre el reloj y diseño y programo una landing completa. Lo grabo y lo publico en redes; cada reto nuevo ocupa una casilla de este muro."
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
