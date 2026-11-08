import { useRef, useState } from 'react'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { projectCover } from '../utils/format'
import { resultadoDe } from '../data/resultados'

// Las portadas vienen de Cloudinary: se piden al ancho de la tarjeta y en el mejor formato
const optimizada = (url) =>
  url?.includes('/upload/') ? url.replace('/upload/', '/upload/f_auto,q_auto,c_limit,w_800/') : url

// Velocidad del recorrido: siempre la misma sin importar lo larga que sea la captura
const PX_POR_SEGUNDO = 120

export default function ProjectCard({ project, onOpen }) {
  const cover = projectCover(project)
  const resultado = resultadoDe(project)
  // Cuánto sobra de la captura por debajo del marco: es lo que se recorre al pasar el mouse.
  // Si la captura no es más alta que el marco (sólo la parte de arriba de la web), no se mueve.
  const [sobrante, setSobrante] = useState(0)

  const img = useRef(null)
  // Se mide al cargar y otra vez al pasar el mouse, por si la ventana cambió de tamaño
  const medir = () => {
    const el = img.current
    if (el) setSobrante(Math.max(0, el.clientHeight - el.parentElement.clientHeight))
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      onMouseEnter={medir}
      className="card group relative block w-full overflow-hidden text-left transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1"
      style={{ '--sobrante': `-${sobrante}px`, '--recorrido': `${Math.max(sobrante / PX_POR_SEGUNDO, 0.3)}s` }}
    >
      <span aria-hidden className="pointer-events-none absolute -inset-px z-10 rounded-md border border-accent/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
        {cover ? (
          <img
            ref={img}
            src={optimizada(cover)}
            alt={project.title}
            loading="lazy"
            onLoad={medir}
            // Al salir vuelve arriba más rápido de lo que bajó
            className="absolute inset-x-0 top-0 h-auto min-h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:[transform:translateY(var(--sobrante))] group-hover:[transition-duration:var(--recorrido)] group-hover:ease-linear"
          />
        ) : (
          <div className="grid h-full place-items-center bg-menta-soft font-display text-3xl font-bold tracking-tight">
            {project.title}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            {project.category && <p className="font-mono text-xs uppercase tracking-wider text-accent">{project.category}</p>}
            <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent">
            Ver <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
        {resultado && (
          <p className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-sm text-ink/85">
            <TrendingUp size={15} className="shrink-0 text-accent" /> {resultado}
          </p>
        )}
      </div>
    </button>
  )
}
