export default function SectionHeader({ eyebrow, title, highlight, description, center = true }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {title} {highlight && <span className="text-accent">{highlight}</span>}
      </h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  )
}
