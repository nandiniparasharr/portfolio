'use client'

import { useEffect, useRef } from 'react'
import { experience } from '@/lib/content'
import { Reveal } from '@/components/reveal'

/** The rose line fills as you scroll through the roles. */
export function Trajectory() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const anchor = window.innerHeight * 0.7
      const p = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1)
      el.style.setProperty('--trajectory-progress', String(p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={ref} className="relative mt-10 ml-1">
      <div className="np-rail" aria-hidden="true">
        <div className="np-rail-fill" />
      </div>
      <ol className="m-0 list-none p-0">
        {experience.map((role, i) => (
          <Reveal
            as="li"
            key={role.company}
            delay={i * 80}
            className="relative pb-12 pl-10 last:pb-2 sm:pl-14"
          >
            <span className="np-node" aria-hidden="true" />
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
              {role.date}
            </p>
            <h3 className="mt-0.5 text-h3">{role.company}</h3>
            <p className="m-0 text-sm text-muted-foreground">{role.role}</p>
            <ul className="m-0 mt-4 flex max-w-2xl list-none flex-col gap-2 p-0">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden="true" className="text-rose">
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
