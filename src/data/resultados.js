// Línea de resultado que aparece en cada tarjeta del portafolio, por slug del proyecto.
// Los proyectos viven en la API; esto es sólo la frase corta y medible de cada uno.
// Mientras una entrada esté vacía o empiece por "TODO", la tarjeta no muestra la línea:
// no se publica ningún dato que no sea real.
export const resultados = {
  // TODO: resultado real de Hikaru (ej. "Lanzada en 3 semanas"). Revisa que el slug coincida con el del admin.
  hikaru: '',
  // TODO: resultado real de Vibes Plant
  vibes: '',
  // TODO: resultado real de Gellateria
  gellateria: '',
}

export const resultadoDe = (proyecto) => {
  const texto = resultados[proyecto?.slug] || ''
  return texto && !texto.startsWith('TODO') ? texto : ''
}
