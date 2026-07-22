'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* A peek into my laptop mid-thought. Scroll opens the lid, greets you at
   the lock screen, then unlocks into the workspace that's actually open. */

type WinId = 'word' | 'notes' | 'safari'
type SafariTab = 'nifty' | 'book'

const WINDOWS: { id: WinId; title: string; app: string }[] = [
  { id: 'word', title: 'Compounding Ideas, Not Just Money.docx', app: 'Word' },
  { id: 'notes', title: 'GenAI & Automation Ideas', app: 'Notes' },
  { id: 'safari', title: 'Nifty 50 & Market Indices', app: 'Safari' },
]

const CASCADE_LEFT = ['2%', '11%', '5%']

const MENUS: Record<'finder' | WinId, string[]> = {
  finder: ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'],
  word: ['Word', 'File', 'Edit', 'View', 'Insert', 'Format'],
  notes: ['Notes', 'File', 'Edit', 'View', 'Window', 'Help'],
  safari: ['Safari', 'File', 'Edit', 'View', 'History', 'Bookmarks'],
}

type WinState = { closed: boolean; min: boolean; max: boolean; dx: number; dy: number }
const initialWins: Record<WinId, WinState> = {
  word: { closed: false, min: false, max: false, dx: 0, dy: 0 },
  notes: { closed: false, min: false, max: false, dx: 0, dy: 0 },
  safari: { closed: false, min: false, max: false, dx: 0, dy: 0 },
}

const APP_DOT: Record<WinId, string> = {
  word: 'bg-[#185abd]',
  notes: 'bg-[#e7a33d]',
  safari: 'bg-[#1f7cf6]',
}

/* ---------- window bodies ---------- */

function WordBody() {
  return (
    <div className="mac-font">
      <div className="flex gap-3 border-b border-black/10 bg-[#f3f1ef] px-3 py-1.5 text-[11px] text-black/60">
        {['Home', 'Insert', 'Draw', 'Design', 'Layout'].map((m, i) => (
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

function NotesBody() {
  const items = [
    'Monthly report automation',
    'AI research assistant ideas',
    'Workflow experiments',
    'Internal automation notes',
    'Pitch-deck generator',
    'RAG over annual reports',
  ]
  return (
    <div className="mac-font bg-[#fffdf7] px-5 py-4">
      <h4 className="mac-font m-0 text-[16px] font-bold text-black">
        GenAI &amp; Automation Ideas
      </h4>
      <p className="m-0 mt-0.5 text-[11px] text-black/40">22 July at 6:35 PM</p>
      <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
        {items.map((it, i) => (
          <li key={it} className="flex items-center gap-2.5 text-[13px] text-black/80">
            <span
              className={cn(
                'flex h-4 w-4 flex-none items-center justify-center rounded-full border',
                i < 2 ? 'border-[#e7a33d] bg-[#e7a33d]' : 'border-black/25',
              )}
            >
              {i < 2 && (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
                  <path d="M2 6.5 L5 9 L10 3" fill="none" stroke="white" strokeWidth="1.8" />
                </svg>
              )}
            </span>
            <span className={i < 2 ? 'text-black/40 line-through' : ''}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NiftyTab() {
  const movers = [
    ['RELIANCE', '2,934.50', '+1.02%', true],
    ['HDFCBANK', '1,678.80', '+0.81%', true],
    ['TCS', '3,984.20', '-0.35%', false],
    ['INFY', '1,812.30', '+0.22%', true],
  ] as const
  return (
    <div className="mac-font grid gap-5 bg-white px-5 py-4 sm:grid-cols-[1.3fr_1fr]">
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
          Watchlist
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
  )
}

function BookTab() {
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
      <div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-black/10">
        <span className="block h-full w-[21%] rounded-full bg-[#f26b3a]" />
      </div>
      <p className="m-0 mt-2 text-[11px] text-black/40">Page 42 of 201 · 21%</p>
    </div>
  )
}

function SafariBody({ tab, setTab }: { tab: SafariTab; setTab: (t: SafariTab) => void }) {
  const tabs: { id: SafariTab; label: string }[] = [
    { id: 'nifty', label: 'Nifty 50 — NSE' },
    { id: 'book', label: 'Zero to One — Books' },
  ]
  return (
    <div className="mac-font">
      {/* tab strip */}
      <div className="flex items-stretch gap-px border-b border-black/10 bg-[#e4e1de] pl-2 pt-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              setTab(t.id)
            }}
            className={cn(
              'mac-tab flex max-w-[160px] items-center gap-1.5 truncate rounded-t-lg px-3 py-1.5 text-[11px]',
              tab === t.id ? 'bg-white text-black/80' : 'text-black/45 hover:text-black/70',
            )}
          >
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#1f7cf6]" />
            {t.label}
          </button>
        ))}
      </div>
      {/* address bar */}
      <div className="flex justify-center border-b border-black/10 bg-[#f3f1ef] px-3 py-1.5">
        <span className="w-2/3 rounded-md bg-black/5 py-1 text-center text-[11px] text-black/50">
          {tab === 'nifty' ? 'nseindia.com — market snapshot' : 'books.apple.com — zero to one'}
        </span>
      </div>
      {tab === 'nifty' ? <NiftyTab /> : <BookTab />}
    </div>
  )
}

/* ---------- clock ---------- */

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

/* ---------- dock icons ---------- */

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
          'relative flex h-8 w-8 items-center justify-center rounded-[9px] shadow-md sm:h-9 sm:w-9',
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
    <span className="relative block h-full w-full overflow-hidden rounded-[9px] bg-gradient-to-b from-[#8fd0ff] to-[#3f9ef8]" aria-hidden="true">
      <span className="absolute inset-y-0 left-0 w-1/2 bg-white/85" />
      <span className="absolute left-[30%] top-[30%] h-[3px] w-[3px] rounded-full bg-[#1d3c66]" />
      <span className="absolute right-[26%] top-[30%] h-[3px] w-[3px] rounded-full bg-white" />
      <span className="absolute left-1/2 top-[52%] h-2.5 w-3.5 -translate-x-1/2 rounded-b-full border-b-2 border-[#1d3c66]" />
    </span>
  )
}
function SafariIcon() {
  return (
    <span className="relative flex h-full w-full items-center justify-center rounded-[9px] bg-gradient-to-b from-[#3aa0ff] to-[#1f6ff0]" aria-hidden="true">
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/70">
        <span className="block h-3 w-[3px] rotate-45 bg-gradient-to-b from-[#ff5b52] from-50% to-white to-50%" />
      </span>
    </span>
  )
}
function WordIcon() {
  return (
    <span className="mac-font flex h-full w-full items-center justify-center rounded-[9px] bg-gradient-to-b from-[#2d7bdc] to-[#185abd] text-[15px] font-bold text-white" aria-hidden="true">
      W
    </span>
  )
}
function NotesIcon() {
  return (
    <span className="block h-full w-full overflow-hidden rounded-[9px] bg-white" aria-hidden="true">
      <span className="block h-1/3 w-full bg-[#ffd60a]" />
      <span className="mx-auto mt-[3px] block h-[2px] w-3/5 rounded bg-black/15" />
      <span className="mx-auto mt-[3px] block h-[2px] w-3/5 rounded bg-black/15" />
      <span className="mx-auto mt-[3px] block h-[2px] w-2/5 rounded bg-black/15" />
    </span>
  )
}
function SpotifyIcon() {
  return (
    <span className="relative flex h-full w-full items-center justify-center rounded-[9px] bg-[#1ed760]" aria-hidden="true">
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
      className="flex h-full w-full items-center justify-center rounded-[9px]"
      style={{
        background:
          'conic-gradient(from 20deg, #f9d423, #8bc34a, #29b6f6, #7e57c2, #ec407a, #ff7043, #f9d423)',
      }}
      aria-hidden="true"
    >
      <span className="block h-1/3 w-1/3 rounded-full bg-white/90" />
    </span>
  )
}
function RemindersIcon() {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-[9px] bg-white" aria-hidden="true">
      <span className="flex flex-col gap-[3px]">
        {['#f26b3a', '#1f7cf6', '#e7a33d'].map((c) => (
          <span key={c} className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
            <span className="h-[2px] w-3 rounded bg-black/20" />
          </span>
        ))}
      </span>
    </span>
  )
}
function MailIcon() {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-[9px] bg-gradient-to-b from-[#4da3ff] to-[#1f7cf6]" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <rect x="2" y="5" width="20" height="14" rx="2" fill="white" />
        <path d="M3 6.5 L12 13 L21 6.5" fill="none" stroke="#1f7cf6" strokeWidth="1.6" />
      </svg>
    </span>
  )
}
function TrashIcon() {
  return (
    <span className="relative flex h-full w-full items-end justify-center rounded-[9px] bg-gradient-to-b from-[#e8e6ea] to-[#b9b5bf] pb-1" aria-hidden="true">
      <span className="relative h-4 w-3 rounded-[2px] bg-gradient-to-b from-[#9d98a4] to-[#7c7683]">
        <span className="absolute -top-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded bg-[#8b8592]" />
      </span>
    </span>
  )
}

/* ---------- main ---------- */

export function OpenTabs({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [manual, setManual] = useState(false)
  const [active, setActive] = useState<WinId>('word')
  const [safariTab, setSafariTab] = useState<SafariTab>('nifty')
  const [wins, setWins] = useState(initialWins)
  const [dragId, setDragId] = useState<WinId | null>(null)
  const dragStart = useRef({ x: 0, y: 0, dx: 0, dy: 0 })
  const [reduced, setReduced] = useState(false)
  const [par, setPar] = useState({ x: 0, y: 0 })

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

  // Cursor parallax over the screen
  useEffect(() => {
    const el = screenRef.current
    if (!el) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        setPar({
          x: ((e.clientX - r.left) / r.width - 0.5) * 2,
          y: ((e.clientY - r.top) / r.height - 0.5) * 2,
        })
      })
    }
    const onLeave = () => setPar({ x: 0, y: 0 })
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const p = reduced || manual ? 1 : progress
  const open = Math.min(p / 0.24, 1)
  const sceneTilt = 40 * (1 - open)
  const lidAngle = -90 + open * 90
  const screenOn = Math.min(Math.max((p - 0.05) / 0.14, 0), 1)
  const sceneOpacity = reduced || manual ? 1 : Math.min(Math.max((p - 0.05) / 0.035, 0), 1)
  const closedOpacity = 1 - sceneOpacity
  const notiIn = p > 0.34
  const unlocked = manual || p > 0.52
  const lockOpacity = unlocked ? 0 : Math.min(Math.max((p - 0.22) / 0.12, 0), 1)
  const aluOpacity = Math.max(1 - open * 2.4, 0)

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
  }

  // Window drag via document-level listeners (robust inside the 3D context)
  useEffect(() => {
    if (!dragId) return
    const move = (e: PointerEvent) => {
      setWins((prev) => ({
        ...prev,
        [dragId]: {
          ...prev[dragId],
          dx: dragStart.current.dx + e.clientX - dragStart.current.x,
          dy: dragStart.current.dy + e.clientY - dragStart.current.y,
        },
      }))
    }
    const up = () => setDragId(null)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [dragId])

  const menu = unlocked ? MENUS[active] : MENUS.finder
  // wallpaper parallax offsets
  const wpx = par.x * -6
  const wpy = par.y * -6

  return (
    <div ref={sectionRef} className={cn('relative h-[220vh]', className)}>
      <div className="relative flex h-screen flex-col items-center justify-center px-2 sticky top-0">
        {/* ---------- CLOSED LAPTOP (floating, flat overlay) ---------- */}
        <div
          className="absolute inset-0 z-[80] flex items-center justify-center"
          style={{ opacity: closedOpacity, pointerEvents: 'none' }}
          aria-hidden={closedOpacity < 0.5}
        >
          <div className="mac-float w-full max-w-[560px] px-6">
            <div
              className="mac-lid-surface relative flex items-center justify-center rounded-[18px] border border-black/10"
              style={{ aspectRatio: '16 / 10.6' }}
            >
              <span className="mac-engrave font-serif text-[34px] italic tracking-wide">
                N—P
              </span>
            </div>
            <div className="relative mx-auto -mt-px h-2.5 w-[103%] -translate-x-[1.5%] rounded-b-[10px] mac-lid-base border border-t-0 border-black/10">
              <span className="absolute left-1/2 top-0 h-1 w-[16%] -translate-x-1/2 rounded-b-full bg-black/15" />
            </div>
            <div className="mac-float-shadow mx-auto mt-7 h-4 w-[70%] rounded-[50%] bg-black/45 blur-xl" />
          </div>
        </div>

        <div
          className="relative w-full max-w-[760px]"
          style={{ perspective: '1500px', opacity: sceneOpacity }}
        >
          {/* ---------- 3D MACHINE ---------- */}
          <div
            className="relative"
            style={{ transform: `rotateX(${sceneTilt}deg)`, transformStyle: 'preserve-3d' }}
          >
            {/* Lid */}
            <div
              className="relative"
              style={{
                transform: `rotateX(${lidAngle}deg)`,
                transformOrigin: 'bottom',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                ref={screenRef}
                className="rounded-t-[14px] bg-[#141017] p-[6px] pb-0"
                style={{ backfaceVisibility: 'hidden' }}
                onClick={() => !unlocked && setManual(true)}
              >
                <div className="mac-sunset relative aspect-[16/10] cursor-pointer overflow-hidden rounded-t-[9px]">
                  {/* wallpaper parallax layer (glow only, so edges never show) */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      transform: `translate(${wpx}px, ${wpy}px)`,
                      background:
                        'radial-gradient(70% 45% at 50% 72%, rgba(255,206,140,0.55), transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-50 bg-black transition-opacity duration-200"
                    style={{ opacity: 1 - screenOn }}
                  />
                  {/* aluminum lid-top while nearly closed */}
                  <div
                    className="mac-alu pointer-events-none absolute inset-0 z-[60] flex items-center justify-center"
                    style={{ opacity: aluOpacity }}
                    aria-hidden="true"
                  >
                    <span className="mac-engrave font-serif text-3xl italic">N—P</span>
                  </div>

                  {/* menu bar */}
                  <div
                    className="mac-glass-dark absolute inset-x-0 top-0 z-40 flex h-6 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[10px] font-medium text-white/90"
                    style={{ opacity: screenOn }}
                  >
                    <span className="mac-font flex items-center gap-3">
                      <span aria-hidden="true"></span>
                      {menu.map((m, i) => (
                        <span key={m} className={cn(i === 0 && 'font-bold', i > 2 && 'hidden sm:inline')}>
                          {m}
                        </span>
                      ))}
                    </span>
                    <span className="mac-font">
                      <Clock />
                    </span>
                  </div>

                  {/* mountains, parallaxed a touch more */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[30%] bg-[#301538]/50"
                    style={{
                      transform: `translate(${wpx * 1.6}px, 0)`,
                      clipPath: 'polygon(0 62%, 10% 44%, 22% 58%, 34% 34%, 47% 56%, 60% 40%, 73% 60%, 86% 46%, 100% 58%, 100% 100%, 0 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[22%] bg-[#1f0d26]/80"
                    style={{
                      transform: `translate(${wpx * 2.4}px, 0)`,
                      clipPath: 'polygon(0 70%, 14% 48%, 30% 66%, 46% 42%, 62% 64%, 78% 50%, 92% 66%, 100% 56%, 100% 100%, 0 100%)',
                    }}
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
                          <span className="relative flex h-8 w-8 flex-none items-center justify-center">
                            {n.app === 'Mail' ? <MailIcon /> : <RemindersIcon />}
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
                      <span className="mac-glass flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl italic text-white/90">
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
                        return (
                          <div
                            key={w.id}
                            data-active={isActive}
                            className={cn(
                              'mac-window absolute w-[86%] sm:w-[78%]',
                              dragId === w.id
                                ? 'transition-none'
                                : 'transition-[top,left,width] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
                            )}
                            style={{
                              left: st.max ? '0%' : CASCADE_LEFT[i],
                              top: st.max ? '0px' : `${i * 40}px`,
                              width: st.max ? '100%' : undefined,
                              transform: st.max ? undefined : `translate(${st.dx}px, ${st.dy}px)`,
                              zIndex: 10 + i,
                            }}
                            onPointerDownCapture={() => setActive(w.id)}
                          >
                            <div
                              className="flex touch-none select-none items-center gap-2.5 border-b border-black/10 bg-[#ece9e6] px-3 py-2"
                              style={{ cursor: dragId === w.id ? 'grabbing' : 'grab' }}
                              onPointerDown={onTitleDown(w.id)}
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
                            {isActive &&
                              (w.id === 'word' ? (
                                <WordBody />
                              ) : w.id === 'notes' ? (
                                <NotesBody />
                              ) : (
                                <SafariBody tab={safariTab} setTab={setSafariTab} />
                              ))}
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
                        <DockTile label="Safari" onClick={() => launch('safari')} indicator={!wins.safari.closed && !wins.safari.min}>
                          <SafariIcon />
                        </DockTile>
                        <DockTile label="Word" onClick={() => launch('word')} indicator={!wins.word.closed && !wins.word.min}>
                          <WordIcon />
                        </DockTile>
                        <DockTile label="Notes" onClick={() => launch('notes')} indicator={!wins.notes.closed && !wins.notes.min}>
                          <NotesIcon />
                        </DockTile>
                        <DockTile label="Spotify"><SpotifyIcon /></DockTile>
                        <DockTile label="Photos"><PhotosIcon /></DockTile>
                        <DockTile label="Reminders"><RemindersIcon /></DockTile>
                        <DockTile label="Mail" badge="1"><MailIcon /></DockTile>
                        <span className="mx-0.5 mb-1.5 h-8 w-px bg-white/30" aria-hidden="true" />
                        <DockTile label="Trash"><TrashIcon /></DockTile>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* keyboard deck */}
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
          {closedOpacity > 0.5
            ? 'Scroll to open the laptop'
            : !unlocked
              ? 'Scroll to unlock — or click the screen'
              : 'Drag the windows · click a title to bring it forward'}
        </p>
      </div>
    </div>
  )
}
