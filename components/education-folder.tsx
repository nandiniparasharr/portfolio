'use client'

import { useEffect, useId, useState } from 'react'
import { EducationCard } from '@/components/education-card'
import { education } from '@/lib/content'

/* The two credential cards live inside a folder. Closed, they peek above a
   translucent front lip that frosts whatever sits behind it; clicking brings
   them forward and fans them apart.

   Everything that moves is a transform or an opacity — the card layer is
   absolutely positioned, so opening costs no layout at all and the page never
   shifts. The only compositing expense is one backdrop-filter on the lip,
   dropped entirely on small screens. */

export type FolderVariant = 'ink' | 'plum' | 'paper'

export function EducationFolder({
  variant = 'ink',
}: {
  variant?: FolderVariant
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="np-folder-wrap">
      <div
        className="np-folder-stage"
        data-variant={variant}
        data-open={open || undefined}
      >
        <span className="np-folder-back" aria-hidden="true" />

        <div className="np-folder-cards" id={id}>
          {education.map((item, i) => (
            <div
              key={item.title}
              className="np-folder-card"
              style={{ ['--i' as string]: i }}
            >
              <EducationCard
                title={item.title}
                brand={item.brand}
                image={item.image}
                icon={item.icon}
                alt={`${item.title} — ${item.institution}`}
              />
            </div>
          ))}
        </div>

        <span className="np-folder-lip" aria-hidden="true" />

        <button
          type="button"
          className="np-folder-hit"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? 'Close the education folder' : 'Open the education folder'}
          </span>
        </button>
      </div>

      <p className="np-folder-hint" aria-hidden="true">
        {open ? 'Click the folder to close' : 'Click the folder to open'}
      </p>
    </div>
  )
}
