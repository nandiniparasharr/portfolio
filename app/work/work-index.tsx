'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { projects, workFilters } from '@/lib/content'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'

export function WorkIndex() {
  const [filter, setFilter] = useState('All')
  const shown = projects.filter(
    (p) => filter === 'All' || p.badges.some((b) => b.label === filter),
  )

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {workFilters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150',
              filter === f
                ? 'border-border-strong bg-inverse text-on-inverse'
                : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        {shown.map((p, i) => (
          <Reveal key={`${filter}-${p.slug}`} delay={i * 80}>
            <ProjectCard project={p} showBlurb />
          </Reveal>
        ))}
      </div>
    </>
  )
}
