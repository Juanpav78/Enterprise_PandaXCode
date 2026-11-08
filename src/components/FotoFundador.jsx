import { useState } from 'react'

// WebP de 800px (≈70 KB): el marco se muestra a ~384px como máximo, así que cubre pantallas
// retina. Si se cambia la foto, conviene exportarla igual en vez de subir el original pesado.
const FOTO = '/img/fundador.webp'
const ANCHO = 800
const ALTO = 977

// Esquina superior derecha recortada en 3 escalones de 8px: el guiño pixel de la marca
const ESQUINA_PIXEL =
  'polygon(0 0, calc(100% - 24px) 0, calc(100% - 24px) 8px, calc(100% - 16px) 8px, calc(100% - 16px) 16px, calc(100% - 8px) 16px, calc(100% - 8px) 24px, 100% 24px, 100% 100%, 0 100%)'

export default function FotoFundador({ className = '' }) {
  const [hayFoto, setHayFoto] = useState(true)

  return (
    <div className={`relative ${className}`}>
      {/* Bloque desplazado detrás, con el mismo recorte, para dar profundidad sin sombras */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 bg-menta-soft" style={{ clipPath: ESQUINA_PIXEL }} />
      <div className="relative aspect-[4/5] overflow-hidden bg-surface" style={{ clipPath: ESQUINA_PIXEL }}>
        {hayFoto ? (
          <img
            src={FOTO}
            alt="Juan Alvarado, fundador de PandaX Code"
            width={ANCHO}
            height={ALTO}
            loading="lazy"
            onError={() => setHayFoto(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center border border-line" role="img" aria-label="Juan Alvarado, fundador de PandaX Code">
            <span className="font-display text-6xl font-bold tracking-tight text-accent">JA</span>
          </div>
        )}
      </div>
    </div>
  )
}
