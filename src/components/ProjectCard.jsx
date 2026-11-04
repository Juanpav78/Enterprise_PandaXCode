import { ArrowUpRight } from 'lucide-react'
import { projectCover } from '../utils/format'

export default function ProjectCard({ project, onOpen }) {
  const cover = projectCover(project)

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="card group block w-full overflow-hidden text-left transition hover:border-accent/40"
    >
      <div className="aspect-[16/10] overflow-hidden bg-surface-2">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-surface-2 to-accent/20 text-3xl font-semibold tracking-tight">
            {project.title}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-5">
        <div>
          {project.category && <p className="text-xs text-accent">{project.category}</p>}
          <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
        </div>
        <span className="flex items-center gap-1 text-sm text-accent">
          Ver <ArrowUpRight size={15} />
        </span>
      </div>
    </button>
  )
}
