'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Opening my laptop, literally. Scroll (or a click) lifts the lid,
   the lock screen greets you, and the desktop is what's on my mind. */

type WinId = 'word' | 'notes' | 'safari' | 'books'

const WINDOWS: { id: WinId; title: string; app: string }[] = [
  { id: 'word', title: 'Compounding Ideas, Not Just Money.docx', app: 'Word' },
  { id: 'notes', title: 'GenAI & Automation Ideas', app: 'Notes' },
  { id: 'safari', title: 'Nifty 50 & Market Indices', app: 'Safari' },
  { id: 'books', title: 'Zero to One — Peter Thiel', app: 'Books' },
]

const CASCADE_LEFT = ['1%', '9%', '4%', '12%']

type WinState = { closed: boolean; min: boolean; max: boolean; dx: number; dy: number }
const initialWins: Record<WinId, WinState> = {
  word: { closed: false, min: false, max: false, dx: 0, dy: 0 },
  notes: { closed: false, min: false, max: false, dx: 0, dy: 0 },
  safari: { closed: false, min: false, max: false, dx: 0, dy: 0 },
  books: { closed: false, min: false, max: false, dx: 0, dy: 0 },
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
      <p suppressHydrationWarning className="mac-font m-0 text-5xl font-semibold tracking-tight sm:text-7xl">
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

/* ---------- Dock icons (CSS/SVG only) ---------- */

function DockTile({
  children,
  className,
  label,
  onClick,
  indicator = false,
  badge,
}: {
  children?: React.ReactNode
  className?: string
  label: string
  onClick?: () => void
  indicator?: boolean
  badge?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="mac-dock-icon flex flex-col items-center gap-0.5"
    >
      <span
        className={cn(
          'relative flex h-8 w-8 items-center justify-center rounded-[8px] shadow-md sm:h-9 sm:w-9',
          className,
        )}
      >
        {children}
        {badge && (
          <span className="mac-font absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff3b30] text-[9px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>
      <span
        className={cn('h-1 w-1 rounded-full bg-white/90', indicator ? 'opacity-100' : 'opacity-0')}
        aria-hidden="true"
      />
    </button>
  )
}

function FinderIcon() {
  return (
    <span className="relative block h-full w-full overflow-hidden rounded-[8px] bg-gradient-to-b from-[#8fd0ff] to-[#3f9ef8]" aria-hidden="true">
      <span className="absolute inset-y-0 left-0 w-1/2 bg-white/85" />
      <span className="absolute left-[30%] top-[30%] h-[3px] w-[3px] rounded-full bg-[#1d3c66]" />
      <span className="absolute right-[26%] top-[30%] h-[3px] w-[3px] rounded-full bg-white" />
      <span className="absolute left-1/2 top-[52%] h-2.5 w-3.5 -translate-x-1/2 rounded-b-full border-b-2 border-[#1d3c66]" />
    </span>
  )
}
function SpotifyIcon() {
  return (
    <span className="relative flex h-full w-full items-center justify-center rounded-[8px] bg-[#1ed760]" aria-hidden="true">
      <span className="flex flex-col gap-[2.5px]">
        <span className="h-[2.5px] w-4 rounded-full bg-black/85" />
        <span className="h-[2.5px] w-3.5 rounded-full bg-black/85" />
        <span className="h-[2.5px] w-2.5 rounded-full bg-black/85" />
      </span>
    </span>
  )
}
function PhotosIcon() {
  return (
    <span
      className="block h-full w-full rounded-[8px] bg-white"
      style={{
        background:
          'conic-gradient(from 20deg, #f9d423, #8bc34a, #29b6f6, #7e57c2, #ec407a, #ff7043, #f9d423)',
      }}
      aria-hidden="true"
    >
      <span className="m-auto mt-[34%] block h-1/3 w-1/3 rounded-full bg-white/90" />
    </span>
  )
}
function ChromeIcon() {
  return (
    <span
      className="relative flex h-full w-full items-center justify-center rounded-[8px]"
      style={{
        background:
          'conic-gradient(from -30deg, #ea4335 0deg 120deg, #4285f4 120deg 240deg, #34a853 240deg 300deg, #fbbc05 300deg 360deg)',
      }}
      aria-hidden="true"
    >
      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white">
        <span className="h-2 w-2 rounded-full bg-[#4285f4]" />
      </span>
    </span>
  )
}
function FaceTimeIcon() {
  return (
    <span className="relative flex h-full w-full items-center justify-center rounded-[8px] bg-gradient-to-b from-[#5ae675] to-[#0fbd35]" aria-hidden="true">
      <span className="ml-[-3px] h-3 w-3.5 rounded-[3px] bg-white" />
      <span className="ml-[1px] h-0 w-0 border-y-[5px] border-r-[5px] border-y-transparent border-r-white" />
    </span>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" fill="white" />
      <path d="M3 6.5 L12 13 L21 6.5" fill="none" stroke="#1f7cf6" strokeWidth="1.6" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <span className="relative flex h-full w-full items-end justify-center rounded-[8px] bg-gradient-to-b from-[#e8e6ea] to-[#b9b5bf] pb-1" aria-hidden="true">
      <span className="relative h-4.5 w-3.5 rounded-[2px] bg-gradient-to-b from-[#9d98a4] to-[#7c7683]">
        <span className="absolute -top-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded bg-[#8b8592]" />
      </span>
    </span>
  )
}

/* ---------- main ---------- */

export function OpenTabs({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [manual, setManual] = useState(false)
  const [active, setActive] = useState<WinId>('word')
  const [wins, setWins] = useState(initialWins)
  const [dragId, setDragId] = useState<WinId | null>(null)
  const dragStart = useRef<{ x: number; y: number; dx: number; dy: number }>({ x: 0, y: 0, dx: 0, dy: 0 })
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

  const p = reduced || manual ? 1 : progress
  const open = Math.min(p / 0.25, 1)
  const sceneTilt = 42 * (1 - open)
  const lidAngle = -88 + open * 88
  const aluOpacity = Math.max(1 - open * 2.2, 0)
  const screenOn = Math.min(Math.max((p - 0.06) / 0.16, 0), 1)
  const notiIn = p > 0.34
  const unlocked = manual || p > 0.52
  const lockOpacity = unlocked ? 0 : Math.min(Math.max((p - 0.2) / 0.12, 0), 1)

  const visibleWins = WINDOWS.filter((w) => !wins[w.id].closed && !wins[w.id].min)
  const stack = [
    ...visibleWins.filter((w) => w.id !== active),
    ...visibleWins.filter((w) => w.id === active),
  ]

  const focusNext = (except: WinId) => {
    const next = visibleWins.filter((w) => w.id !== except).pop()
    if (next) setActive(next.id)
  }
  const patch = (id: WinId, part: Partial<WinState>) =>
    setWins((prev) => ({ ...prev, [id]: { ...prev[id], ...part } }))
  const launch = (id: WinId) => {
    patch(id, { closed: false, min: false })
    setActive(id)
  }

  const onTitleDown = (id: WinId) => (e: React.PointerEvent) => {
    setActive(id)
    setDragId(id)
    dragStart.current = { x: e.clientX, y: e.clientY, dx: wins[id].dx, dy: wins[id].dy }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onTitleMove = (id: WinId) => (e: React.PointerEvent) => {
    if (dragId !== id) return
    patch(id, {
      dx: dragStart.current.dx + e.clientX - dragStart.current.x,
      dy: dragStart.current.dy + e.clientY - dragStart.current.y,
    })
  }
  const onTitleUp = () => setDragId(null)

  return (
    <div ref={sectionRef} className={cn('relative h-[220vh]', className)}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-2">
        <div className="w-full max-w-[774px]" style={{ perspective: '1500px' }}>
          <div
            className="relative"
            style={{ transform: `rotateX(${sceneTilt}deg)`, transformStyle: 'preserve-3d' }}
          >
            {/* Lid (screen front + aluminum back) */}
            <div
              className="relative"
              style={{
                transform: `rotateX(${lidAngle}deg)`,
                transformOrigin: 'bottom',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Screen face */}
              <div
                className="rounded-t-[14px] bg-[#141017] p-[6px] pb-0"
                style={{ backfaceVisibility: 'hidden' }}
                onClick={() => !unlocked && setManual(true)}
              >
                <div className="mac-sunset relative aspect-[16/10] cursor-pointer overflow-hidden rounded-t-[9px]">
                  <div
                    className="pointer-events-none absolute inset-0 z-50 bg-black transition-opacity duration-200"
                    style={{ opacity: 1 - screenOn }}
                  />
                  {/* Aluminum lid-top, visible while the lid lies closed */}
                  <div
                    className="mac-alu pointer-events-none absolute inset-0 z-[60] flex items-center justify-center"
                    style={{ opacity: aluOpacity }}
                    aria-hidden="true"
                  >
                    <span className="font-serif text-3xl italic text-black/30">
                      N—P
                    </span>
                  </div>

                  {/* Menu bar */}
                  <div
                    className="mac-glass-dark absolute inset-x-0 top-0 z-40 flex h-6 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[10px] font-medium text-white/90"
                    style={{ opacity: screenOn }}
                  >
                    <span className="mac-font flex items-center gap-3">
                      <span>⌘</span>
                      <span className="font-bold">
                        {unlocked
                          ? WINDOWS.find((w) => w.id === active)?.app ?? 'Finder'
                          : 'Finder'}
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

                  {/* Mountains */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[30%] bg-[#301538]/50"
                    style={{ clipPath: 'polygon(0 62%, 10% 44%, 22% 58%, 34% 34%, 47% 56%, 60% 40%, 73% 60%, 86% 46%, 100% 58%, 100% 100%, 0 100%)' }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[22%] bg-[#1f0d26]/80"
                    style={{ clipPath: 'polygon(0 70%, 14% 48%, 30% 66%, 46% 42%, 62% 64%, 78% 50%, 92% 66%, 100% 56%, 100% 100%, 0 100%)' }}
                  />

                  {/* -------- LOCK SCREEN -------- */}
                  <div
                    className="absolute inset-0 z-30 transition-all duration-500"
                    style={{
                      opacity: lockOpacity,
                      transform: unlocked ? 'translateY(-6%)' : 'none',
                      pointerEvents: unlocked ? 'none' : 'auto',
                    }}
                  >
                    <div className="absolute inset-x-0 top-[15%]">
                      <Clock big />
                    </div>

                    <div className="absolute right-3 top-9 z-40 flex w-52 flex-col gap-2 sm:w-56">
                      {[
                        { app: 'Mail', badge: true },
                        { app: 'Reminders', badge: false },
                      ].map((n, i) => (
                        <div
                          key={n.app}
                          className={cn('mac-noti mac-glass flex items-center gap-2.5 rounded-2xl p-2.5', notiIn && 'is-in')}
                          style={{ transitionDelay: `${i * 140}ms` }}
                        >
                          <span
                            className={cn(
                              'relative flex h-8 w-8 flex-none items-center justify-center rounded-lg',
                              n.app === 'Mail' ? 'bg-gradient-to-b from-[#4da3ff] to-[#1f7cf6]' : 'bg-white',
                            )}
                          >
                            {n.app === 'Mail' ? (
                              <MailIcon />
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

                    <div className="absolute inset-x-0 bottom-[9%] mx-auto flex w-max flex-col items-center gap-1.5">
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
                    </div>
                  </div>

                  {/* -------- DESKTOP -------- */}
                  <div
                    className="absolute inset-0 z-20 transition-all duration-500"
                    style={{
                      opacity: unlocked ? 1 : 0,
                      transform: unlocked ? 'scale(1)' : 'scale(1.045)',
                      pointerEvents: unlocked ? 'auto' : 'none',
                    }}
                  >
                    <div className="absolute inset-x-[4%] bottom-[17%] top-[8%]">
                      {stack.map((w, i) => {
                        const st = wins[w.id]
                        const isActive = active === w.id
                        const Body = CONTENT[w.id]
                        return (
                          <div
                            key={w.id}
                            data-active={isActive}
                            className={cn(
                              'mac-window absolute w-[86%] sm:w-[76%]',
                              dragId === w.id
                                ? 'transition-none'
                                : 'transition-[top,left,width] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
                            )}
                            style={{
                              left: st.max ? '0%' : CASCADE_LEFT[i],
                              top: st.max ? '0px' : `${i * 34}px`,
                              width: st.max ? '100%' : undefined,
                              transform: st.max ? undefined : `translate(${st.dx}px, ${st.dy}px)`,
                              zIndex: 10 + i,
                            }}
                            onClick={() => !isActive && setActive(w.id)}
                          >
                            <div
                              className="flex touch-none select-none items-center gap-2.5 border-b border-black/10 bg-[#ece9e6] px-3 py-2"
                              style={{ cursor: dragId === w.id ? 'grabbing' : 'grab' }}
                              onPointerDown={onTitleDown(w.id)}
                              onPointerMove={onTitleMove(w.id)}
                              onPointerUp={onTitleUp}
                              onPointerCancel={onTitleUp}
                            >
                              <span className="flex gap-1.5">
                                <button
                                  type="button"
                                  aria-label={`Close ${w.app}`}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    patch(w.id, { closed: true })
                                    if (isActive) focusNext(w.id)
                                  }}
                                  className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] hover:brightness-90"
                                />
                                <button
                                  type="button"
                                  aria-label={`Minimize ${w.app}`}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    patch(w.id, { min: true })
                                    if (isActive) focusNext(w.id)
                                  }}
                                  className="h-2.5 w-2.5 rounded-full bg-[#febc2e] hover:brightness-90"
                                />
                                <button
                                  type="button"
                                  aria-label={`Zoom ${w.app}`}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    patch(w.id, { max: !st.max, dx: 0, dy: 0 })
                                    setActive(w.id)
                                  }}
                                  className="h-2.5 w-2.5 rounded-full bg-[#28c840] hover:brightness-90"
                                />
                              </span>
                              <span className={cn('h-2 w-2 flex-none rounded-full', APP_DOT[w.id])} aria-hidden="true" />
                              <span className="mac-font truncate text-[12px] font-medium text-black/75">
                                {w.title}
                              </span>
                            </div>
                            {isActive && <Body />}
                          </div>
                        )
                      })}
                      {visibleWins.length === 0 && (
                        <p className="mac-font absolute inset-x-0 top-1/3 text-center text-[13px] font-medium text-white/80 drop-shadow">
                          All closed. The dock brings them back.
                        </p>
                      )}
                    </div>

                    {/* Dock */}
                    <div className="absolute bottom-2 left-1/2 z-40 -translate-x-1/2">
                      <div className="mac-glass flex items-end gap-1.5 rounded-2xl px-2.5 py-1.5 sm:gap-2">
                        <DockTile label="Finder"><FinderIcon /></DockTile>
                        <DockTile
                          label="Safari"
                          onClick={() => launch('safari')}
                          indicator={!wins.safari.closed && !wins.safari.min}
                          className="bg-gradient-to-b from-[#5fb2ff] to-[#1f7cf6] text-[15px] font-bold text-white"
                        >
                          ➤
                        </DockTile>
                        <DockTile
                          label="Word"
                          onClick={() => launch('word')}
                          indicator={!wins.word.closed && !wins.word.min}
                          className="mac-font bg-gradient-to-b from-[#2d7bdc] to-[#185abd] text-[15px] font-bold text-white"
                        >
                          W
                        </DockTile>
                        <DockTile
                          label="Notes"
                          onClick={() => launch('notes')}
                          indicator={!wins.notes.closed && !wins.notes.min}
                          className="bg-gradient-to-b from-[#fffef4] to-[#f5e9c8] text-[15px] font-bold text-[#c78a1e]"
                        >
                          ≡
                        </DockTile>
                        <DockTile
                          label="Books"
                          onClick={() => launch('books')}
                          indicator={!wins.books.closed && !wins.books.min}
                          className="bg-gradient-to-b from-[#ff9a62] to-[#f26b3a] text-[15px] font-bold text-white"
                        >
                          ❝
                        </DockTile>
                        <DockTile label="Spotify"><SpotifyIcon /></DockTile>
                        <DockTile label="Photos"><PhotosIcon /></DockTile>
                        <DockTile label="Chrome"><ChromeIcon /></DockTile>
                        <DockTile label="FaceTime"><FaceTimeIcon /></DockTile>
                        <DockTile label="Mail" badge="1" className="bg-gradient-to-b from-[#4da3ff] to-[#1f7cf6]">
                          <MailIcon />
                        </DockTile>
                        <span className="mx-0.5 mb-1.5 h-8 w-px bg-white/30" aria-hidden="true" />
                        <DockTile label="Trash"><TrashIcon /></DockTile>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Keyboard deck (out of layout flow so centering tracks the screen) */}
            <div
              className="mac-alu absolute left-0 right-0 top-full rounded-b-[16px] border-t border-black/20"
              style={{
                height: 'min(46vw, 300px)',
                transform: 'rotateX(-90deg)',
                transformOrigin: 'top',
                backfaceVisibility: 'hidden',
              }}
              aria-hidden="true"
            >
              <div className="absolute left-1/2 top-[7%] h-[46%] w-[72%] -translate-x-1/2 rounded-md bg-black/10 p-1.5">
                <div
                  className="h-full w-full opacity-60"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to right, rgba(0,0,0,0.25) 0 6%, transparent 6% 8%), repeating-linear-gradient(to bottom, rgba(0,0,0,0.25) 0 14%, transparent 14% 19%)',
                  }}
                />
              </div>
              <div className="absolute bottom-[9%] left-1/2 h-[30%] w-[30%] -translate-x-1/2 rounded-md border border-black/15 bg-black/5" />
            </div>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          {!unlocked
            ? 'Scroll to open — or click the screen'
            : 'Drag the windows · the buttons work · the dock reopens'}
        </p>
      </div>
    </div>
  )
}
