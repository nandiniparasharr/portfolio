'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* Where the hours go. Slice order is fixed so the two darkest inks
   never sit adjacent (validated for CVD separation); paper gaps and
   the legend carry identity beyond color. */
const SLICES = [
  { label: 'Finance', value: 35, color: 'var(--np-rose)' },
  { label: 'AI', value: 25, color: 'var(--np-plum)' },
  { label: 'Building', value: 20, color: 'var(--np-forest)' },
  { label: 'Writing', value: 10, color: 'var(--np-ink-3)' },
  { label: "Wondering what I'm doing", value: 10, color: 'var(--np-ink)' },
]

const SIZE = 240
const C = SIZE / 2
const R = 88
const STROKE = 30
const PAD_DEG = 2.4 // paper gap between segments

function polar(angleDeg: number, r: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }
}

function arcPath(startDeg: number, endDeg: number) {
  const s = polar(startDeg, R)
  const e = polar(endDeg, R)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`
}

export function AllocationDonut({ className }: { className?: string }) {
  const [drawn, setDrawn] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setDrawn(true)),
    )
    return () => cancelAnimationFrame(id)
  }, [])

  let angle = 0
  const segments = SLICES.map((s, i) => {
    const sweep = (s.value / 100) * 360
    const start = angle + PAD_DEG / 2
    const end = angle + sweep - PAD_DEG / 2
    angle += sweep
    const mid = (start + end) / 2
    const nudge = polar(mid, 3)
    const d = arcPath(start, end)
    const len = ((end - start) / 360) * 2 * Math.PI * R
    return { ...s, i, d, len, dx: nudge.x - C, dy: nudge.y - C }
  })

  const current = active !== null ? SLICES[active] : null

  return (
    <figure className={cn('m-0 flex flex-col items-center gap-5', className)}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-56 w-56 sm:h-64 sm:w-64"
          role="img"
          aria-label="How my time is allocated: Finance 35%, AI 25%, Building 20%, Writing 10%, Wondering what I'm doing 10%."
        >
          {segments.map((seg) => (
            <path
              key={seg.label}
              d={seg.d}
              fill="none"
              stroke={seg.color}
              strokeWidth={active === seg.i ? STROKE + 4 : STROKE}
              strokeDasharray={seg.len}
              strokeDashoffset={drawn ? 0 : seg.len}
              className="donut-seg cursor-pointer"
              style={{
                transitionDelay: drawn ? undefined : `${seg.i * 80}ms`,
                opacity: active === null || active === seg.i ? 1 : 0.35,
                transform:
                  active === seg.i
                    ? `translate(${seg.dx}px, ${seg.dy}px)`
                    : undefined,
              }}
              onMouseEnter={() => setActive(seg.i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
          {current ? (
            <>
              <span className="font-serif text-3xl text-foreground">
                {current.value}%
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-muted-foreground">
                {current.label}
              </span>
            </>
          ) : (
            <>
              <span className="font-serif text-3xl text-foreground">100%</span>
              <span className="mt-1 font-serif text-lg italic text-rose">
                curious
              </span>
            </>
          )}
        </div>
      </div>

      <figcaption className="w-full max-w-[260px]">
        <p className="m-0 mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          Current allocation
        </p>
        {SLICES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={cn(
              'flex w-full items-baseline gap-2.5 border-b border-border py-1.5 text-left transition-opacity duration-150 last:border-b-0',
              active !== null && active !== i && 'opacity-45',
            )}
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 flex-none self-center"
              style={{ background: s.color }}
            />
            <span className="flex-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              {s.label}
            </span>
            <span className="font-mono text-[10px] text-foreground">
              {s.value}%
            </span>
          </button>
        ))}
      </figcaption>
    </figure>
  )
}
