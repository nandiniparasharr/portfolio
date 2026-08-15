'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------
   THE EASEL
   Left half: a canvas standing on an easel, artifacts arranged on it,
   small link tiles resting on the ledge.
   Right half: the name. "Parashar" opens the About page.
   ------------------------------------------------------------------ */

type Kind = 'photo' | 'drawn'

type Obj = {
  id: string
  label: string
  kind: Kind
  /** position on the board, % */
  x: number
  y: number
  /** width in cqw, relative to the board */
  w: number
  rot?: number
  blurb: string
  href?: string
  ready: boolean
}

/** Artifacts pinned to the canvas. */
const OBJECTS: Obj[] = [
  {
    id: 'research',
    label: 'Research',
    kind: 'photo',
    x: 7, y: 8, w: 31, rot: -2.6,
    blurb: 'Company profiles and research notes — the write-ups behind the models.',
    ready: false,
  },
  {
    id: 'model',
    label: 'Models',
    kind: 'photo',
    x: 55, y: 11, w: 34, rot: 2,
    blurb: 'DCFs, unit economics and scenario work, with what each one concluded.',
    ready: false,
  },
  {
    id: 'prism',
    label: 'Portfolio Prism',
    kind: 'photo',
    x: 6, y: 47, w: 31, rot: 1.6,
    blurb: 'A robo-advisor model and risk analytics dashboard, built and shipped.',
    href: 'https://portfolio-prism.vercel.app',
    ready: false,
  },
  {
    id: 'essays',
    label: 'Essays',
    kind: 'photo',
    x: 58, y: 52, w: 30, rot: -1.8,
    blurb: 'Essays on markets, machines and the things I cannot stop analysing.',
    href: 'https://substack.com/@archivesbynan',
    ready: false,
  },
  {
    id: 'beauty',
    label: 'Beauty',
    kind: 'drawn',
    x: 45, y: 32, w: 8,
    blurb: 'Consumer sector coverage — unit economics and brand equity, in lipstick.',
    ready: false,
  },
  {
    id: 'luxury',
    label: 'Luxury',
    kind: 'drawn',
    x: 39, y: 66, w: 13,
    blurb: 'What a handbag costs to make, and what it costs to want.',
    ready: false,
  },
]

/** Small things resting on the easel ledge. */
const TILES: Obj[] = [
  {
    id: 'cv',
    label: 'CV',
    kind: 'drawn',
    x: 0, y: 0, w: 0,
    blurb: 'The short, formal version.',
    href: '/NandiniParashar_CV.pdf',
    ready: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    kind: 'drawn',
    x: 0, y: 0, w: 0,
    blurb: 'The professional record.',
    href: 'https://www.linkedin.com/in/nandiniparashar/',
    ready: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    kind: 'drawn',
    x: 0, y: 0, w: 0,
    blurb: 'Roles, collaborations, or a good book recommendation.',
    href: '/contact',
    ready: true,
  },
]

/* ---------- artwork ---------- */

function PhotoArt({ id }: { id: string }) {
  if (id === 'model') {
    return (
      <div className="np-cells">
        {Array.from({ length: 20 }).map((_, i) => (
          <i
            key={i}
            className={
              i < 5 ? 'hd' : i === 7 || i === 14 || i === 18 ? 'up' : i === 11 ? 'dn' : ''
            }
          />
        ))}
      </div>
    )
  }
  if (id === 'essays') {
    return (
      <div className="np-sheet-inner">
        {['m', '', 's', 'm', '', 's'].map((c, i) => (
          <span key={i} className={cn('np-ln', c)} />
        ))}
      </div>
    )
  }
  if (id === 'prism') {
    return (
      <div className="np-sheet-inner">
        <span className="np-ln-hd" />
        <div className="np-chart">
          {[38, 62, 48, 80, 58, 88].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="np-sheet-inner">
      <span className="np-ln-hd" />
      <span className="np-ln m" />
      <span className="np-ln" />
      <span className="np-ln s" />
      <div className="np-chart">
        {[42, 66, 51, 88, 72].map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

function DrawnArt({ id }: { id: string }) {
  if (id === 'luxury') {
    return (
      <svg viewBox="0 0 80 70" className="np-draw" aria-hidden="true">
        <path d="M24 30 V20 a16 16 0 0 1 32 0 V30" className="st" />
        <rect x="8" y="30" width="64" height="38" rx="3" className="fl" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 40 88" className="np-draw" aria-hidden="true">
      <rect x="9" y="40" width="22" height="44" rx="2" className="fl-2" />
      <rect x="12" y="14" width="16" height="28" rx="2" className="fl" />
      <path d="M12 16 L12 6 Q20 0 28 8 L28 16 Z" className="fl" />
    </svg>
  )
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

  const all = [...OBJECTS, ...TILES]

  return (
    <>
      <div className="np-hero">
        {/* ---------------- left: the easel ---------------- */}
        <div className="np-easel-col">
          <div className="np-easel">
            <span className="np-leg np-leg-l" aria-hidden="true" />
            <span className="np-leg np-leg-r" aria-hidden="true" />

            <div className="np-board">
              {OBJECTS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={cn('np-obj', `np-obj-${o.kind}`)}
                  style={{
                    left: `${o.x}%`,
                    top: `${o.y}%`,
                    ['--w' as string]: `${o.w}cqw`,
                    ['--rot' as string]: `${o.rot ?? 0}deg`,
                  }}
                  onClick={() => setOpen(o)}
                  aria-label={`${o.label} — open`}
                >
                  <span className="np-obj-art">
                    {o.kind === 'photo' ? <PhotoArt id={o.id} /> : <DrawnArt id={o.id} />}
                  </span>
                  <span className="np-obj-label">{o.label}</span>
                </button>
              ))}
            </div>

            {/* the ledge, and the small things resting on it */}
            <div className="np-ledge" aria-hidden="true" />
            <div className="np-tray">
              {TILES.map((t) => (
                <button key={t.id} type="button" className="np-tile" onClick={() => setOpen(t)}>
                  <span className="np-tile-dot" />
                  {t.label}
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
          <p className="np-id-hint">
            Tap anything on the canvas — or start with{' '}
            <Link href="/about">the story</Link>.
          </p>
        </div>
      </div>

      {/* ---------------- mobile index ---------------- */}
      <div className="np-mobile-list">
        <ul>
          {all.map((o) => (
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
