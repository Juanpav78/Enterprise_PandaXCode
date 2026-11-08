import { useEffect, useState } from 'react'
import { useEnPantalla, prefiereMenosMovimiento } from '../hooks/useMotion'
import { formatCOP } from '../utils/format'

const DURACION = 900

// Cuenta de 0 al precio la primera vez que entra en pantalla. El texto final ocupa su sitio
// desde el principio (invisible), así el número que crece no empuja nada al cambiar de ancho.
export default function ContadorPrecio({ valor }) {
  const [ref, visto] = useEnPantalla()
  const [actual, setActual] = useState(() => (prefiereMenosMovimiento() ? valor : 0))

  useEffect(() => {
    if (!visto || prefiereMenosMovimiento()) {
      if (visto) setActual(valor)
      return
    }
    let frame
    const inicio = performance.now()
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / DURACION, 1)
      const suavizado = 1 - Math.pow(1 - t, 3)
      // Redondeado a miles para que no tiemble con cifras sueltas
      setActual(t < 1 ? Math.round((valor * suavizado) / 1000) * 1000 : valor)
      if (t < 1) frame = requestAnimationFrame(paso)
    }
    frame = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(frame)
  }, [visto, valor])

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="invisible">{formatCOP(valor)}</span>
      <span className="absolute inset-0" aria-hidden>{formatCOP(actual)}</span>
      <span className="sr-only">{formatCOP(valor)}</span>
    </span>
  )
}
