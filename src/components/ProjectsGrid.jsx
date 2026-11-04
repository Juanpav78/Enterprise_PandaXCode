import { useMemo, useState } from 'react'
import { api } from '../api/client'
import { useApi } from '../hooks/useApi'
import { fallbackProjects } from '../data/fallback'
import { idOf } from '../utils/format'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

/**
 * Lista de proyectos con filtro por categoría y modal de detalle.
 * - limit: cuántos mostrar (en el inicio, 3)
 * - featured: pedir solo destacados
 * - filters: mostrar los botones de categoría
 */
export default function ProjectsGrid({ limit, featured = false, filters = false }) {
  const params = { ...(featured && { featured: true }), ...(limit && { limit }) }
  const { data, loading } = useApi(() => api.getProjects(params), fallbackProjects, [limit, featured])
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('Todos')

  const projects = data || []
  const categories = useMemo(
    () => ['Todos', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  )
  const visible = (category === 'Todos' ? projects : projects.filter((p) => p.category === category)).slice(
    0,
    limit || undefined
  )

  return (
    <>
      {filters && categories.length > 2 && (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                c === category ? 'border-accent bg-accent/10 text-accent' : 'border-line text-muted hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className={`mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? 'opacity-70' : ''}`}>
        {visible.map((p) => (
          <ProjectCard key={idOf(p)} project={p} onOpen={setSelected} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
