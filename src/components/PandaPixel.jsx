import { useEffect, useState } from 'react'
import { prefiereMenosMovimiento } from '../hooks/useMotion'

// Mascota de la marca: un panda rojo en pixel art pintado con los colores de PandaX
// (menta, turquesa y nieve). Va siempre sobre --surface, nunca sobre menta o turquesa.
const MATRIZ = [
  '..WW........WW..',
  '.WDDW......WDDW.',
  '.WDDOOOOOOOODDW.',
  '..OOOOOOOOOOOO..',
  '.OOWWOOOOOOWWOO.',
  '.OOOOOOOOOOOOOO.',
  'OOWKKOOOOOOKKWOO',
  'OWWKKOOOOOOKKWWO',
  'OWWWROWWWWORWWWO',
  '.WWWRWWWWWWRWWW.',
  '..WWWWWKKWWWWW..',
  '...WWWWKKWWWW...',
  '....WWWWWWWW....',
]
// Guiño: en la fila 7 (índice 6) el ojo derecho se cierra
const FILA_GUINO = 'OOWKKOOOOOOOOWOO'

const COLORES = {
  W: 'var(--nieve)',
  D: 'var(--bosque)',
  O: 'var(--menta)',
  K: 'var(--surface)',
  R: 'var(--turquesa)',
}

// Un <rect> por tramo de pixeles iguales seguidos en la fila: muchos menos nodos que uno por pixel
function tramos(filas) {
  const rects = []
  filas.forEach((fila, y) => {
    let x = 0
    while (x < fila.length) {
      const c = fila[x]
      let fin = x
      while (fin + 1 < fila.length && fila[fin + 1] === c) fin++
      if (c !== '.') rects.push({ x, y, w: fin - x + 1, c })
      x = fin + 1
    }
  })
  return rects
}

const NORMAL = tramos(MATRIZ)
const GUINO = tramos(MATRIZ.map((f, i) => (i === 6 ? FILA_GUINO : f)))

/**
 * size: ancho en px (el alto se calcula con la proporción 16×13).
 * guinoCada: si se pasa (en ms), la mascota guiña el ojo cada ese tiempo.
 */
export default function PandaPixel({ size = 48, guinoCada, className = '', titulo }) {
  const [guino, setGuino] = useState(false)

  useEffect(() => {
    if (!guinoCada || prefiereMenosMovimiento()) return
    let cerrar
    const id = setInterval(() => {
      setGuino(true)
      cerrar = setTimeout(() => setGuino(false), 260)
    }, guinoCada)
    return () => {
      clearInterval(id)
      clearTimeout(cerrar)
    }
  }, [guinoCada])

  const rects = guino ? GUINO : NORMAL
  return (
    <svg
      viewBox="0 0 16 13"
      width={size}
      height={(size * 13) / 16}
      shapeRendering="crispEdges"
      className={className}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={COLORES[r.c]} />
      ))}
    </svg>
  )
}
