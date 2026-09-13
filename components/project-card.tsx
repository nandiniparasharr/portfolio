import Link from 'next/link'
import { Badge } from '@/components/ledger'
import { ProjectImage } from '@/components/project-image'
import type { Project } from '@/lib/content'

export function ProjectCard({
  project,
  showBlurb = false,
}: {
  project: Project
  showBlurb?: boolean
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col gap-2.5 border border-border bg-card p-5 no-underline shadow-card transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-pop"
    >
      <div className="font-mono text-label uppercase tracking-[0.12em] text-rose">
        Entry {project.num}
      </div>
      <div className="font-serif text-[1.2rem] leading-[1.2] text-foreground">
        {project.title}
      </div>
      {/* The thumbnail was over half the tile's height, so it carries most of
          the reduction. 21/9 crops harder than 16/10 — acceptable here because
          the card is a pointer, not the artefact: the case study shows the
          whole image, uncropped, at fit="contain". */}
      <ProjectImage
        src={project.image}
        alt={`${project.title} screenshot`}
        ratio="21/9"
      />
      {showBlurb && (
        <p className="m-0 text-sm text-muted-foreground">{project.blurb}</p>
      )}
      <div className="flex gap-1.5">
        {project.badges.map((b) => (
          <Badge key={b.label} tone={b.tone}>
            {b.label}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex justify-between gap-3 border-t border-border pt-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        <span>{project.stack}</span>
        <span className="whitespace-nowrap">
          Read <span className="np-arrow">→</span>
        </span>
      </div>
    </Link>
  )
}
