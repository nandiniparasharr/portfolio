'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------
   THE CANVAS
   A dot-grid surface with a fixed identity anchor and a scatter of
   objects. Clicking an object opens its panel.

   Objects carry placeholder bodies for now; real content drops into
   OBJECTS as it arrives.
   ------------------------------------------------------------------ */

type Kind = 'photo' | 'drawn' | 'tile'

type Obj = {
  id: string
  label: string
  kind: Kind
  /** desktop position, % of the canvas */
  x: number
  y: number
  /** width in container-query units (cqw) */
  w: number
  rot?: number
  /** what the panel says until the real content lands */
  blurb: string
  href?: string
  ready: boolean
}

const OBJECTS: Obj[] = [
  {
    id: 'research',
    label: 'Equity research',
    kind: 'photo',
    x: 46, y: 6, w: 18, rot: -2.4,
    blurb: 'Company profiles and research notes — the write-ups behind the models.',
    ready: false,
  },
  {
    id: 'model',
    label: 'Valuation models',
    kind: 'photo',
    x: 70, y: 27, w: 20, rot: 1.8,
    blurb: 'DCFs, unit economics and scenario work, with what each one concluded.',
    ready: false,
  },
  {
    id: 'prism',
    label: 'Portfolio Prism',
    kind: 'photo',
    x: 47, y: 44, w: 17, rot: 1.4,
    blurb: 'A robo-advisor model and risk analytics dashboard, built and shipped.',
    href: 'https://portfolio-prism.vercel.app',
    ready: false,
  },
  {
    id: 'essays',
    label: 'Archives by Nan',
    kind: 'photo',
    x: 29, y: 56, w: 15, rot: 2.6,
    blurb: 'Essays on markets, machines and the things I cannot stop analysing.',
    href: 'https://substack.com/@archivesbynan',
    ready: false,
  },
  {
    id: 'beauty',
    label: 'Beauty coverage',
    kind: 'drawn',
    x: 5, y: 56, w: 4.5,
    blurb: 'Consumer sector coverage — unit economics and brand equity, in lipstick.',
    ready: false,
  },
  {
    id: 'luxury',
    label: 'Luxury coverage',
    kind: 'drawn',
    x: 18, y: 69, w: 7,
    blurb: 'What a handbag costs to make, and what it costs to want.',
    ready: false,
  },
  {
    id: 'cv',
    label: 'CV',
    kind: 'tile',
    x: 46, y: 74, w: 0,
    rot: -1.2,
    blurb: 'The short, formal version.',
    href: '/NandiniParashar_CV.pdf',
    ready: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    kind: 'tile',
    x: 66, y: 78, w: 0,
    rot: 1.1,
    blurb: 'The professional record.',
    href: 'https://www.linkedin.com/in/nandiniparashar/',
    ready: true,
  },
]

/* ---------- object artwork ---------- */

function PhotoArt({ id }: { id: string }) {
  if (id === 'model') {
    return (
      <div className="np-cells">
        {Array.from({ length: 20 }).map((_, i) => (
          <i key={i} className={i < 5 ? 'hd' : i === 7 || i === 14 || i === 18 ? 'up' : i === 11 ? 'dn' : ''} />
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

/* ---------- the canvas ---------- */

export function Canvas() {
  const [open, setOpen] = useState<Obj | null>(null)
  const [listView, setListView] = useState(false)

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const anchor = (
    <div className="np-anchor">
      <p className="np-anchor-role">Equity research &amp; valuation</p>
      <h1 className="np-anchor-name">
        Nandini <em>Parashar</em>
      </h1>
      <p className="np-anchor-line">
        I analyse things for a living. And then, for fun, I analyse everything
        else.
      </p>
      <span className="np-anchor-bar" />
    </div>
  )

  return (
    <>
      <div className="np-canvas-wrap">
        {/* desktop: the spatial canvas */}
        <div className={cn('np-canvas', listView && 'is-hidden')}>
          {anchor}
          {OBJECTS.map((o) => (
            <button
              key={o.id}
              type="button"
              className={cn('np-obj', `np-obj-${o.kind}`)}
              style={{
                left: `${o.x}%`,
                top: `${o.y}%`,
                ['--w' as string]: o.w ? `${o.w}cqw` : 'auto',
                ['--rot' as string]: `${o.rot ?? 0}deg`,
              }}
              onClick={() => setOpen(o)}
              aria-label={`${o.label} — open`}
            >
              <span className="np-obj-art">
                {o.kind === 'photo' && <PhotoArt id={o.id} />}
                {o.kind === 'drawn' && <DrawnArt id={o.id} />}
                {o.kind === 'tile' && (
                  <span className="np-tile">
                    <span className="np-tile-dot" />
                    {o.label}
                  </span>
                )}
              </span>
              {o.kind !== 'tile' && <span className="np-obj-label">{o.label}</span>}
            </button>
          ))}
        </div>

        {/* the index — the escape hatch for anyone who doesn't want to explore */}
        <div className={cn('np-list', !listView && 'is-hidden')}>
          {anchor}
          <ul className="np-list-items">
            {OBJECTS.map((o) => (
              <li key={o.id}>
                <button type="button" onClick={() => setOpen(o)}>
                  <span className="np-list-label">{o.label}</span>
                  <span className="np-list-blurb">{o.blurb}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="np-view-toggle"
          onClick={() => setListView((v) => !v)}
        >
          {listView ? 'Canvas view' : 'Index view'}
        </button>
      </div>

      {/* panel */}
      {open && (
        <div className="np-panel-scrim" onClick={() => setOpen(null)} role="presentation">
          <div
            className="np-panel"
            role="dialog"
            aria-modal="true"
            aria-label={open.label}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="np-panel-close" onClick={() => setOpen(null)} aria-label="Close">
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
