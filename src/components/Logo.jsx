import { useState } from 'react'

// Logo del panda de PandaX en /public/logo.svg (versión blanca, para el fondo oscuro del sitio).
// Si el archivo faltara, se muestra sólo el texto para que la marca nunca quede vacía.
export default function Logo({ className = '' }) {
  const [hasImg, setHasImg] = useState(true)

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {hasImg && (
        <img src="/logo.svg" alt="" className="h-8 w-auto" onError={() => setHasImg(false)} />
      )}
      <span className="text-xl font-medium tracking-tight text-ink">PandaX <span className="text-accent">Code</span></span>
    </span>
  )
}
