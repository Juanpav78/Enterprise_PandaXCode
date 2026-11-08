import { ArrowUpRight, Play, Shuffle, Timer } from 'lucide-react'
import { retos, GENERADOR_URL } from '../data/retos'
import { config } from '../config'
import PandaPixel from './PandaPixel'
import Reveal from './Reveal'

// Alturas de las casillas vacías: variadas para que el muro se lea como un tablero tipo
// Pinterest incluso antes de tener contenido. En móvil, más bajas: las columnas son estrechas.
const ALTURAS = [
  'h-40 sm:h-56', 'h-52 sm:h-72', 'h-32 sm:h-44', 'h-44 sm:h-64', 'h-36 sm:h-52',
  'h-56 sm:h-80', 'h-36 sm:h-48', 'h-44 sm:h-60', 'h-32 sm:h-40', 'h-48 sm:h-68',
]

const dos = (n) => String(n).padStart(2, '0')

// Etiqueta en pixel (Silkscreen): el único lugar de la web donde el pixel art tiene presencia
const EtiquetaPixel = ({ children, apagada = false }) => (
  <span
    className={`inline-block rounded-sm px-2 py-0.5 font-pixel text-[0.7rem] leading-tight ${apagada ? 'border border-line text-muted' : 'bg-menta-soft text-accent'}`}
  >
    {children}
  </span>
)

const TarjetaReto = ({ reto }) => (
  <article className="card overflow-hidden">
    {reto.imagen ? (
      <img src={reto.imagen} alt={`Landing del reto #${dos(reto.numero)}: ${reto.tematica}`} loading="lazy" className="w-full" />
    ) : (
      <div aria-hidden className="grid h-40 place-items-center border-b border-line">
        <PandaPixel size={56} />
      </div>
    )}
    <div className="p-4">
      <EtiquetaPixel>RETO #{dos(reto.numero)}</EtiquetaPixel>
      <h3 className="mt-3 font-semibold leading-snug">{reto.tematica}</h3>
      {reto.tiempo && (
        <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-muted">
          <Timer size={13} className="text-accent" /> {reto.tiempo}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
        {reto.video && (
          <a href={reto.video} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-accent hover:underline">
            <Play size={14} /> Video
          </a>
        )}
        {reto.demo && (
          <a href={reto.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-accent hover:underline">
            Demo <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  </article>
)

// Casilla del próximo reto: marco punteado vacío. La primera lleva la mascota esperando.
const CasillaVacia = ({ numero, altura, conMascota }) => (
  <div className={`flex ${altura} flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line p-4 text-center`}>
    {conMascota && <PandaPixel size={64} guinoCada={6000} />}
    <EtiquetaPixel apagada>RETO #{dos(numero)}</EtiquetaPixel>
    <p className="font-mono text-xs text-muted">{conMascota ? 'esperando temática…' : 'próximamente'}</p>
  </div>
)

/**
 * Muro de retos. Muestra los publicados y completa con casillas vacías hasta `minimo`,
 * así el tablero se ve con intención desde el primer día y se va llenando con cada reto.
 * Con el mínimo ya superado queda siempre una casilla libre: el "próximo reto".
 */
export default function MuroRetos({ minimo = 6 }) {
  const publicados = retos.filter((r) => r.listo).sort((a, b) => b.numero - a.numero)
  const siguiente = publicados.reduce((max, r) => Math.max(max, r.numero), 0) + 1
  const vacias = Math.max(minimo - publicados.length, 1)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-pixel text-sm text-muted">
          RETOS COMPLETADOS: <span className="text-accent">{dos(publicados.length)}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {GENERADOR_URL && (
            <a href={GENERADOR_URL} target="_blank" rel="noreferrer" className="btn-primary py-2!">
              <Shuffle size={16} /> Generar una temática
            </a>
          )}
          <a href={config.instagram} target="_blank" rel="noreferrer" className="btn-ghost py-2!">Instagram</a>
          {config.tiktok && (
            <a href={config.tiktok} target="_blank" rel="noreferrer" className="btn-ghost py-2!">TikTok</a>
          )}
          <a href={config.youtube} target="_blank" rel="noreferrer" className="btn-ghost py-2!">YouTube</a>
        </div>
      </div>

      {/* Columnas CSS: cada tarjeta conserva su alto y el muro se acomoda como un tablero */}
      <div className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-3">
        {publicados.map((reto, i) => (
          <Reveal key={reto.numero} delay={(i % 6) * 60} className="mb-3 break-inside-avoid sm:mb-4">
            <TarjetaReto reto={reto} />
          </Reveal>
        ))}
        {Array.from({ length: vacias }, (_, i) => (
          <Reveal key={`vacia-${i}`} delay={((publicados.length + i) % 6) * 60} className="mb-3 break-inside-avoid sm:mb-4">
            <CasillaVacia
              numero={siguiente + i}
              altura={ALTURAS[(publicados.length + i) % ALTURAS.length]}
              conMascota={i === 0}
            />
          </Reveal>
        ))}
      </div>
    </>
  )
}
