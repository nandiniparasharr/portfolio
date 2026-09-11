'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { site } from '@/lib/content'

/* Local time in Delhi, ticking. The text is written straight to the DOM
   node rather than through state — a setState every second would re-render
   the whole footer on every page of the site. It also pauses while the tab
   is hidden, so a backgrounded tab costs nothing. */
function DelhiClock() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    })
    let id = 0
    const tick = () => {
      if (ref.current) ref.current.textContent = `Delhi ${fmt.format(new Date())} IST`
    }
    const start = () => {
      tick()
      id = window.setInterval(tick, 1000)
    }
    const stop = () => {
      window.clearInterval(id)
      id = 0
    }
    const onVisibility = () => {
      stop()
      if (!document.hidden) start()
    }
    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <span ref={ref} suppressHydrationWarning>
      Delhi —:—:— IST
    </span>
  )
}

const siteLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer>
      {/* Palette strip — rose 2fr / plum / forest / ink */}
      <div className="flex h-2" aria-hidden="true">
        <div className="flex-[2] bg-rose" />
        <div className="flex-1 bg-plum" />
        <div className="flex-1 bg-forest" />
        <div className="np-footer-strip-end flex-1" />
      </div>
      <div className="np-footer px-7 pb-6 pt-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap justify-between gap-12">
            <div className="max-w-xs">
              <div className="font-serif text-[28px]">{site.name}</div>
              <div className="mt-2 font-serif text-[17px] italic opacity-70">
                {site.tagline}
              </div>
            </div>
            <div className="flex flex-wrap gap-14">
              <div className="flex flex-col gap-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-50">
                  Site
                </div>
                {siteLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="font-mono text-xs tracking-[0.06em] no-underline hover:underline"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-50">
                  Elsewhere
                </div>
                <a
                  href={site.substack}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-[0.06em] no-underline hover:underline"
                >
                  Substack ↗
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-[0.06em] no-underline hover:underline"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-xs tracking-[0.06em] no-underline hover:underline"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-between gap-4 np-footer-rule border-t pt-4 font-mono text-[10px] uppercase tracking-[0.1em] opacity-50">
            <span>
              © {new Date().getFullYear()} {site.shortMark} · <DelhiClock />
            </span>
            <span>Set in Instrument Serif &amp; IBM Plex Mono</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
