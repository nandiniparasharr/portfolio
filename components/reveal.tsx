'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* One IntersectionObserver for the whole document rather than one per
   Reveal — a long page mounts twenty-odd of these, and twenty observers all
   watching the same viewport with the same options is pure overhead. */
type Cb = () => void
const callbacks = new WeakMap<Element, Cb>()
let observer: IntersectionObserver | null = null

function shared() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const cb = callbacks.get(entry.target)
        observer!.unobserve(entry.target)
        callbacks.delete(entry.target)
        cb?.()
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
  )
  return observer
}

/** Scroll reveal — np-rise on first intersection, staggered via delay. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'span' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = shared()
    callbacks.set(el, () => setVisible(true))
    io.observe(el)
    return () => {
      io.unobserve(el)
      callbacks.delete(el)
    }
  }, [])

  const Component = Tag as 'div'

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('np-reveal', visible && 'is-visible', className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
