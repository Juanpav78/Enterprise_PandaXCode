// Titular que entra palabra por palabra (60 ms entre una y otra). La palabra destacada va en
// menta y con un subrayado que se dibuja cuando ya apareció. Los estilos están en index.css
// (.palabra, .palabra-destacada) y con menos movimiento se ve completo desde el inicio.
//
// partes: [{ texto, destacado? }]. Los lectores de pantalla reciben la frase entera en aria-label,
// no palabra por palabra.
// La puntuación final ("venden,") queda fuera del subrayado
const Destacada = ({ palabra }) => {
  const [, cuerpo, signo] = palabra.match(/^(.*?)([,.;:!?]*)$/)
  return (
    <>
      <span className="palabra-destacada text-accent">{cuerpo}</span>
      {signo}
    </>
  )
}

export default function TitularAnimado({ partes, className = '' }) {
  let i = 0
  const frase = partes.map((p) => p.texto).join(' ')

  return (
    <h1 className={className} aria-label={frase}>
      <span aria-hidden>
        {partes.map((parte, j) =>
          parte.texto.split(' ').map((palabra, k) => {
            const indice = i++
            return (
              <span key={`${j}-${k}`}>
                <span className="palabra" style={{ '--i': indice }}>
                  {parte.destacado ? <Destacada palabra={palabra} /> : palabra}
                </span>{' '}
              </span>
            )
          })
        )}
      </span>
    </h1>
  )
}
