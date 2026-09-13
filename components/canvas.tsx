'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { EaselScene } from '@/components/easel-scene'
import { LongShort } from '@/components/long-short'
import { AllocationDonut } from '@/components/allocation-donut'
import { categories, projectsIn, type CategoryId } from '@/lib/content'

/* ------------------------------------------------------------------
   HOME
   Left: a wooden easel holding a canvas, painted by the girl beside it.
   Icon-sized artifacts sit on the canvas; each opens a panel.
   Right: the name. "Parashar" opens the About page.
   ------------------------------------------------------------------ */

type Obj = {
  id: string
  label: string
  /** position on the canvas face, % */
  x: number
  y: number
  blurb: string
  href?: string
  ready: boolean
  /** The work category this object opens. Absent on the quick links. */
  category?: CategoryId
  /** How many entries are filed under it. */
  count?: number
}

/* Where each category's object sits on the canvas face, in %. The objects are
   derived from the category list rather than restated here, so the canvas and
   the work filters can never fall out of step: this map holds only what the
   taxonomy itself does not know — a position. */
const PLACEMENT: Record<CategoryId, { x: number; y: number }> = {
  research: { x: 20, y: 15 },
  models: { x: 62, y: 12 },
  builds: { x: 30, y: 42 },
  essays: { x: 68, y: 45 },
  beauty: { x: 22, y: 72 },
  luxury: { x: 60, y: 74 },
}

/* `ready` is no longer a flag to remember to flip. An object is ready when its
   category actually holds published work — so writing the first essay lights
   the book up on the canvas and adds the Essays chip to /work, with nothing
   here to edit. */
const OBJECTS: Obj[] = categories.map((c) => {
  const entries = projectsIn(c.id)
  return {
    id: c.id,
    label: c.label,
    ...PLACEMENT[c.id],
    blurb: c.blurb,
    category: c.id,
    count: entries.length,
    ready: entries.length > 0,
  }
})

const LINKS: Obj[] = [
  { id: 'cv', label: 'CV', x: 0, y: 0, blurb: 'the short, formal version', href: '/NandiniParashar_CV.pdf', ready: true },
  { id: 'linkedin', label: 'LinkedIn', x: 0, y: 0, blurb: 'the professional record', href: 'https://www.linkedin.com/in/nandiniparashar/', ready: true },
  { id: 'contact', label: 'Contact', x: 0, y: 0, blurb: 'say hello', href: '/contact', ready: true },
]

/* ---------- the icons ----------
   Little coloured objects, not grey line art. The ground is deliberately
   quiet, so all the colour on the page lives here. */

function Icon({ id }: { id: string }) {
  switch (id) {
    case 'research': // a research note
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="9" y="5" width="27" height="38" rx="2" fill="#fff" stroke="#d9d5cb" strokeWidth="1.3" />
          <rect x="9" y="5" width="27" height="9" rx="2" fill="#3d5a99" />
          <rect x="13" y="19" width="19" height="2.2" rx="1.1" fill="#c9c5bb" />
          <rect x="13" y="24" width="14" height="2.2" rx="1.1" fill="#c9c5bb" />
          <rect x="13" y="31" width="4" height="8" rx="1" fill="#d33f5f" />
          <rect x="19" y="28" width="4" height="11" rx="1" fill="#e8a33d" />
          <rect x="25" y="33" width="4" height="6" rx="1" fill="#2a9d8f" />
        </svg>
      )
    case 'models': // a spreadsheet
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="5" y="9" width="38" height="30" rx="2.5" fill="#fff" stroke="#d9d5cb" strokeWidth="1.3" />
          <rect x="5" y="9" width="38" height="7" rx="2.5" fill="#2a9d8f" />
          <rect x="5" y="13.5" width="38" height="2.5" fill="#2a9d8f" />
          <path d="M17 16v23M29 16v23M5 24.5h38M5 32h38" stroke="#e2ded4" strokeWidth="1.2" />
          <rect x="18" y="17.5" width="10" height="6" fill="#cdeadb" />
          <rect x="30" y="25.5" width="12" height="6" fill="#f8d7d0" />
          <rect x="6" y="33" width="10" height="5" fill="#cdeadb" />
        </svg>
      )
    case 'builds': // performance chart
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="5" y="7" width="38" height="34" rx="2.5" fill="#fff" stroke="#d9d5cb" strokeWidth="1.3" />
          <rect x="11" y="24" width="6" height="12" rx="1.2" fill="#4361a8" />
          <rect x="21" y="17" width="6" height="19" rx="1.2" fill="#d33f5f" />
          <rect x="31" y="12" width="6" height="24" rx="1.2" fill="#e8a33d" />
          <path d="M11 21 L24 14 L37 8" stroke="#2a9d8f" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="37" cy="8" r="2.6" fill="#2a9d8f" />
        </svg>
      )
    case 'essays': // a book
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M11 6h24a2 2 0 0 1 2 2v34H13a2 2 0 0 1-2-2z" fill="#7b4b8a" />
          <path d="M11 38a2 2 0 0 1 2-2h24v6H13a2 2 0 0 1-2-2z" fill="#5f3a6b" />
          <rect x="11" y="6" width="5" height="36" fill="#5f3a6b" />
          <rect x="20" y="14" width="13" height="2.4" rx="1.2" fill="#e8d9ef" />
          <rect x="20" y="20" width="9" height="2.4" rx="1.2" fill="#e8d9ef" opacity="0.75" />
          <rect x="30" y="4" width="4" height="14" fill="#e8a33d" />
        </svg>
      )
    case 'beauty': // a lipstick
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="17" y="24" width="14" height="19" rx="2" fill="#d9a441" />
          <rect x="17" y="24" width="14" height="4" fill="#c08f2f" />
          <rect x="18.5" y="12" width="11" height="12" fill="#e7cf8f" />
          <path d="M18.5 13 L18.5 6.5 Q24 2.5 29.5 8 L29.5 13 Z" fill="#d33f5f" />
          <path d="M24 4.2 Q29.5 3.6 29.5 8 L29.5 13 L24 13 Z" fill="#b8304d" />
        </svg>
      )
    case 'luxury': // a handbag
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M15 17V13a9 9 0 0 1 18 0v4" stroke="#b07a3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M8 17h32l-2.6 24H10.6z" fill="#c98a45" />
          <path d="M8 17h32l-0.6 5.6H8.6z" fill="#e0a95f" />
          <rect x="21" y="25" width="6" height="7" rx="1.4" fill="#e8c76f" />
          <rect x="22.6" y="27" width="2.8" height="3" rx="0.8" fill="#a86f2e" />
        </svg>
      )
    default:
      return null
  }
}

/* ---------- page ---------- */

export function Canvas() {
  const [open, setOpen] = useState<Obj | null>(null)

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <div className="np-hero">
        {/* ---------------- left: the easel ---------------- */}
        <div className="np-easel-col">
          <div className="np-scene">
            <EaselScene />
            {/* artifacts, laid over the canvas face of the SVG */}
            <div className="np-board">
              {OBJECTS.map((o, i) => (
                <button
                  key={o.id}
                  type="button"
                  className="np-pin"
                  style={{ left: `${o.x}%`, top: `${o.y}%`, ['--i' as string]: i }}
                  onClick={() => setOpen(o)}
                  aria-label={o.label}
                >
                  <Icon id={o.id} />
                  <span className="np-pin-tip">{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- right: the name ---------------- */}
        <div className="np-idcol">
          <p className="np-id-role">Hi, I&apos;m</p>
          <h1 className="np-id-name">
            Nandini{' '}
            <Link href="/about" className="np-id-link">
              Parashar
            </Link>
          </h1>
          <p className="np-id-line">
            I analyse things for a living. And then, for fun, I analyse
            everything else.
          </p>
          <span className="np-id-bar" />
          <nav className="np-id-links" aria-label="Quick links">
            {LINKS.map((l) => {
              const external = l.href!.startsWith('http') || l.href!.endsWith('.pdf')
              return (
                <span key={l.id} className="np-quick">
                  {external ? (
                    <a className="np-quick-btn" href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  ) : (
                    <Link className="np-quick-btn" href={l.href!}>
                      {l.label}
                    </Link>
                  )}
                </span>
              )
            })}
          </nav>
        </div>
      </div>

      {/* ---------------- positions ----------------
           Under the name: the notebook of what she is long and short on,
           and where the hours actually go. */}
      <section className="np-positions" aria-label="Positions">
        <LongShort className="np-positions-notes" />
        <AllocationDonut />
      </section>

      {/* ---------------- mobile index ---------------- */}
      <div className="np-mobile-list">
        <ul>
          {[...OBJECTS, ...LINKS].map((o) => (
            <li key={o.id}>
              <button type="button" onClick={() => setOpen(o)}>
                <span className="np-list-label">{o.label}</span>
                <span className="np-list-blurb">{o.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------- panel ---------------- */}
      {open && (
        <div className="np-panel-scrim" onClick={() => setOpen(null)} role="presentation">
          <div
            className="np-panel"
            role="dialog"
            aria-modal="true"
            aria-label={open.label}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="np-panel-close"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <p className="np-panel-kicker">
              {open.category
                ? open.ready
                  ? `${open.count} ${open.count === 1 ? 'entry' : 'entries'}`
                  : 'In progress'
                : 'Link'}
            </p>
            <h2 className="np-panel-title">{open.label}</h2>
            <p className="np-panel-body">{open.blurb}</p>

            {!open.ready && (
              <p className="np-panel-stub">
                Content for this one is being written. It will land here shortly.
              </p>
            )}

            {/* A category with entries goes straight to that filter on /work.
                One with none keeps the stub rather than a link to an empty
                grid — the promise the object makes has to be one the page can
                keep. */}
            {open.category && open.ready && (
              <Link className="np-panel-cta" href={`/work?c=${open.category}`}>
                See the work →
              </Link>
            )}

            {open.href &&
              (open.href.startsWith('http') || open.href.endsWith('.pdf') ? (
                <a className="np-panel-cta" href={open.href} target="_blank" rel="noreferrer">
                  Open ↗
                </a>
              ) : (
                <Link className="np-panel-cta" href={open.href}>
                  Open →
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  )
}
