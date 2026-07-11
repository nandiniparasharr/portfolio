'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { skillGroups } from '@/lib/content'
import { SectionLabel } from '@/components/ledger'

const toneText = {
  rose: 'text-rose',
  plum: 'text-plum',
  forest: 'text-forest',
} as const

/** Skillset as a row of browser tabs — click around, one panel at a time. */
export function SkillsetTabs() {
  const [active, setActive] = useState(0)
  const isEgg = active === skillGroups.length
  const group = isEgg ? null : skillGroups[active]

  const onKeyDown = (e: React.KeyboardEvent) => {
    const max = skillGroups.length
    if (e.key === 'ArrowRight') setActive((a) => (a + 1) % (max + 1))
    if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + max + 1) % (max + 1))
  }

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Skillset"
        onKeyDown={onKeyDown}
        className="flex flex-wrap items-end gap-1"
      >
        {skillGroups.map((g, i) => (
          <button
            key={g.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              'relative -mb-px inline-flex items-center gap-2.5 border border-border px-5 font-serif text-[17px] transition-colors duration-150',
              active === i
                ? 'z-10 border-b-card bg-card py-3 text-foreground'
                : 'bg-sunken py-2.5 text-muted-foreground hover:text-foreground',
            )}
          >
            {g.title}
            <span aria-hidden="true" className="font-mono text-[11px] text-faint">
              ×
            </span>
          </button>
        ))}
        <button
          type="button"
          role="tab"
          aria-selected={isEgg}
          aria-label="New tab"
          onClick={() => setActive(skillGroups.length)}
          className={cn(
            'relative -mb-px inline-flex items-center border border-border px-4 font-mono text-base transition-colors duration-150',
            isEgg
              ? 'z-10 border-b-card bg-card py-3 text-foreground'
              : 'bg-sunken py-2.5 text-faint hover:text-foreground',
          )}
        >
          +
        </button>
      </div>

      <div
        role="tabpanel"
        key={active}
        className="np-page border border-border bg-card p-7 shadow-card"
      >
        {group ? (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className={cn('text-h3', toneText[group.tone])}>
                {group.title}
              </h3>
              <SectionLabel tone={group.tone}>
                0{active + 1}
              </SectionLabel>
            </div>
            <div className="mt-4 h-px bg-border" />
            <ul className="m-0 mt-2 list-none p-0">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 py-2.5 text-[15px] text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-none rounded-full bg-rose"
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-h3 text-faint">Untitled</h3>
              <SectionLabel tone="muted">
                0{skillGroups.length + 1}
              </SectionLabel>
            </div>
            <div className="mt-4 h-px bg-border" />
            <p className="m-0 mt-4 font-serif text-lg italic text-muted-foreground">
              Something new is always loading — ask me in a year.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
