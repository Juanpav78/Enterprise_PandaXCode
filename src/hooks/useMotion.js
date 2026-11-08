import { useEffect, useRef, useState } from 'react'

// Lo que se anima con JavaScript (rotaciones, contadores, guiños) consulta esto: el CSS ya
// apaga sus propias animaciones, pero un setInterval no se entera de la preferencia.
export const prefiereMenosMovimiento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Un único observador para toda la página en vez de uno por elemento
let observador = null
const avisos = new WeakMap()

function observar(el, alVer) {
  if (typeof IntersectionObserver === 'undefined') {
    alVer()
    return () => {}
  }
  if (!observador) {
    observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return
          avisos.get(e.target)?.()
          // Sólo la primera vez: después se deja de vigilar
          observador.unobserve(e.target)
          avisos.delete(e.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    )
  }
  avisos.set(el, alVer)
  observador.observe(el)
  return () => {
    observador.unobserve(el)
    avisos.delete(el)
  }
}

// Devuelve [ref, visto]: visto pasa a true la primera vez que el elemento entra en pantalla
export function useEnPantalla() {
  const ref = useRef(null)
  const [visto, setVisto] = useState(false)
  useEffect(() => {
    if (!ref.current || visto) return
    return observar(ref.current, () => setVisto(true))
  }, [visto])
  return [ref, visto]
}
