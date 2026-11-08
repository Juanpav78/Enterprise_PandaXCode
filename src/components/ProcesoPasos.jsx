import { useEffect, useRef, useState } from 'react'
import { prefiereMenosMovimiento } from '../hooks/useMotion'

// Proceso de trabajo en 4 pasos. Una línea menta los une y se va llenando a medida que la
// sección sube por la pantalla; cada paso se "enciende" cuando la línea llega a él.
// Horizontal desde md, vertical en móvil.
export const pasos = [
  { n: '01', title: 'Descubrimiento', text: 'Conversamos sobre tu negocio y tus objetivos. Te envío alcance, tiempos y valor; con el anticipo arrancamos.' },
  { n: '02', title: 'Diseño', text: 'Diseño la experiencia y la ajustamos juntos antes de escribir una línea de código.' },
  { n: '03', title: 'Desarrollo', text: 'Construyo un sitio rápido, seguro y responsive, y te muestro avances.' },
  { n: '04', title: 'Lanzamiento y soporte', text: 'Publicamos, te enseño a usarlo y sigo disponible para soporte.' },
]

function useProgreso(ref) {
  const [progreso, setProgreso] = useState(() => (prefiereMenosMovimiento() ? 1 : 0))
  useEffect(() => {
    if (prefiereMenosMovimiento()) return
    let frame = 0
    const medir = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 cuando la sección asoma por abajo; 1 cuando su final pasa el 60 % de la pantalla
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.25)
      setProgreso(Math.min(1, Math.max(0, p)))
    }
    const pedir = () => { if (!frame) frame = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
      cancelAnimationFrame(frame)
    }
  }, [ref])
  return progreso
}

export default function ProcesoPasos() {
  const ref = useRef(null)
  const progreso = useProgreso(ref)
  // Los puntos están repartidos de forma uniforme a lo largo de la línea
  const encendido = (i) => progreso >= i / (pasos.length - 1) - 0.001

  return (
    <ol ref={ref} className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-0">
      {/* Escritorio: un riel del centro del primer punto al del último. Sin gap entre columnas,
          esos centros caen justo en 1/8 y 7/8 del ancho. */}
      <span aria-hidden className="absolute top-[11px] right-[12.5%] left-[12.5%] hidden h-0.5 bg-line md:block" />
      <span
        aria-hidden
        className="absolute top-[11px] right-[12.5%] left-[12.5%] hidden h-0.5 origin-left bg-accent md:block"
        style={{ transform: `scaleX(${progreso})` }}
      />
      {pasos.map((paso, i) => {
        // Móvil: cada paso tiene su tramo de línea hasta el siguiente y se llena con su parte
        const tramo = Math.min(1, Math.max(0, progreso * (pasos.length - 1) - i))
        return (
          <li key={paso.n} className="relative pl-10 md:px-3 md:pl-3 md:text-center">
            {i < pasos.length - 1 && (
              <>
                <span aria-hidden className="absolute top-6 -bottom-10 left-[11px] w-0.5 bg-line md:hidden" />
                <span
                  aria-hidden
                  className="absolute top-6 -bottom-10 left-[11px] w-0.5 origin-top bg-accent md:hidden"
                  style={{ transform: `scaleY(${tramo})` }}
                />
              </>
            )}
            <span
              aria-hidden
              className="absolute top-0 left-0 grid h-6 w-6 place-items-center rounded-sm border border-line bg-bg md:relative md:mx-auto"
            >
              <span className={`h-2.5 w-2.5 bg-accent transition-opacity duration-300 ${encendido(i) ? 'opacity-100' : 'opacity-0'}`} />
            </span>
            <p className="font-mono text-xs text-accent md:mt-5">{paso.n}</p>
            <h3 className="mt-1 font-semibold">{paso.title}</h3>
            <p className="mt-2 text-sm text-muted">{paso.text}</p>
          </li>
        )
      })}
    </ol>
  )
}
