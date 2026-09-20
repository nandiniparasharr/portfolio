'use client'

import { useEffect, useState } from 'react'

/* ------------------------------------------------------------------
   LAYOUT LAB  ·  dev-only, temporary
   A hands-on way to try arrangements on the home page. Open the site
   with ?layout and every block tagged data-lab becomes draggable; a
   readout in the corner shows how far each one has moved from where the
   real layout puts it. Nothing here ships to a visitor: without the
   query flag the component returns null and never touches the DOM.

   The offsets are for eyeballing and for telling me where you want
   things — they are pixels at this one screen width, so I translate the
   arrangement you like into the responsive layout by hand rather than
   freezing these numbers in.
   ------------------------------------------------------------------ */

type Offset = { dx: number; dy: number }

export function LayoutLab() {
  const [active, setActive] = useState(false)
  const [offsets, setOffsets] = useState<Record<string, Offset>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    setActive(new URLSearchParams(window.location.search).has('layout'))
  }, [])

  useEffect(() => {
    if (!active) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-lab]'))
    const state: Record<string, Offset> = {}
    const cleanups: Array<() => void> = []

    els.forEach((el) => {
      const label = el.dataset.lab || 'block'
      state[label] = { dx: 0, dy: 0 }

      const prev = {
        cursor: el.style.cursor,
        transform: el.style.transform,
        outline: el.style.outline,
        outlineOffset: el.style.outlineOffset,
        zIndex: el.style.zIndex,
        touchAction: el.style.touchAction,
        userSelect: el.style.userSelect,
      }
      el.style.cursor = 'grab'
      el.style.touchAction = 'none'
      el.style.userSelect = 'none'
      el.style.outline = '1px dashed rgba(200,40,80,0.55)'
      el.style.outlineOffset = '6px'

      let sx = 0
      let sy = 0
      let bx = 0
      let by = 0
      let dragging = false

      const down = (e: PointerEvent) => {
        e.preventDefault()
        dragging = true
        sx = e.clientX
        sy = e.clientY
        bx = state[label].dx
        by = state[label].dy
        el.style.cursor = 'grabbing'
        el.style.zIndex = '60'
        el.setPointerCapture?.(e.pointerId)
      }
      const move = (e: PointerEvent) => {
        if (!dragging) return
        const dx = Math.round(bx + (e.clientX - sx))
        const dy = Math.round(by + (e.clientY - sy))
        el.style.transform = `translate(${dx}px, ${dy}px)`
        state[label] = { dx, dy }
        setOffsets({ ...state })
      }
      const up = (e: PointerEvent) => {
        dragging = false
        el.style.cursor = 'grab'
        el.releasePointerCapture?.(e.pointerId)
      }
      // In layout mode a click on a tagged block (the buttons are links)
      // must not navigate away mid-drag.
      const noclick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
      }

      el.addEventListener('pointerdown', down)
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerup', up)
      el.addEventListener('click', noclick, true)
      cleanups.push(() => {
        el.removeEventListener('pointerdown', down)
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerup', up)
        el.removeEventListener('click', noclick, true)
        el.style.cursor = prev.cursor
        el.style.transform = prev.transform
        el.style.outline = prev.outline
        el.style.outlineOffset = prev.outlineOffset
        el.style.zIndex = prev.zIndex
        el.style.touchAction = prev.touchAction
        el.style.userSelect = prev.userSelect
      })
    })

    setOffsets({ ...state })
    return () => cleanups.forEach((c) => c())
  }, [active])

  if (!active) return null

  const moved = Object.entries(offsets).filter(([, o]) => o.dx || o.dy)

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-64 border border-border-strong bg-card p-4 font-mono text-[11px] shadow-pop">
      <p className="m-0 mb-2 font-semibold uppercase tracking-[0.12em] text-rose">
        Layout mode
      </p>
      <p className="m-0 mb-3 leading-snug text-muted-foreground">
        Drag the dashed blocks. Numbers are pixels moved from the real
        position, at this window width.
      </p>
      <ul className="m-0 list-none space-y-1 p-0">
        {Object.entries(offsets).map(([label, o]) => (
          <li key={label} className="flex justify-between text-foreground">
            <span>{label}</span>
            <span className={o.dx || o.dy ? 'text-rose' : 'text-faint'}>
              {o.dx >= 0 ? '+' : ''}
              {o.dx}, {o.dy >= 0 ? '+' : ''}
              {o.dy}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-faint">
          {moved.length} moved
        </span>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border border-border-strong px-3 py-1 uppercase tracking-[0.1em] text-foreground hover:bg-inverse hover:text-on-inverse"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
