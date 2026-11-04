import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useApi } from '../hooks/useApi'
import { fallbackProjects } from '../data/fallback'
import { projectCover } from '../utils/format'

const IMAGEN_PROPIA = '/hero.webp'
const INTERVALO = 4500

// Las portadas vienen de Cloudinary: se piden ya reducidas y en el mejor formato del navegador
const optimizada = (url, ancho) =>
  url?.includes('/upload/') ? url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${ancho}/`) : url

// Si existe public/hero.webp se usa esa imagen tal cual; si no, el mockup con los proyectos.
// Se comprueba cargándola en memoria para no pintar una imagen rota mientras tanto.
function useImagenPropia() {
  const [estado, setEstado] = useState('comprobando') // comprobando | si | no
  useEffect(() => {
    const img = new Image()
    img.onload = () => setEstado('si')
    img.onerror = () => setEstado('no')
    img.src = IMAGEN_PROPIA
  }, [])
  return estado
}

// Pantalla de relleno cuando aún no hay portadas: un sitio esquemático con el color de marca
const PantallaVacia = ({ compacta = false }) => (
  <div className="flex h-full flex-col gap-3 bg-gradient-to-br from-surface-2 to-accent/15 p-4">
    <div className="h-2.5 w-1/3 rounded-full bg-ink/20" />
    <div className={`${compacta ? 'h-16' : 'h-24'} rounded-lg bg-accent/25`} />
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-md bg-ink/10" />)}
    </div>
    <div className="h-2 w-2/3 rounded-full bg-ink/10" />
    <div className="h-2 w-1/2 rounded-full bg-ink/10" />
  </div>
)

// Muestra la portada activa con un fundido entre una y otra
const Pantalla = ({ portadas, activa, ancho, alt, compacta }) =>
  portadas.length ? (
    <div className="relative h-full">
      {portadas.map((src, i) => (
        <img
          key={src}
          src={optimizada(src, ancho)}
          alt={i === activa ? alt : ''}
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${i === activa ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  ) : (
    <PantallaVacia compacta={compacta} />
  )

export default function HeroVisual() {
  const propia = useImagenPropia()
  const { data } = useApi(() => api.getProjects({ featured: 'true', limit: 4 }), fallbackProjects)
  const proyectos = (data || []).filter((p) => projectCover(p))
  const portadas = proyectos.map(projectCover)
  const [activa, setActiva] = useState(0)

  // Rota las portadas salvo que el sistema pida menos movimiento
  useEffect(() => {
    if (portadas.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActiva((i) => (i + 1) % portadas.length), INTERVALO)
    return () => clearInterval(id)
  }, [portadas.length])

  if (propia === 'si') {
    return (
      <div className="card aspect-[4/3] overflow-hidden">
        <img src={IMAGEN_PROPIA} alt="Proyectos de PandaX Code en laptop y celular" className="h-full w-full object-cover" />
      </div>
    )
  }

  const actual = activa % Math.max(portadas.length, 1)
  // El celular muestra el siguiente proyecto para que se vean dos trabajos a la vez
  const enCelular = portadas.length > 1 ? (actual + 1) % portadas.length : actual
  const proyecto = proyectos[actual]

  return (
    <div className="relative mx-auto w-full max-w-xl pb-10 lg:pb-14" aria-label="Proyectos recientes de PandaX Code">
      {/* Halo de marca detrás de los dispositivos */}
      <div aria-hidden className="absolute inset-x-8 top-8 bottom-4 rounded-full bg-accent/20 blur-3xl" />

      {/* Ventana de navegador (laptop) */}
      <div className="card relative overflow-hidden shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md bg-bg/60 px-3 py-1 text-[0.7rem] text-muted">
            {proyecto?.url ? proyecto.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'pandaxcode.com'}
          </span>
        </div>
        <div className="aspect-[16/10] bg-surface-2">
          <Pantalla portadas={portadas} activa={actual} ancho={1000} alt={proyecto ? `Proyecto ${proyecto.title}` : ''} />
        </div>
      </div>

      {/* Celular superpuesto en la esquina */}
      <div className="absolute right-[-0.5rem] bottom-0 w-[26%] min-w-24 rounded-[1.4rem] border border-line bg-bg p-1.5 shadow-2xl shadow-black/60 sm:right-[-1.5rem]">
        <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-ink/20" />
        <div className="aspect-[9/19] overflow-hidden rounded-[1rem] bg-surface-2">
          <Pantalla portadas={portadas} activa={enCelular} ancho={400} alt="" compacta />
        </div>
      </div>

      {/* Nombre del proyecto que se está mostrando */}
      {proyecto && (
        <p className="absolute bottom-0 left-2 text-xs text-muted" aria-live="polite">
          <span className="text-accent">●</span> {proyecto.title}
          {proyecto.category && <span className="text-muted/70"> · {proyecto.category}</span>}
        </p>
      )}
    </div>
  )
}
