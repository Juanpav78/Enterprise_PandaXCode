import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, MessageSquare, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import { projectImages } from '../utils/format'

// Detalle de un proyecto en una sola columna: imágenes arriba y texto abajo. Con mucho texto el
// modal entero hace scroll (en vez de desbordar la pantalla) y el botón de cerrar queda fijo.
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
  const texto = project.description || project.summary

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Fijo respecto a la pantalla: sigue visible aunque el contenido se desplace */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="fixed right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-2/90 backdrop-blur transition hover:border-accent sm:right-6 sm:top-6"
      >
        <X size={18} />
      </button>

      <article className="card mx-auto my-6 w-full max-w-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Galería */}
        <div className="relative aspect-video bg-surface-2">
          {images.length ? (
            <img src={images[index]} alt={`${project.title} ${index + 1}`} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-surface-2 to-accent/20 text-4xl font-semibold">
              {project.title}
            </div>
          )}
          {images.length > 1 && (
            <>
              <button onClick={prev} aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 backdrop-blur transition hover:border-accent">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 backdrop-blur transition hover:border-accent">
                <ChevronRight size={18} />
              </button>
              <span className="absolute bottom-3 right-3 rounded-full bg-bg/70 px-2.5 py-1 text-xs text-muted backdrop-blur">
                {index + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-line px-5 py-3 md:px-8">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`h-12 w-20 shrink-0 overflow-hidden rounded-md border transition ${i === index ? 'border-accent' : 'border-line opacity-60 hover:opacity-100'}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        {/* Detalle */}
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="rounded-md border border-line px-3 py-1 text-xs uppercase tracking-wider text-accent">
                {project.category}
              </span>
            )}
            {project.internal && (
              <span className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1 text-xs text-muted">
                <Lock size={12} /> Aplicación interna
              </span>
            )}
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h2>
          {project.subtitle && <p className="mt-1 text-lg text-muted">{project.subtitle}</p>}
          {/* pre-line respeta los saltos de línea que se escriben en el admin (listas, párrafos) */}
          {texto && <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/85">{texto}</p>}

          {(project.objective || project.result) && (
            <div className="mt-6 grid gap-5 border-t border-line pt-6 text-sm md:grid-cols-2">
              {project.objective && (
                <div>
                  <p className="flex items-center gap-2 font-semibold text-accent"><Target size={16} /> Objetivo</p>
                  <p className="mt-2 leading-relaxed text-muted">{project.objective}</p>
                </div>
              )}
              {project.result && (
                <div>
                  <p className="flex items-center gap-2 font-semibold text-accent"><TrendingUp size={16} /> Resultado</p>
                  <p className="mt-2 leading-relaxed text-muted">{project.result}</p>
                </div>
              )}
            </div>
          )}

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

          {/* Una app interna no se puede visitar: se explica en lugar de mostrar un botón sin destino */}
          {project.internal && (
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-surface-2 p-4 text-sm">
              <Lock size={18} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-muted">
                <span className="font-semibold text-ink">Aplicación interna.</span> Es un sistema de uso privado del
                cliente, por eso no tiene una versión pública para visitar.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {project.url && !project.internal && (
              <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary justify-center">
                Ver proyecto <ArrowUpRight size={16} />
              </a>
            )}
            <Link to="/contacto" onClick={onClose} className="btn-ghost justify-center">
              <MessageSquare size={16} /> Quiero algo similar
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
