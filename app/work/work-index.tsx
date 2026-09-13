'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { projects, workFilters, type CategoryId } from '@/lib/content'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'

/* 'all' is a filter state, not a category — the canvas never links to it, but
   it is where the page starts and where the first chip goes. */
type Filter = CategoryId | 'all'

export function WorkIndex() {
  /* The canvas links straight into a category (/work?c=models), so the URL
     seeds the filter rather than the page always opening on All. An unknown
     or absent id falls back to All instead of showing nothing. */
  const param = useSearchParams().get('c')
  const fromUrl = workFilters.some((c) => c.id === param)
    ? (param as CategoryId)
    : 'all'
  const [filter, setFilter] = useState<Filter>(fromUrl)

  const shown = projects.filter(
    (p) => filter === 'all' || p.categories.includes(filter),
  )

  return (
    <>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects"
      >
        {([{ id: 'all' as const, label: 'All' }, ...workFilters]).map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150',
              filter === f.id
                ? 'border-border-strong bg-inverse text-on-inverse'
                : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
            )}
          >
            {f.label}
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
