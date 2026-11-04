import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import ProjectsGrid from '../components/ProjectsGrid'
import CtaBand from '../components/CtaBand'

export default function Portfolio() {
  return (
    <>
      <Seo title="Portafolio" description="Proyectos web diseñados y desarrollados por PandaX Code." />
      <section className="container-px pt-20">
        <SectionHeader
          eyebrow="Portafolio"
          title="Proyectos que"
          highlight="hablan por nosotros"
          description="Haz clic en cada proyecto para ver el objetivo, el resultado y las tecnologías que usamos."
        />
        <ProjectsGrid filters />
      </section>
      <CtaBand />
    </>
  )
}
