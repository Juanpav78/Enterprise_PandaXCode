const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export const formatCOP = (value) => (typeof value === 'number' ? cop.format(value) : value)

// Toma la primera imagen disponible de un proyecto, sin importar cómo la guarde el backend
export const projectCover = (project) =>
  project?.cover || project?.coverImage || project?.images?.[0]?.url || project?.images?.[0] || null

export const projectImages = (project) => {
  const imgs = project?.images || []
  const list = imgs.map((img) => (typeof img === 'string' ? img : img?.url)).filter(Boolean)
  const cover = project?.cover || project?.coverImage
  return cover && !list.includes(cover) ? [cover, ...list] : list
}

export const idOf = (item) => item?._id || item?.id || item?.slug
