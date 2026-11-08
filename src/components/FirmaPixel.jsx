// Firma pixel: un bloque menta-soft cuyo borde izquierdo se "desintegra" en cuadrados cada vez
// más dispersos. Es decoración pura, en SVG para no cargar imágenes.

const LADO = 14 // tamaño de cada cuadrado, en px
const COLUMNAS = 6 // columnas de desintegración a la izquierda del bloque
const FILAS = 44 // suficientes para cubrir el alto del hero en escritorio
// Probabilidad de que haya cuadrado según lo lejos que esté del bloque (0 = pegado)
const DENSIDAD = [0.9, 0.68, 0.48, 0.3, 0.17, 0.08]

// Pseudoaleatorio con semilla: el patrón es siempre el mismo y no "salta" entre renders
function aleatorio(semilla) {
  let s = semilla
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const cuadrados = (() => {
  const azar = aleatorio(7)
  const lista = []
  for (let fila = 0; fila < FILAS; fila++) {
    for (let col = 0; col < COLUMNAS; col++) {
      if (azar() < DENSIDAD[col]) lista.push({ x: (COLUMNAS - 1 - col) * LADO, y: fila * LADO, col, fila })
    }
  }
  return lista
})()

const ANCHO_BORDE = COLUMNAS * LADO

export default function FirmaPixel({ className = '' }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="absolute inset-y-0 right-0 bg-menta-soft" style={{ left: ANCHO_BORDE }} />
      <svg className="absolute inset-y-0 left-0 h-full overflow-hidden" width={ANCHO_BORDE} shapeRendering="crispEdges">
        {cuadrados.map((c, i) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x}
            y={c.y}
            width={LADO}
            height={LADO}
            fill="var(--menta-soft)"
            // Uno de cada tres se queda en móvil; los demás se ocultan por CSS
            className={`pixel ${i % 3 ? 'pixel-extra' : ''}`}
            // El retraso sale de la posición (onda diagonal), no del índice: con ~110 cuadrados
            // un retraso por índice haría durar la cascada más de 2 s
            style={{ animationDelay: `${200 + (c.fila + c.col * 3) * 22}ms` }}
          />
        ))}
      </svg>
    </div>
  )
}
