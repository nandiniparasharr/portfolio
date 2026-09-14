'use client'

import { useRef, useState, type ReactNode } from 'react'

/* ------------------------------------------------------------------
   THE BRAIN
   A filled doodle: pale rose body, deeper rose outline, folds drawn over
   the fill, and a dotted line down the middle dividing left from right.
   The things she actually uses sit on top, and can be picked up and moved.

   Viewed from above rather than side-on. A side profile is the prettier
   drawing, but only this angle has a left and a right half to divide,
   which is the whole point of the piece.

   Colour comes from the site's own tokens, so it follows the theme with
   no palette of its own: --np-rose-tint is the body, --np-rose the line.
   ------------------------------------------------------------------ */

/* Line weights, in viewBox units. The drawing renders about 1.7x, so a
   width of 3 lands near 5px on screen. Kept together and named because
   they are the first thing to reach for when the drawing reads too heavy
   or too faint: outline slightly above folds, folds above the divide. */
const W_OUTLINE = 3
const W_FOLD = 2.4
const W_DIVIDE = 2.2

/** The silhouette of one hemisphere, drawn in the left half's coordinates.
    Shared by both halves, and by the hit test that keeps icons on the
    brain rather than floating off the side of it. */
const BODY_D = `M200 42
  C174 34 148 40 138 60
  C112 48 86 62 88 84
  C62 84 46 104 54 124
  C34 138 36 164 56 174
  C46 194 58 216 80 220
  C84 240 104 252 126 246
  C142 258 166 260 180 250
  C188 258 194 262 200 262`

/* 'centre' is not a half. It is for the things that belong to both, and it
   is allowed to sit across the divide and roam the whole brain. */
type Side = 'left' | 'right' | 'centre'

type IconSpec = {
  id: string
  side: Side
  label: string
  /** starting centre, in viewBox units */
  x: number
  y: number
  /** optical size adjustment, for logos that read large or small at the
      same box size — a tall calculator against a round mark, say */
  scale?: number
  /** a file under /public/brain, for the ones that arrived as artwork */
  src?: string
  /** or a drawing, for the marks simple enough to be geometry and for the
      things that have no logo at all. Vector costs nothing and stays sharp
      at any size; `vw`/`vh` are the drawing's own coordinate space. */
  draw?: { vw: number; vh: number; node: ReactNode }
}

/* Excel and YouTube are the real marks, rasterised from their own artwork.
   The chai is drawn, because a kulhad does not have a logo. */
const KULHAD = {
  vw: 100,
  vh: 100,
  node: (
    <>
      {/* steam, drawn first so the cup covers where it meets the chai */}
      <g
        stroke="#c9a88f"
        strokeWidth={3.4}
        fill="none"
        strokeLinecap="round"
        opacity={0.8}
      >
        <path d="M42 30 C37 23 46 19 41 12" />
        <path d="M58 32 C53 25 62 21 57 14" />
      </g>
      {/* the clay body, tapered the way a kulhad is */}
      <path d="M26 45 L34 86 Q35 91 40 91 L60 91 Q65 91 66 86 L74 45 Z" fill="#b5714a" />
      {/* the side the light is on */}
      <path d="M26 45 L34 86 Q35 91 40 91 L47 91 L41 45 Z" fill="#c4825a" />
      <ellipse cx={50} cy={45} rx={24} ry={7.4} fill="#97583a" />
      <ellipse cx={50} cy={45.6} rx={19} ry={5.4} fill="#d8a871" />
    </>
  ),
}

/* Left is the trained half, right is the rest of her. The split comes from
   the folders the icons arrived in, and it is why an icon cannot be dragged
   across the divide: the two sides mean different things. */
const ICONS: IconSpec[] = [
  { id: 'excel', side: 'left', src: '/brain/left/excel.png', label: 'Excel', x: 91, y: 86, scale: 0.92 },
  { id: 'ba2', side: 'left', src: '/brain/left/ba2-plus.png', label: 'BA II Plus calculator', x: 148, y: 129, scale: 1.35 },
  { id: 'tradingview', side: 'left', src: '/brain/left/tradingview.png', label: 'TradingView', x: 128, y: 150 },
  { id: 'claude', side: 'left', src: '/brain/left/claude.png', label: 'Claude', x: 72, y: 201 },
  { id: 'python', side: 'left', src: '/brain/left/python.png', label: 'Python', x: 99, y: 192 },
  { id: 'wsj', side: 'left', src: '/brain/left/wsj.png', label: 'The Wall Street Journal', x: 98, y: 213 },
  /* A cover, not a cut-out: its own ground is white, so there was nothing to
     knock out without eating into the page. The icon's drop shadow gives the
     rectangle its edge against the pink. */
  { id: 'psychology', side: 'left', src: '/brain/left/psychology-of-money.png', label: 'The Psychology of Money', x: 72, y: 150, scale: 1.08 },
  /* The three app tiles are square marks with no padding of their own, so at
     the shared box size they read a size larger than the logos beside them. */
  { id: 'instagram', side: 'right', src: '/brain/right/instagram.png', label: 'Instagram', x: 220, y: 53, scale: 0.85 },
  { id: 'notion', side: 'right', src: '/brain/right/notion.png', label: 'Notion', x: 246, y: 59, scale: 0.85 },
  { id: 'pinterest', side: 'right', src: '/brain/right/pinterest.png', label: 'Pinterest', x: 225, y: 75, scale: 0.85 },
  { id: 'youtube', side: 'right', src: '/brain/right/youtube.png', label: 'YouTube', x: 271, y: 149 },
  { id: 'kulhad', side: 'centre', draw: KULHAD, label: 'A kulhad of chai', x: 200, y: 200, scale: 1.31 },
]

/** Box an icon is drawn into, in viewBox units. Aspect is preserved inside
    it, so a wide wordmark and a tall calculator both stay honest. */
const ICON = 34
/** Pointer travel before a press counts as a drag. */
const SLOP = 3

type Drag = {
  id: string
  side: Side
  /** where on the icon it was picked up, so it does not jump to centre */
  dx: number
  dy: number
  fromX: number
  fromY: number
  x: number
  y: number
}

/** One hemisphere. `side` mirrors the same geometry rather than restating
    it, so the halves stay symmetrical by construction. */
function Hemisphere({
  side,
  bodyRef,
}: {
  side: Side
  bodyRef?: React.Ref<SVGPathElement>
}) {
  const flip = side === 'right'
  return (
    <g
      /* the mirror pivots on the midline at x=200 */
      transform={flip ? 'translate(400 0) scale(-1 1)' : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Body. The path is left open at the midline on purpose: SVG fills an
          open subpath as though it were closed, but strokes only the segments
          actually drawn. So one element gives a filled half with an outline
          around the outside and nothing down the centre, leaving the middle
          clear for the dotted divide. */}
      <path
        ref={bodyRef}
        fill="var(--brain-body, var(--np-rose-tint))"
        stroke="var(--brain-line, var(--np-rose))"
        strokeWidth={W_OUTLINE}
        d={BODY_D}
      />

      {/* Folds, over the fill. Thinner than the outline, the way the gyri sit
          inside the silhouette in the reference. Each stops well short of
          x=200: drawn to the midline, mirroring closes every pair into a ring
          straddling the divide, and the whole thing reads as a tree. */}
      <g
        fill="none"
        stroke="var(--brain-line, var(--np-rose))"
        strokeWidth={W_FOLD}
      >
        <path d="M182 72 C152 74 136 92 144 110 C150 124 170 128 182 120" />
        <path d="M182 142 C150 138 122 152 122 174 C122 192 142 204 162 200" />
        <path d="M178 213 C154 213 136 223 139 235" />
        <path d="M160 56 C140 58 128 68 126 82" />
        <path d="M100 112 C92 126 96 142 108 150" />
        <path d="M82 180 C74 194 80 210 92 216" />
        <path d="M64 138 C56 147 56 159 64 168" />
        <path d="M114 226 C126 234 140 236 152 230" />
      </g>
    </g>
  )
}

export function Brain({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  /* The left half's own outline, used as the hit test. Both halves share one
     path, so the right one is tested by mirroring the point instead. */
  const bodyRef = useRef<SVGPathElement>(null)
  const drag = useRef<Drag | null>(null)
  const moved = useRef(false)

  const [pos, setPos] = useState(() =>
    Object.fromEntries(ICONS.map((i) => [i.id, { x: i.x, y: i.y }])),
  )

  /** Screen point to viewBox point. The SVG carries no transform of its own,
      so the browser's own matrix is exact and there is nothing to solve. */
  const toLocal = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    const m = svg?.getScreenCTM()
    if (!m) return null
    return new DOMPoint(clientX, clientY).matrixTransform(m.inverse())
  }

  /** Would the icon still sit on the brain, on its own side, if it were
      centred here? Tested against the real silhouette rather than a
      bounding box, so an icon cannot be parked on a lobe's shoulder. */
  const fits = (side: Side, x: number, y: number) => {
    const body = bodyRef.current
    if (!body) return false
    const r = ICON * 0.42
    /* One path is stored, in the left half's coordinates. A point on the
       right is tested by mirroring it; a point belonging to neither half is
       inside if either test passes, which is the union of the two, which is
       the whole brain. */
    const on = (px: number, py: number) => {
      if (side !== 'right' && body.isPointInFill(new DOMPoint(px, py))) return true
      if (side !== 'left' && body.isPointInFill(new DOMPoint(400 - px, py))) return true
      return false
    }
    return [
      [0, 0],
      [r, 0],
      [-r, 0],
      [0, r],
      [0, -r],
    ].every(([ox, oy]) => on(x + ox, y + oy))
  }

  const nudge = (icon: IconSpec, dx: number, dy: number) =>
    setPos((s) => {
      const next = { x: s[icon.id].x + dx, y: s[icon.id].y + dy }
      return fits(icon.side, next.x, next.y) ? { ...s, [icon.id]: next } : s
    })

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 320"
      className={className}
      role="img"
      aria-label="A brain, divided down the middle. The left half holds Claude, Python, the Wall Street Journal, a copy of The Psychology of Money, TradingView, a BA II Plus calculator and Excel. The right half holds Instagram, Notion, Pinterest and YouTube. A kulhad of chai sits on the divide, belonging to both."
    >
      {/* the doodle floats, so it gets a shadow to sit on */}
      <ellipse
        cx={200}
        cy={284}
        rx={96}
        ry={10}
        fill="var(--brain-line, var(--np-rose))"
        opacity={0.1}
      />

      <Hemisphere side="left" bodyRef={bodyRef} />
      <Hemisphere side="right" />

      {/* The divide. Over both halves, and dotted so it reads as a notional
          split rather than another fold. Under the icons, so a dragged icon
          passes over it rather than behind. */}
      <line
        x1={200}
        y1={44}
        x2={200}
        y2={258}
        stroke="var(--brain-line, var(--np-rose))"
        strokeWidth={W_DIVIDE}
        strokeLinecap="round"
        strokeDasharray="0.1 12"
        opacity={0.85}
      />

      {ICONS.map((icon) => {
        const at = pos[icon.id]
        const size = ICON * (icon.scale ?? 1)
        return (
          <g
            key={icon.id}
            className="np-brain-icon"
            role="button"
            tabIndex={0}
            aria-label={`${icon.label}. Drag to move it, or use the arrow keys.`}
            onPointerDown={(e) => {
              if (e.pointerType === 'mouse' && e.button !== 0) return
              const p = toLocal(e.clientX, e.clientY)
              if (!p) return
              drag.current = {
                id: icon.id,
                side: icon.side,
                dx: at.x - p.x,
                dy: at.y - p.y,
                fromX: e.clientX,
                fromY: e.clientY,
                x: at.x,
                y: at.y,
              }
              moved.current = false
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              const d = drag.current
              if (!d || d.id !== icon.id) return
              if (!moved.current) {
                if (Math.hypot(e.clientX - d.fromX, e.clientY - d.fromY) <= SLOP)
                  return
                moved.current = true
                e.currentTarget.classList.add('is-dragging')
              }
              const p = toLocal(e.clientX, e.clientY)
              if (!p) return
              const nx = p.x + d.dx
              const ny = p.y + d.dy
              /* Only follow while the icon would still be on its own half.
                 Refusing the step rather than clamping means it slides along
                 the outline instead of sticking to a box corner. */
              if (!fits(d.side, nx, d.y) && !fits(d.side, d.x, ny)) return
              if (fits(d.side, nx, d.y)) d.x = nx
              if (fits(d.side, d.x, ny)) d.y = ny
              e.currentTarget.setAttribute(
                'transform',
                `translate(${d.x - at.x} ${d.y - at.y})`,
              )
            }}
            onPointerUp={(e) => {
              const d = drag.current
              if (!d || d.id !== icon.id) return
              drag.current = null
              e.currentTarget.classList.remove('is-dragging')
              e.currentTarget.removeAttribute('transform')
              if (moved.current) {
                setPos((s) => ({ ...s, [icon.id]: { x: d.x, y: d.y } }))
              }
            }}
            onPointerCancel={(e) => {
              drag.current = null
              e.currentTarget.classList.remove('is-dragging')
              e.currentTarget.removeAttribute('transform')
            }}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 8 : 3
              const by: Record<string, [number, number]> = {
                ArrowLeft: [-step, 0],
                ArrowRight: [step, 0],
                ArrowUp: [0, -step],
                ArrowDown: [0, step],
              }
              const d = by[e.key]
              if (!d) return
              e.preventDefault()
              nudge(icon, d[0], d[1])
            }}
          >
            {icon.src ? (
              <image
                href={icon.src}
                x={at.x - size / 2}
                y={at.y - size / 2}
                width={size}
                height={size}
                /* default preserveAspectRatio: a wide wordmark and a tall
                   calculator both fit the box without being squashed */
              />
            ) : (
              <svg
                x={at.x - size / 2}
                y={at.y - size / 2}
                width={size}
                height={size}
                viewBox={`0 0 ${icon.draw!.vw} ${icon.draw!.vh}`}
                overflow="visible"
              >
                {/* A drawing only catches the pointer where it is painted, so
                    the gaps between the steam and the cup would be holes in
                    the grab target. This backs the box. */}
                <rect
                  width={icon.draw!.vw}
                  height={icon.draw!.vh}
                  fill="transparent"
                />
                {icon.draw!.node}
              </svg>
            )}
          </g>
        )
      })}
    </svg>
  )
}
