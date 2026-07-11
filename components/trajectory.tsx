'use client'

import { useEffect, useRef, useState } from 'react'
import { experience, type Role } from '@/lib/content'
import { Reveal } from '@/components/reveal'

/** Monogram tile that upgrades itself to a real logo when the file exists. */
function LogoTile({ role }: { role: Role }) {
  const [hasLogo, setHasLogo] = useState(false)

  useEffect(() => {
    const probe = new Image()
    probe.onload = () => setHasLogo(true)
    probe.src = role.logo
  }, [role.logo])

  return (
    <span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden border border-border-strong bg-card">
      {hasLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={role.logo}
          alt={`${role.company} logo`}
          className="h-full w-full object-contain p-1.5"
        />
      ) : (
        <span aria-hidden="true" className="font-serif text-lg text-rose">
          {role.initials}
        </span>
      )}
    </span>
  )
}

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
            <div className="flex flex-wrap items-center gap-4">
              <LogoTile role={role} />
              <div>
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                  {role.date}
                </p>
                <h3 className="mt-0.5 text-h3">{role.company}</h3>
                <p className="m-0 text-sm text-muted-foreground">{role.role}</p>
              </div>
            </div>
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
