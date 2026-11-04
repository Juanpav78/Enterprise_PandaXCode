import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import { projectImages } from '../utils/format'

export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0)
  const images = projectImages(project)

  useEffect(() => {
    setIndex(0)
  }, [project])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (images.length ? (i + 1) % images.length : 0))
      if (e.key === 'ArrowLeft') setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, images.length])

  if (!project) return null

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm md:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="card relative my-8 grid w-full max-w-5xl gap-8 p-5 md:grid-cols-2 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-2 transition hover:border-accent"
        >
          <X size={18} />
        </button>

        {/* Galería */}
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface-2">
            {images.length ? (
              <img src={images[index]} alt={`${project.title} ${index + 1}`} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center bg-gradient-to-br from-surface-2 to-accent/20 text-4xl font-semibold">
                {project.title}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex items-center gap-2">
              <button onClick={prev} aria-label="Anterior" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line hover:border-accent">
                <ChevronLeft size={16} />
              </button>
              <div className="flex flex-1 gap-2 overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border ${i === index ? 'border-accent' : 'border-line opacity-60'}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <button onClick={next} aria-label="Siguiente" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line hover:border-accent">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Detalle */}
        <div className="flex flex-col">
          {project.category && (
            <span className="w-fit rounded-md border border-line px-3 py-1 text-xs uppercase tracking-wider text-accent">
              {project.category}
            </span>
          )}
          <h2 className="mt-4 text-4xl font-bold tracking-tight">{project.title}</h2>
          {project.subtitle && <p className="mt-1 text-lg text-muted">{project.subtitle}</p>}
          {(project.summary || project.description) && (
            <p className="mt-4 text-sm leading-relaxed text-ink/85">{project.summary || project.description}</p>
          )}

          <div className="mt-6 space-y-5 border-t border-line pt-6 text-sm">
            {project.objective && (
              <div>
                <p className="flex items-center gap-2 font-semibold text-accent"><Target size={16} /> Objetivo</p>
                <p className="mt-2 text-muted">{project.objective}</p>
              </div>
            )}
            {project.result && (
              <div>
                <p className="flex items-center gap-2 font-semibold text-accent"><TrendingUp size={16} /> Resultado</p>
                <p className="mt-2 text-muted">{project.result}</p>
              </div>
            )}
          </div>

          {project.highlights?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Highlights</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span key={h} className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs">
                    <Sparkles size={13} className="text-accent" /> {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.technologies?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Tecnologías</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="rounded-md border border-line px-2.5 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary mt-8 w-fit">
              Ver proyecto <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
