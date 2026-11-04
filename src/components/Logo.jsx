import { useState } from 'react'

// Pon tu logo en /public/logo.svg (o .png y cambia la ruta). Si no existe, se muestra solo el texto.
export default function Logo({ className = '' }) {
  const [hasImg, setHasImg] = useState(true)

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {hasImg && (
        <img src="/logo.svg" alt="" className="h-8 w-auto" onError={() => setHasImg(false)} />
      )}
      <span className="text-xl font-medium tracking-tight text-ink">PandaX Code</span>
    </span>
  )
}
