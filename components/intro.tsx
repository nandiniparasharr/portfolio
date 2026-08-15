'use client'

import { useEffect, useState } from 'react'

/** First-visit masthead: name rises, a rule draws, the sheet lifts. */
export function Intro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('np-intro')) return
    sessionStorage.setItem('np-intro', '1')
    setShow(true)
    // 3.2s, not 2.4s — the "new site coming" line lands at 900ms and needs
    // time on screen to actually be read before the sheet lifts.
    const t = setTimeout(() => setShow(false), 3200)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="np-intro" aria-hidden="true">
      <div className="w-72 max-w-[80vw]">
        <p
          className="np-stage font-serif text-3xl text-foreground"
          style={{ ['--stage-delay' as string]: '100ms' }}
        >
          Nandini Parashar
        </p>
        <div className="np-intro-line mt-4 h-0.5 bg-rose" />
        <p
          className="np-stage mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          style={{ ['--stage-delay' as string]: '500ms' }}
        >
          Portfolio — 2026
        </p>
        <p
          className="np-stage mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-rose"
          style={{ ['--stage-delay' as string]: '900ms' }}
        >
          New site coming — stay tuned
        </p>
      </div>
    </div>
  )
}
