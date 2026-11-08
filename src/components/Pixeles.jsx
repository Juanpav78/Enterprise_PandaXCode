import { useEnPantalla } from '../hooks/useMotion'

// Decoración pixel para romper el fondo plano entre secciones. Dos formas:
//  - BordePixel: el borde superior o inferior de una franja se desintegra en cuadrados (vertical)
//  - EsquinaPixel: una escalera de cuadrados que se dispersa en diagonal desde una esquina
// Los cuadrados caen en cascada cuando entran en pantalla (no al cargar la página). En móvil
// sólo queda un tercio (.pixel-extra) y con menos movimiento aparecen ya quietos.

const LADO = 16

// Pseudoaleatorio con semilla: el patrón es estable entre renders
function aleatorio(semilla) {
  let s = semilla
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

// Mientras el bloque no se ha visto, las animaciones esperan en pausa (incluido su retraso)
function useActivo() {
  const [ref, visto] = useEnPantalla()
  return [ref, visto ? '' : 'pixeles-espera']
}

const Cuadrados = ({ lista, color }) =>
  lista.map((c, i) => (
    <rect
      key={`${c.x}-${c.y}`}
      x={c.x}
      y={c.y}
      width={LADO}
      height={LADO}
      fill={color}
      className={`pixel ${i % 3 ? 'pixel-extra' : ''}`}
      style={{ animationDelay: `${c.retraso}ms` }}
    />
  ))

// ---------- Borde horizontal que se deshace hacia arriba o hacia abajo ----------
const COLUMNAS = 160 // 2560px: cubre pantallas anchas; lo que sobra se recorta
const DENSIDAD_BORDE = [0.88, 0.6, 0.36, 0.18, 0.07]

const patronBorde = (() => {
  const azar = aleatorio(11)
  const lista = []
  for (let col = 0; col < COLUMNAS; col++) {
    DENSIDAD_BORDE.forEach((p, fila) => {
      // fila 0 = pegada a la franja
      if (azar() < p) lista.push({ col, fila, retraso: col * 7 + fila * 60 })
    })
  }
  return lista
})()

const ALTO_BORDE = DENSIDAD_BORDE.length * LADO

export function BordePixel({ lado = 'arriba', color = 'var(--banda)', className = '' }) {
  const [ref, espera] = useActivo()
  const lista = patronBorde.map((c) => ({
    ...c,
    x: c.col * LADO,
    // Arriba: la fila 0 es la de abajo del SVG (tocando la franja); abajo, al revés
    y: lado === 'arriba' ? ALTO_BORDE - (c.fila + 1) * LADO : c.fila * LADO,
  }))
  return (
    <svg
      ref={ref}
      aria-hidden
      className={`pointer-events-none block w-full ${espera} ${className}`}
      height={ALTO_BORDE}
      shapeRendering="crispEdges"
    >
      <Cuadrados lista={lista} color={color} />
    </svg>
  )
}

// ---------- Esquina en diagonal ----------
const N = 9 // cuadrados por lado del triángulo

const patronEsquina = (() => {
  const azar = aleatorio(23)
  const lista = []
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      const d = x + y // distancia en diagonal a la esquina
      const p = d < 3 ? 1 : 1 - (d - 2) / (N - 1)
      if (p > 0 && azar() < p) lista.push({ x, y, retraso: d * 45 })
    }
  }
  return lista
})()

// esquina: 'tl' | 'tr' | 'bl' | 'br' (desde dónde nace la escalera)
export function EsquinaPixel({ esquina = 'tr', color = 'var(--menta-soft)', className = '' }) {
  const [ref, espera] = useActivo()
  const tam = N * LADO
  const derecha = esquina.includes('r')
  const abajo = esquina.includes('b')
  const lista = patronEsquina.map((c) => ({
    ...c,
    x: (derecha ? N - 1 - c.x : c.x) * LADO,
    y: (abajo ? N - 1 - c.y : c.y) * LADO,
  }))
  return (
    <svg
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${espera} ${className}`}
      width={tam}
      height={tam}
      shapeRendering="crispEdges"
    >
      <Cuadrados lista={lista} color={color} />
    </svg>
  )
}
