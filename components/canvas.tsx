'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { EaselScene } from '@/components/easel-scene'

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
}

const OBJECTS: Obj[] = [
  {
    id: 'research',
    label: 'Research',
    x: 20, y: 15,
    blurb: 'Company profiles and research notes — the write-ups behind the models.',
    ready: false,
  },
  {
    id: 'model',
    label: 'Models',
    x: 62, y: 12,
    blurb: 'DCFs, unit economics and scenario work, with what each one concluded.',
    ready: false,
  },
  {
    id: 'prism',
    label: 'Portfolio Prism',
    x: 30, y: 42,
    blurb: 'A robo-advisor model and risk analytics dashboard, built and shipped.',
    href: 'https://portfolio-prism.vercel.app',
    ready: false,
  },
  {
    id: 'essays',
    label: 'Essays',
    x: 68, y: 45,
    blurb: 'Essays on markets, machines and the things I cannot stop analysing.',
    href: 'https://substack.com/@archivesbynan',
    ready: false,
  },
  {
    id: 'beauty',
    label: 'Beauty',
    x: 22, y: 72,
    blurb: 'Consumer sector coverage — unit economics and brand equity, in lipstick.',
    ready: false,
  },
  {
    id: 'luxury',
    label: 'Luxury',
    x: 60, y: 74,
    blurb: 'What a handbag costs to make, and what it costs to want.',
    ready: false,
  },
]

const LINKS: Obj[] = [
  { id: 'cv', label: 'CV', x: 0, y: 0, blurb: 'The short, formal version.', href: '/NandiniParashar_CV.pdf', ready: true },
  { id: 'linkedin', label: 'LinkedIn', x: 0, y: 0, blurb: 'The professional record.', href: 'https://www.linkedin.com/in/nandiniparashar/', ready: true },
  { id: 'contact', label: 'Contact', x: 0, y: 0, blurb: 'Roles, collaborations, or a good book recommendation.', href: '/contact', ready: true },
]

/* ---------- the icons ---------- */

function Icon({ id }: { id: string }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'research':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3h8l4 4v14H6z" {...s} />
          <path d="M14 3v4h4" {...s} />
          <path d="M9 12h6M9 15h6M9 18h3" {...s} />
        </svg>
      )
    case 'model':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" {...s} />
          <path d="M3 9h18M3 14.5h18M9 9v11M15 9v11" {...s} />
        </svg>
      )
    case 'prism':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 20h18" {...s} />
          <rect x="5" y="12" width="3.4" height="8" {...s} />
          <rect x="10.3" y="7" width="3.4" height="13" {...s} />
          <rect x="15.6" y="4" width="3.4" height="16" {...s} />
        </svg>
      )
    case 'essays':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19.5V5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v15H6a2 2 0 0 1-2-2Z" {...s} />
          <path d="M4 19.5A2 2 0 0 1 6 18h13" {...s} />
          <path d="M8.5 8h7M8.5 11.5h5" {...s} />
        </svg>
      )
    case 'beauty':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="8" y="12" width="8" height="9" {...s} />
          <path d="M9.6 12V7.2q0-2.4 2.4-2.4t2.4 2.4V12" {...s} />
          <path d="M8 15.5h8" {...s} />
        </svg>
      )
    case 'luxury':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9h16l-1.2 11H5.2z" {...s} />
          <path d="M8.6 9V7a3.4 3.4 0 0 1 6.8 0v2" {...s} />
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
              {OBJECTS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className="np-pin"
                  style={{ left: `${o.x}%`, top: `${o.y}%` }}
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
          <p className="np-id-role">Equity research &amp; valuation</p>
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
            {LINKS.map((l) => (
              <button key={l.id} type="button" onClick={() => setOpen(l)}>
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

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
            <p className="np-panel-kicker">{open.ready ? 'Link' : 'In progress'}</p>
            <h2 className="np-panel-title">{open.label}</h2>
            <p className="np-panel-body">{open.blurb}</p>

            {!open.ready && (
              <p className="np-panel-stub">
                Content for this one is being written. It will land here shortly.
              </p>
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
