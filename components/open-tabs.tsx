'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Opening my laptop, literally. Scroll drives the lid, the lock screen,
   and the unlock; the windows are what's actually on my mind. */

type WinId = 'word' | 'notes' | 'safari' | 'books'

const WINDOWS: { id: WinId; title: string; app: string }[] = [
  { id: 'word', title: 'Compounding Ideas, Not Just Money.docx', app: 'Word' },
  { id: 'notes', title: 'GenAI & Automation Ideas', app: 'Notes' },
  { id: 'safari', title: 'Nifty 50 & Market Indices', app: 'Safari' },
  { id: 'books', title: 'Zero to One — Peter Thiel', app: 'Books' },
]

/* Cascade: inactive windows stack as readable title bars, zig-zagging
   left/right; the active window sits at the bottom of the stack, in full. */
const CASCADE_LEFT = ['1%', '9%', '4%', '12%']

function TrafficLights() {
  return (
    <span className="flex gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </span>
  )
}

function WordContent() {
  return (
    <div className="mac-font">
      <div className="flex gap-3 border-b border-black/10 bg-[#f3f1ef] px-3 py-1.5 text-[11px] text-black/60">
        {['Home', 'Insert', 'Draw', 'Design', 'Layout', 'References'].map((m, i) => (
          <span key={m} className={i === 0 ? 'font-semibold text-[#185abd]' : ''}>{m}</span>
        ))}
      </div>
      <div className="bg-[#e8e6e3] px-6 py-4 sm:px-10">
        <div className="mx-auto max-w-md bg-white px-6 py-5 shadow-sm">
          <h4 className="mac-font m-0 text-[19px] font-bold leading-snug text-black">
            Compounding Ideas,
            <br />
            Not Just Money
          </h4>
          <p className="m-0 mt-3 text-[13px] leading-relaxed text-black/75">
            Money multiplies when you invest it. But life changes when you
            invest your ideas, your time, and your attention in the right
            places.
          </p>
        </div>
      </div>
      <div className="flex justify-between border-t border-black/10 bg-[#f3f1ef] px-3 py-1 text-[10px] text-black/45">
        <span>Page 1 of 3 · 228 words</span>
        <span>120%</span>
      </div>
    </div>
  )
}

function NotesContent() {
  const groups = [
    { h: 'Automate', items: ['Monthly report summarizer', 'Invoice data extraction', 'Email categorization'] },
    { h: 'Build', items: ['AI research assistant', 'Pitch deck generator', 'Financial model copilot'] },
    { h: 'Explore', items: ['RAG for internal docs', 'Agentic workflows'] },
  ]
  return (
    <div className="mac-font bg-[#fffdf7] px-5 py-4">
      <h4 className="mac-font m-0 text-[16px] font-bold text-black">
        GenAI &amp; Automation Ideas
      </h4>
      <p className="m-0 mt-0.5 text-[11px] text-black/40">22 July at 6:35 PM</p>
      <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        {groups.map((g) => (
          <div key={g.h}>
            <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-[#c78a1e]">
              {g.h}
            </p>
            <ul className="m-0 mt-1.5 flex list-none flex-col gap-1.5 p-0">
              {g.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-[13px] text-black/80">
                  <span className="h-3 w-3 flex-none rounded-full border border-[#c78a1e]/60" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function SafariContent() {
  const movers = [
    ['RELIANCE', '2,934.50', '+1.02%', true],
    ['HDFCBANK', '1,678.80', '+0.81%', true],
    ['TCS', '3,984.20', '-0.35%', false],
    ['INFY', '1,812.30', '+0.22%', true],
  ] as const
  return (
    <div className="mac-font bg-white">
      <div className="flex justify-center border-b border-black/10 bg-[#f3f1ef] px-3 py-1.5">
        <span className="w-2/3 rounded-md bg-black/5 py-1 text-center text-[11px] text-black/50">
          nseindia.com — market snapshot
        </span>
      </div>
      <div className="grid gap-5 px-5 py-4 sm:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-black/45">
            Nifty 50
          </p>
          <p className="m-0 mt-1 text-[24px] font-bold text-black">
            24,502.15{' '}
            <span className="text-[13px] font-semibold text-[#1d8a4a]">
              +156.35 (0.64%)
            </span>
          </p>
          <svg viewBox="0 0 200 48" className="mt-2 h-12 w-full" aria-hidden="true">
            <path
              d="M0 38 L14 33 L26 36 L40 28 L54 31 L68 22 L82 27 L96 18 L110 24 L124 14 L138 20 L152 10 L166 16 L182 7 L200 12"
              fill="none"
              stroke="#1d8a4a"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div>
          <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-black/45">
            Top movers
          </p>
          <ul className="m-0 mt-1.5 flex list-none flex-col gap-1.5 p-0">
            {movers.map(([n, px, chg, up]) => (
              <li key={n} className="flex items-baseline justify-between gap-3 text-[12px]">
                <span className="font-semibold text-black/80">{n}</span>
                <span className="text-black/50">{px}</span>
                <span className={up ? 'text-[#1d8a4a]' : 'text-[#c33b2e]'}>{chg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function BooksContent() {
  return (
    <div className="mac-font bg-[#faf8f4] px-6 py-6 text-center">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
        Zero to One · Peter Thiel
      </p>
      <blockquote className="m-0 mt-4 text-[16px] leading-relaxed text-black/85 sm:text-[17px]">
        <span className="bg-[#f8e08e] px-1 py-0.5 box-decoration-clone">
          “The most contrarian thing of all is not to oppose the crowd but to
          think for yourself.”
        </span>
      </blockquote>
      <p className="m-0 mt-4 text-[11px] text-black/40">Page 42 of 201</p>
    </div>
  )
}

const CONTENT: Record<WinId, () => React.ReactElement> = {
  word: WordContent,
  notes: NotesContent,
  safari: SafariContent,
  books: BooksContent,
}

const APP_DOT: Record<WinId, string> = {
  word: 'bg-[#185abd]',
  notes: 'bg-[#e7a33d]',
  safari: 'bg-[#1f7cf6]',
  books: 'bg-[#f26b3a]',
}

function Clock({ big = false }: { big?: boolean }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const time = now
    ? now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : '--:--'
  if (!big)
    return (
      <span suppressHydrationWarning>
        {now
          ? now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
          : ''}{' '}
        {time}
      </span>
    )
  return (
    <div className="pointer-events-none select-none text-center text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
      <p suppressHydrationWarning className="mac-font m-0 text-6xl font-semibold tracking-tight sm:text-7xl">
        {time}
      </p>
      <p suppressHydrationWarning className="mac-font m-0 mt-1 text-sm font-medium">
        {now
          ? now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
          : ''}
      </p>
    </div>
  )
}

export function OpenTabs({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [manualUnlock, setManualUnlock] = useState(false)
  const [active, setActive] = useState<WinId>('word')
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = sectionRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 1
        setProgress(p)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const p = reduced ? 1 : progress
  // Lid: closed (-88deg) → open (0deg) across the first 35% of scroll
  const lidAngle = -88 + Math.min(p / 0.35, 1) * 88
  const screenOn = Math.min(Math.max((p - 0.12) / 0.2, 0), 1)
  const notiIn = p > 0.42
  const unlocked = manualUnlock || p > 0.66
  const lockOpacity = unlocked ? 0 : Math.min(Math.max((p - 0.28) / 0.15, 0), 1)

  return (
    <div ref={sectionRef} className={cn('relative h-[300vh]', className)}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-2">
        <div className="w-full max-w-[860px]" style={{ perspective: '1600px' }}>
          {/* Screen / lid */}
          <div className="relative">
            <div
              className="origin-bottom rounded-t-[14px] bg-[#1a161d] p-[7px] pb-0 shadow-[0_30px_80px_rgba(20,8,20,0.5)]"
              style={{
                transform: `rotateX(${lidAngle}deg)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="mac-sunset relative aspect-[16/10] overflow-hidden rounded-t-[8px]">
                {/* dimmer while opening */}
                <div
                  className="pointer-events-none absolute inset-0 z-50 bg-black transition-opacity duration-200"
                  style={{ opacity: 1 - screenOn }}
                />

                {/* Menu bar */}
                <div
                  className="mac-glass-dark absolute inset-x-0 top-0 z-40 flex h-6 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[10px] font-medium text-white/90"
                  style={{ opacity: screenOn }}
                >
                  <span className="mac-font flex items-center gap-3">
                    <span>⌘</span>
                    <span className="font-bold">
                      {unlocked ? WINDOWS.find((w) => w.id === active)?.app : 'Finder'}
                    </span>
                    <span className="hidden gap-3 sm:flex">
                      <span>File</span>
                      <span>Edit</span>
                      <span>View</span>
                      <span>Window</span>
                      <span>Help</span>
                    </span>
                  </span>
                  <span className="mac-font">
                    <Clock />
                  </span>
                </div>

                {/* mountains silhouette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[38%] bg-[#241226]/80"
                  style={{ clipPath: 'polygon(0 55%, 12% 30%, 24% 52%, 38% 18%, 52% 48%, 66% 26%, 80% 55%, 100% 34%, 100% 100%, 0 100%)' }}
                />

                {/* ------- LOCK SCREEN ------- */}
                <div
                  className="absolute inset-0 z-30 transition-all duration-500"
                  style={{
                    opacity: lockOpacity,
                    transform: unlocked ? 'translateY(-6%)' : 'none',
                    pointerEvents: unlocked ? 'none' : 'auto',
                  }}
                >
                  <div className="absolute inset-x-0 top-[16%]">
                    <Clock big />
                  </div>

                  {/* Notifications */}
                  <div className="absolute right-3 top-9 z-40 flex w-52 flex-col gap-2 sm:w-56">
                    {[
                      { app: 'Mail', tile: 'bg-gradient-to-b from-[#4da3ff] to-[#1f7cf6]', badge: true },
                      { app: 'Reminders', tile: 'bg-white', badge: false },
                    ].map((n, i) => (
                      <div
                        key={n.app}
                        className={cn('mac-noti mac-glass flex items-center gap-2.5 rounded-xl p-2.5', notiIn && 'is-in')}
                        style={{ transitionDelay: `${i * 140}ms` }}
                      >
                        <span className={cn('relative flex h-8 w-8 flex-none items-center justify-center rounded-lg', n.tile)}>
                          {n.app === 'Mail' ? (
                            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
                              <rect x="2" y="5" width="20" height="14" rx="2" fill="white" />
                              <path d="M3 6.5 L12 13 L21 6.5" fill="none" stroke="#1f7cf6" strokeWidth="1.6" />
                            </svg>
                          ) : (
                            <span className="flex flex-col gap-[3px]" aria-hidden="true">
                              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#f26b3a]" /><span className="h-[3px] w-3 rounded bg-black/25" /></span>
                              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#1f7cf6]" /><span className="h-[3px] w-3 rounded bg-black/25" /></span>
                              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#e7a33d]" /><span className="h-[3px] w-3 rounded bg-black/25" /></span>
                            </span>
                          )}
                          {n.badge && (
                            <span className="mac-font absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff3b30] text-[9px] font-bold text-white">
                              1
                            </span>
                          )}
                        </span>
                        <span className="mac-font min-w-0">
                          <span className="block text-[12px] font-semibold leading-tight text-black/85">{n.app}</span>
                          <span className="block text-[11px] leading-tight text-black/55">Notification</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Profile */}
                  <button
                    type="button"
                    onClick={() => setManualUnlock(true)}
                    className="absolute inset-x-0 bottom-[9%] mx-auto flex w-max cursor-pointer flex-col items-center gap-1.5"
                    aria-label="Unlock"
                  >
                    <span className="mac-glass flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl italic text-foreground">
                      N
                    </span>
                    <span className="mac-font text-[13px] font-semibold text-white/95 drop-shadow">
                      Nandini
                    </span>
                    <svg viewBox="0 0 16 16" className="mac-lock h-3.5 w-3.5 text-white/85" aria-hidden="true">
                      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
                      <path d="M5 7 V5.5 a3 3 0 0 1 6 0 V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>

                {/* ------- DESKTOP ------- */}
                <div
                  className="absolute inset-0 z-20 transition-all duration-500"
                  style={{
                    opacity: unlocked ? 1 : 0,
                    transform: unlocked ? 'scale(1)' : 'scale(1.045)',
                    pointerEvents: unlocked ? 'auto' : 'none',
                  }}
                >
                  {/* Window stack — title bars cascade; click brings to front */}
                  <div className="absolute inset-x-[4%] bottom-[17%] top-[8%]">
                    {[
                      ...WINDOWS.filter((w) => w.id !== active),
                      WINDOWS.find((w) => w.id === active)!,
                    ].map((w, i) => {
                      const isActive = active === w.id
                      const Body = CONTENT[w.id]
                      return (
                        <div
                          key={w.id}
                          data-active={isActive}
                          className="mac-window absolute w-[86%] transition-[top,left] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] sm:w-[76%]"
                          style={{
                            left: CASCADE_LEFT[i],
                            top: `${i * 36}px`,
                            zIndex: 10 + i,
                          }}
                          onClick={() => !isActive && setActive(w.id)}
                          role={isActive ? undefined : 'button'}
                          aria-label={isActive ? undefined : `Bring ${w.title} to front`}
                        >
                          <div className="flex items-center gap-2.5 border-b border-black/10 bg-[#ece9e6] px-3 py-2">
                            <TrafficLights />
                            <span className={cn('h-2 w-2 flex-none rounded-full', APP_DOT[w.id])} aria-hidden="true" />
                            <span className="mac-font truncate text-[12px] font-medium text-black/75">
                              {w.title}
                            </span>
                          </div>
                          {isActive && <Body />}
                        </div>
                      )
                    })}
                  </div>

                  {/* Dock */}
                  <div className="absolute bottom-2.5 left-1/2 z-40 -translate-x-1/2">
                    <div className="mac-glass flex items-end gap-2 rounded-2xl px-2.5 py-1.5">
                      {WINDOWS.map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setActive(w.id)}
                          aria-label={`Open ${w.app}`}
                          className="mac-dock-icon flex flex-col items-center gap-0.5"
                        >
                          <span
                            className={cn(
                              'mac-font flex h-9 w-9 items-center justify-center rounded-[9px] text-[15px] font-bold text-white shadow-md',
                              w.id === 'word' && 'bg-gradient-to-b from-[#2d7bdc] to-[#185abd]',
                              w.id === 'notes' && 'bg-gradient-to-b from-[#fffef4] to-[#f5e9c8] text-[#c78a1e]',
                              w.id === 'safari' && 'bg-gradient-to-b from-[#5fb2ff] to-[#1f7cf6]',
                              w.id === 'books' && 'bg-gradient-to-b from-[#ff9a62] to-[#f26b3a]',
                            )}
                          >
                            {w.id === 'word' ? 'W' : w.id === 'notes' ? '≡' : w.id === 'safari' ? '➤' : '❝'}
                          </span>
                          <span
                            className={cn('h-1 w-1 rounded-full bg-white/90', active === w.id ? 'opacity-100' : 'opacity-0')}
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Base / keyboard deck */}
            <div className="relative z-10">
              <div className="h-3 rounded-b-[14px] bg-gradient-to-b from-[#2a252e] to-[#141017]" />
              <div className="mx-auto -mt-3 h-1 w-24 rounded-b-md bg-black/40" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          {!unlocked
            ? p < 0.3
              ? 'Keep scrolling — the lid opens'
              : 'Scroll to unlock · or click me'
            : 'Click a title bar or the dock'}
        </p>
      </div>
    </div>
  )
}
