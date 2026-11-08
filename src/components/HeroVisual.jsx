import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useApi } from '../hooks/useApi'
import { prefiereMenosMovimiento } from '../hooks/useMotion'
import { fallbackProjects } from '../data/fallback'
import { projectCover } from '../utils/format'

const IMAGEN_PROPIA = '/hero.webp'
const INTERVALO = 5000

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

// En móvil el mockup no rota: se muestra un solo proyecto y se ahorran descargas y movimiento
function useEscritorio() {
  const consulta = '(min-width: 768px)'
  const [es, setEs] = useState(() => typeof window !== 'undefined' && window.matchMedia(consulta).matches)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const cambiar = () => setEs(mq.matches)
    mq.addEventListener('change', cambiar)
    return () => mq.removeEventListener('change', cambiar)
  }, [])
  return es
}

// Pantalla de relleno cuando aún no hay portadas: un sitio esquemático con el color de marca
// Mientras la API responde, la misma pantalla late como esqueleto de carga.
const PantallaVacia = ({ compacta = false, cargando = false }) => (
  <div className={`flex h-full flex-col gap-3 bg-surface p-4 ${cargando ? 'esqueleto' : ''}`}>
    <div className="h-2.5 w-1/3 rounded-sm bg-ink/15" />
    <div className={`${compacta ? 'h-16' : 'h-24'} rounded-sm bg-menta-soft`} />
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-sm bg-ink/10" />)}
    </div>
    <div className="h-2 w-2/3 rounded-sm bg-ink/10" />
    <div className="h-2 w-1/2 rounded-sm bg-ink/10" />
  </div>
)

// Muestra la portada activa con un fundido entre una y otra. Sólo se montan las que pueden
// llegar a verse: en móvil, únicamente la primera.
const Pantalla = ({ portadas, activa, ancho, alt, compacta, cargando }) =>
  portadas.length ? (
    <div className="relative h-full">
      {portadas.map((src, i) => (
        <img
          key={src}
          src={optimizada(src, ancho)}
          alt={i === activa ? alt : ''}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchpriority={i === 0 ? 'high' : undefined}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${i === activa ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  ) : (
    <PantallaVacia compacta={compacta} cargando={cargando} />
  )

export default function HeroVisual() {
  const propia = useImagenPropia()
  const escritorio = useEscritorio()
  const { data, loading } = useApi(() => api.getProjects({ featured: 'true', limit: 3 }), fallbackProjects)
  // Mientras carga no se muestran los datos de respaldo (que no tienen capturas), sino el esqueleto.
  // Con la API de Render en plan gratis, la primera respuesta puede tardar si estaba dormida.
  const todos = loading ? [] : (data || []).filter((p) => projectCover(p)).slice(0, 3)
  const proyectos = escritorio ? todos : todos.slice(0, 1)
  const portadas = proyectos.map(projectCover)
  const [activa, setActiva] = useState(0)
  const [pausa, setPausa] = useState(false)

  useEffect(() => {
    if (portadas.length < 2 || pausa || prefiereMenosMovimiento()) return
    const id = setInterval(() => setActiva((i) => (i + 1) % portadas.length), INTERVALO)
    return () => clearInterval(id)
  }, [portadas.length, pausa])

  if (propia === 'si') {
    return (
      <div className="card aspect-[4/3] overflow-hidden">
        <img src={IMAGEN_PROPIA} alt="Proyectos de PandaX Code en laptop y celular" className="h-full w-full object-cover" />
      </div>
    )
  }

  const actual = activa % Math.max(portadas.length, 1)
  const proyecto = proyectos[actual]
  // El celular enseña la versión móvil (captura subida aparte en el admin). Una captura de
  // escritorio recortada a lo alto no representa el diseño responsive, así que si el proyecto
  // actual no la tiene se usa la de otro proyecto que sí, y si ninguno, una pantalla esquemática.
  const capturasMoviles = proyectos.map((p) => p.mobileCover).filter(Boolean)
  const movilActual = proyecto?.mobileCover
    ? capturasMoviles.indexOf(proyecto.mobileCover)
    : actual % Math.max(capturasMoviles.length, 1)

  return (
    <figure
      className="relative mx-auto w-full max-w-xl"
      aria-label="Proyectos recientes de PandaX Code"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onFocus={() => setPausa(true)}
      onBlur={() => setPausa(false)}
    >
      <div className="relative pb-8 pr-4 sm:pr-6">
        {/* Ventana de navegador */}
        <div className="card relative overflow-hidden shadow-2xl shadow-black/60">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
            {/* Botones de ventana en cuadrado y en los colores de la marca, no los de macOS */}
            <span className="h-2 w-2 bg-line" />
            <span className="h-2 w-2 bg-line" />
            <span className="h-2 w-2 bg-accent/70" />
            <span className="ml-3 truncate rounded-sm bg-bg px-3 py-1 font-mono text-[0.68rem] text-muted">
              {proyecto?.url ? proyecto.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'pandaxcode.com'}
            </span>
          </div>
          <div className="aspect-[16/10] bg-surface">
            <Pantalla portadas={portadas} activa={actual} ancho={1000} alt={proyecto ? `Proyecto ${proyecto.title}` : ''} cargando={loading} />
          </div>
        </div>

        {/* Celular superpuesto en la esquina */}
        <div className="absolute right-0 bottom-0 w-[26%] min-w-24 rounded-md border border-line bg-bg p-1.5 shadow-2xl shadow-black/70">
          <div className="mx-auto mb-1 h-1 w-8 bg-ink/20" />
          <div className="aspect-[9/19] overflow-hidden rounded-sm bg-surface">
            <Pantalla portadas={capturasMoviles} activa={movilActual} ancho={400} alt="" compacta cargando={loading} />
          </div>
        </div>
      </div>

      {/* Nombre del proyecto activo, debajo del mockup (o su esqueleto mientras carga) */}
      {loading && (
        <div className="esqueleto mt-4 flex items-center gap-3" aria-hidden>
          <span className="h-2 w-2 bg-line" />
          <span className="h-2.5 w-32 rounded-sm bg-line" />
        </div>
      )}
      {proyecto && (
        <figcaption className="mt-4 flex items-center gap-3 font-mono text-xs text-muted">
          <span className="h-2 w-2 bg-accent" aria-hidden />
          <span className="text-ink">{proyecto.title}</span>
          {proyecto.category && <span>/ {proyecto.category}</span>}
          {portadas.length > 1 && (
            <span className="ml-auto flex gap-1.5" aria-hidden>
              {portadas.map((_, i) => (
                <span key={i} className={`h-0.5 w-5 bg-accent transition-opacity ${i === actual ? 'opacity-100' : 'opacity-25'}`} />
              ))}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
