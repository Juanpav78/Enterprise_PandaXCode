// Ilustración de la sección "Nosotros": logo del panda y nombre sobre un fondo de editor de
// código. Todo es HTML/CSS (sin imagen) y las animaciones viven en index.css (.nv-*), donde
// se desactivan si el sistema pide reducir el movimiento.

// Fragmentos de código de fondo, decorativos. Cada línea aparece con un pequeño retraso.
const lineas = [
  [['k', 'const '], ['v', 'pandax'], ['p', ' = '], ['k', 'new '], ['f', 'Studio'], ['p', '({']],
  [['p', '  diseño: '], ['s', "'estratégico'"], ['p', ',']],
  [['p', '  código: '], ['s', "'moderno'"], ['p', ',']],
  [['p', '  stack: ['], ['s', "'React'"], ['p', ', '], ['s', "'Node'"], ['p', ', '], ['s', "'Mongo'"], ['p', '],']],
  [['p', '})']],
  [],
  [['k', 'await '], ['v', 'pandax'], ['p', '.'], ['f', 'lanzar'], ['p', '(tuMarca)']],
]

const colores = { k: 'text-[#c792ea]', v: 'text-ink', f: 'text-accent', s: 'text-[#f5c26b]', p: 'text-muted' }

export default function NosotrosVisual() {
  return (
    <div className="card relative aspect-square overflow-hidden" role="img" aria-label="Logo de PandaX Code">
      {/* Rejilla de fondo que se desvanece hacia los bordes */}
      <div aria-hidden className="nv-rejilla absolute inset-0" />
      <div aria-hidden className="nv-halo absolute top-1/2 left-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />

      {/* Ventana de editor con el código, arriba a la izquierda */}
      <div aria-hidden className="absolute top-5 left-5 w-[78%] rounded-xl border border-line bg-bg/70 p-4 font-mono text-[0.62rem] leading-relaxed backdrop-blur-sm sm:text-[0.7rem]">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        {lineas.map((tokens, i) => (
          <p key={i} className="nv-linea min-h-[1.4em] whitespace-pre" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
            <span className="mr-3 select-none text-muted/40">{i + 1}</span>
            {tokens.map(([tipo, texto], j) => <span key={j} className={colores[tipo]}>{texto}</span>)}
            {i === lineas.length - 1 && <span className="nv-cursor ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-accent" />}
          </p>
        ))}
      </div>

      {/* Terminal pequeña abajo a la derecha */}
      {/* En móvil se oculta: el recuadro es pequeño y taparía el nombre */}
      <div aria-hidden className="nv-flota-lenta absolute right-5 bottom-5 hidden rounded-lg border border-line bg-bg/80 px-3 py-2 font-mono text-[0.62rem] text-muted backdrop-blur-sm sm:block sm:text-[0.68rem]">
        <span className="text-accent">$</span> npm run deploy <span className="text-accent">✓</span>
      </div>

      {/* Logo y nombre, al centro */}
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 pb-8 sm:justify-center sm:gap-4 sm:pt-16 sm:pb-0">
        <img src="/logo.svg" alt="" className="nv-flota w-20 drop-shadow-[0_0_30px_rgba(46,196,160,0.35)] sm:w-36" />
        <p className="rounded-full border border-line bg-bg/70 px-4 py-1.5 text-lg font-semibold sm:px-5 sm:py-2 tracking-tight backdrop-blur-sm sm:text-2xl">
          PandaX <span className="text-accent">Code</span>
        </p>
      </div>
    </div>
  )
}
