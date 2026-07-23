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

// Fixed home position per window so they read as three distinct windows in a
// tidy down-right cascade (and don't reshuffle when focus changes).
const HOME: Record<WinId, { left: string; top: number }> = {
  safari: { left: '2%', top: 0 },
  notes: { left: '15%', top: 34 },
  word: { left: '28%', top: 68 },
}

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
      <div className="bg-[#e8e6e3] px-4 py-3 sm:px-10 sm:py-4">
        <div className="mx-auto max-w-md bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">
          <h4 className="mac-font m-0 text-[17px] font-bold leading-snug text-black sm:text-[19px]">
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

// Latest available snapshot — edit these figures (or wire a keyed market API)
// and the panel presents them with a live-updating IST timestamp.
const NIFTY = {
  level: '26,215.65',
  change: '+138.20',
  pct: '+0.53%',
  up: true,
}
const MOVERS = [
  ['RELIANCE', '1,304.75', '+0.88%', true],
  ['HDFCBANK', '1,725.40', '+0.55%', true],
  ['ICICIBANK', '1,278.35', '+0.72%', true],
  ['TCS', '4,088.10', '-0.31%', false],
  ['INFY', '1,932.60', '+0.47%', true],
] as const

function NiftyTab() {
  const [ts, setTs] = useState('')
  useEffect(() => {
    const fmt = () =>
      setTs(
        new Intl.DateTimeFormat('en-IN', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
    fmt()
    const id = setInterval(fmt, 30000)
    return () => clearInterval(id)
  }, [])
  const green = '#1d8a4a'
  const red = '#c33b2e'
  return (
    <div className="mac-font bg-white px-5 py-4">
      <div className="flex items-center justify-between">
        <p className="m-0 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-black/45">
          Nifty 50
          <span className="inline-flex items-center gap-1 rounded-full bg-[#eafaf0] px-1.5 py-0.5 text-[9px] font-bold text-[#1d8a4a]">
            <span className="mac-lock h-1.5 w-1.5 rounded-full bg-[#1d8a4a]" />
            LIVE
          </span>
        </p>
        <span suppressHydrationWarning className="text-[10px] text-black/40">
          NSE · {ts} IST
        </span>
      </div>
      <div className="mt-1 grid gap-5 sm:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="m-0 text-[26px] font-bold leading-none text-black">
            {NIFTY.level}
          </p>
          <p className="m-0 mt-1 text-[13px] font-semibold" style={{ color: NIFTY.up ? green : red }}>
            {NIFTY.up ? '▲' : '▼'} {NIFTY.change} ({NIFTY.pct})
          </p>
          <svg viewBox="0 0 200 44" className="mt-2 h-11 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="niftyfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={green} stopOpacity="0.18" />
                <stop offset="1" stopColor={green} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 34 L14 30 L26 33 L40 25 L54 28 L68 19 L82 24 L96 15 L110 21 L124 12 L138 17 L152 8 L166 14 L182 6 L200 10 L200 44 L0 44 Z"
              fill="url(#niftyfill)"
            />
            <path
              d="M0 34 L14 30 L26 33 L40 25 L54 28 L68 19 L82 24 L96 15 L110 21 L124 12 L138 17 L152 8 L166 14 L182 6 L200 10"
              fill="none"
              stroke={green}
              strokeWidth="2"
            />
          </svg>
        </div>
        <div>
          <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-black/45">
            Watchlist
          </p>
          <ul className="m-0 mt-1.5 flex list-none flex-col gap-1.5 p-0">
            {MOVERS.map(([n, px, chg, up]) => (
              <li key={n} className="flex items-baseline justify-between gap-3 text-[12px]">
                <span className="font-semibold text-black/80">{n}</span>
                <span className="text-black/50">{px}</span>
                <span style={{ color: up ? green : red }}>{chg}</span>
              </li>
            ))}
          </ul>
        </div>
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

function ToolbarBtn({ children, dim = false }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <span className={cn('flex h-5 w-5 items-center justify-center', dim ? 'text-black/25' : 'text-black/45')}>
      {children}
    </span>
  )
}

function SafariBody({ tab, setTab }: { tab: SafariTab; setTab: (t: SafariTab) => void }) {
  const tabs: { id: SafariTab; label: string; url: string }[] = [
    { id: 'nifty', label: 'Nifty 50 — NSE', url: 'nseindia.com' },
    { id: 'book', label: 'Zero to One', url: 'books.apple.com' },
  ]
  const url = tabs.find((t) => t.id === tab)?.url ?? ''
  return (
    <div className="mac-font bg-white">
      {/* Safari toolbar */}
      <div className="flex items-center gap-2 border-b border-black/10 bg-[#f6f5f4] px-3 py-1.5">
        {/* sidebar + dropdown chevron */}
        <span className="flex items-center">
          <ToolbarBtn>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <line x1="9" y1="5" x2="9" y2="19" />
            </svg>
          </ToolbarBtn>
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-black/30" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M7 10 L12 15 L17 10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {/* back | forward */}
        <span className="flex items-center gap-1">
          <ToolbarBtn>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 6 L9 12 L15 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
          <span className="h-3.5 w-px bg-black/15" />
          <ToolbarBtn dim>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
        </span>
        {/* centered search pill with refresh */}
        <span className="relative mx-auto flex w-[58%] items-center justify-center gap-1.5 rounded-lg bg-black/[0.07] px-3 py-[5px] text-[11px] text-black/55">
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-black/40" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11 V8 a4 4 0 0 1 8 0 v3" />
          </svg>
          {url}
          <svg viewBox="0 0 24 24" className="absolute right-2 h-3 w-3 text-black/35" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20 11 a8 8 0 1 0 -1.5 5" strokeLinecap="round" />
            <path d="M20 5 V11 H14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {/* right cluster */}
        <span className="flex items-center gap-2">
          <ToolbarBtn>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3 V15 M8 7 L12 3 L16 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12 V20 H18 V12" strokeLinecap="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="12" y1="6" x2="12" y2="18" strokeLinecap="round" />
              <line x1="6" y1="12" x2="18" y2="12" strokeLinecap="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="6" width="12" height="12" rx="2" />
              <rect x="9" y="3" width="12" height="12" rx="2" fill="#f6f5f4" />
            </svg>
          </ToolbarBtn>
        </span>
      </div>

      {/* clean tab bar */}
      <div className="flex items-stretch gap-1.5 border-b border-black/10 bg-[#eceae8] px-2 pt-1.5">
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
              'mac-tab group flex w-40 max-w-[42%] items-center gap-1.5 truncate rounded-t-[7px] px-2.5 py-1.5 text-[11px]',
              tab === t.id ? 'bg-white text-black/80 shadow-[0_-1px_2px_rgba(0,0,0,0.04)]' : 'text-black/45 hover:bg-black/[0.04]',
            )}
          >
            <span className="h-2.5 w-2.5 flex-none rounded-[3px] bg-[#1f7cf6]" />
            <span className="flex-1 truncate text-left">{t.label}</span>
            {tab === t.id && <span className="text-black/30">×</span>}
          </button>
        ))}
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
  if (!big) {
    const label = now
      ? `${now.toLocaleDateString('en-US', { weekday: 'short' })} ${now.getDate()} ` +
        `${now.toLocaleDateString('en-US', { month: 'short' })} ` +
        `${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
      : ''
    return <span suppressHydrationWarning>{label}</span>
  }
  return (
    <div className="pointer-events-none select-none text-center text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
      <p suppressHydrationWarning className="mac-font m-0 text-[2.25rem] font-semibold tracking-tight sm:text-7xl">
        {time}
      </p>
      <p suppressHydrationWarning className="mac-font m-0 mt-0.5 text-[11px] font-medium sm:mt-1 sm:text-sm">
        {now
          ? now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
          : ''}
      </p>
    </div>
  )
}

/* ---------- menu-bar glyphs ---------- */

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
      <path d="M17.6 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.7-3.1.7s-1.6-.7-2.7-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1-.02 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-.02-.01-2.1-.8-2.2-3.2zM15.5 6.3c.6-.7 1-1.7.9-2.7-.9.04-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .08 1.9-.5 2.5-1.2z" />
    </svg>
  )
}

function StatusIcons() {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 } as const
  return (
    <span className="flex items-center gap-[9px] text-white/85">
      {/* swirl / now-playing spiral */}
      <svg viewBox="0 0 24 24" className="h-3 w-3" {...stroke} aria-hidden="true">
        <path d="M12 3 a9 9 0 1 0 9 9 a6.5 6.5 0 1 1 -6.5 -6.5 a4 4 0 1 0 4 4" strokeLinecap="round" />
      </svg>
      {/* sparkle */}
      <svg viewBox="0 0 24 24" className="h-3 w-3" {...stroke} aria-hidden="true">
        <line x1="12" y1="3" x2="12" y2="21" strokeLinecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
        <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
        <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
      </svg>
      {/* bluetooth */}
      <svg viewBox="0 0 24 24" className="h-3.5 w-2.5" {...stroke} aria-hidden="true">
        <path d="M8 8 L16 16 L12 20 V4 L16 8 L8 16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* now playing */}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...stroke} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5 L16 12 L10 15.5 Z" fill="currentColor" stroke="none" />
      </svg>
      {/* screen mirroring */}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...stroke} aria-hidden="true">
        <rect x="3" y="5" width="12" height="9" rx="2" />
        <rect x="9" y="10" width="12" height="9" rx="2" fill="#1b1b2e" />
      </svg>
      {/* focus (crescent) */}
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M20 14.5 A8 8 0 1 1 11 4 a6.5 6.5 0 0 0 9 10.5 z" />
      </svg>
      {/* battery */}
      <span className="flex items-center gap-1" aria-hidden="true">
        <span className="text-[9px]">85%</span>
        <span className="relative flex h-2.5 w-5 items-center rounded-[3px] border border-white/70 px-[1.5px]">
          <span className="h-[6px] rounded-[1px] bg-white/90" style={{ width: '85%' }} />
          <span className="absolute -right-[3px] top-1/2 h-1 w-[2px] -translate-y-1/2 rounded-r bg-white/70" />
        </span>
      </span>
      {/* spotlight */}
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <circle cx="10" cy="10" r="6" />
        <line x1="14.5" y1="14.5" x2="21" y2="21" strokeLinecap="round" />
      </svg>
      {/* control center */}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <rect x="4" y="3" width="7" height="18" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="7" height="18" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7.5" cy="8" r="2" fill="currentColor" />
        <circle cx="16.5" cy="16" r="2" fill="currentColor" />
      </svg>
    </span>
  )
}

/* ---------- dock icons ---------- */

function DockTile({
  children,
  label,
  onClick,
  indicator = false,
  badge,
}: {
  children?: React.ReactNode
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
      <span className="relative block h-[30px] w-[30px] sm:h-11 sm:w-11">
        {/* squircle body clips the icon; badge sits outside */}
        <span className="absolute inset-0 overflow-hidden rounded-[23%] shadow-[0_3px_6px_rgba(0,0,0,0.28)]">
          {children}
        </span>
        {badge && (
          <span className="mac-font absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff3b30] text-[9px] font-bold text-white ring-[1.5px] ring-white/80">
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

/* Real app icons, from /public/mac-icons. */
function AppIcon({
  src,
  fit = 'cover',
  bg,
}: {
  src: string
  fit?: 'cover' | 'contain'
  bg?: string
}) {
  return (
    <span className={cn('flex h-full w-full items-center justify-center', bg)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={fit === 'cover' ? 'h-full w-full object-cover' : 'h-[74%] w-[74%] object-contain'}
      />
    </span>
  )
}

function TrashIcon() {
  return (
    <span className="relative flex h-full w-full items-end justify-center bg-gradient-to-b from-[#f0eef3] to-[#c7c3cd] pb-[15%]" aria-hidden="true">
      {/* lid */}
      <span className="absolute top-[20%] h-[3px] w-[54%] rounded-full bg-[#8b8592]" />
      <span className="absolute top-[13%] h-[3px] w-[20%] rounded-full bg-[#8b8592]" />
      {/* bin with vertical slats */}
      <span className="relative flex h-[54%] w-[42%] overflow-hidden rounded-b-[4px] rounded-t-[1px] bg-gradient-to-b from-[#b0abb7] to-[#847e8c]">
        <span
          className="h-full w-full opacity-60"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 4px)' }}
        />
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
  const [isNarrow, setIsNarrow] = useState(false)
  const lastP = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onNarrow = () => setIsNarrow(mq.matches)
    onNarrow()
    mq.addEventListener('change', onNarrow)
    return () => mq.removeEventListener('change', onNarrow)
  }, [])

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
        // Nothing visual changes once past the unlock point — skip re-renders
        // while both the old and new values sit in that settled band.
        if (p >= 0.5 && lastP.current >= 0.5) return
        lastP.current = p
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
    // Drive parallax through CSS variables (no React re-render per move)
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2
        el.style.setProperty('--wpx', `${x * -6}px`)
        el.style.setProperty('--wpy', `${y * -6}px`)
      })
    }
    const onLeave = () => {
      el.style.setProperty('--wpx', '0px')
      el.style.setProperty('--wpy', '0px')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const p = reduced || manual ? 1 : progress
  const screenOn = reduced ? 1 : Math.min(Math.max((p - 0.04) / 0.14, 0), 1)
  const notiIn = p > 0.3
  const unlocked = manual || p > 0.5
  const lockOpacity = unlocked ? 0 : Math.min(Math.max((p - 0.2) / 0.12, 0), 1)

  const visibleWins = WINDOWS.filter((w) => !wins[w.id].closed && !wins[w.id].min)
  // Background windows stack by cascade depth (higher = further back) so every
  // title bar peeks through; the active window always sits on top.
  const stack = [
    ...visibleWins
      .filter((w) => w.id !== active)
      .sort((a, b) => HOME[a.id].top - HOME[b.id].top),
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

  return (
    <div ref={sectionRef} className={cn('relative h-[220vh]', className)}>
      <div className="relative flex h-screen flex-col items-center justify-center px-2 sticky top-0">
        {/* ---------- CLOSED LAPTOP (floating, flat overlay) ---------- */}
        <div className="relative -mx-7 w-[calc(100%+3.5rem)] pb-[62px] sm:mx-auto sm:w-full sm:max-w-[612px]">
          {/* ---------- DESK (placeholder — details later) ---------- */}
          <div className="absolute inset-x-[-18%] bottom-[-10px] z-0 h-[39px]" aria-hidden="true">
            {/* surface */}
            <div className="absolute inset-x-0 top-0 h-[15px] bg-gradient-to-b from-[#7c6851] to-[#66543f]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/18" />
            {/* front edge */}
            <div className="absolute inset-x-0 bottom-0 top-[15px] bg-gradient-to-b from-[#4c3d2d] to-[#392d20]" />
          </div>
          {/* contact shadow */}
          <div
            className="absolute bottom-[22px] left-1/2 z-0 h-3.5 w-[44%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-md"
            aria-hidden="true"
          />
          {/* stand foot */}
          <div
            className="absolute bottom-[22px] left-1/2 z-[5] h-[11px] w-[38%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#d4d1d7] to-[#8f8b95] shadow-[0_4px_8px_rgba(0,0,0,0.28)]"
            aria-hidden="true"
          />
          {/* stand neck */}
          <div
            className="absolute bottom-[29px] left-1/2 z-[5] h-[36px] w-[12%] -translate-x-1/2 bg-gradient-to-r from-[#9d99a3] via-[#e7e4ea] to-[#9d99a3]"
            aria-hidden="true"
          />

          {/* ---------- MONITOR SCREEN ---------- */}
          <div
            ref={screenRef}
            className="relative z-10 w-full rounded-[16px] bg-gradient-to-b from-[#101013] to-[#050506] p-[6px] shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_18px_40px_rgba(10,5,15,0.42)]"
            onClick={() => !unlocked && setManual(true)}
          >
                <div className="mac-sunset relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[11px] sm:aspect-[16/10]">
                  {/* wallpaper parallax layer (glow only, so edges never show) */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      transform: 'translate(var(--wpx,0px), var(--wpy,0px))',
                      background:
                        'radial-gradient(70% 45% at 50% 72%, rgba(255,206,140,0.55), transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[60] bg-black transition-opacity duration-200"
                    style={{ opacity: 1 - screenOn }}
                  />

                  {/* menu bar */}
                  <div
                    className="mac-glass-dark absolute inset-x-0 top-0 z-40 flex h-6 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[10px] font-medium text-white/90"
                    style={{ opacity: screenOn }}
                  >
                    <span className="mac-font flex items-center gap-3">
                      <AppleLogo />
                      {menu.map((m, i) => (
                        <span key={m} className={cn(i === 0 && 'font-bold', i > 2 && 'hidden sm:inline')}>
                          {m}
                        </span>
                      ))}
                    </span>
                    <span className="mac-font flex items-center gap-2.5">
                      <span className="hidden sm:flex">
                        <StatusIcons />
                      </span>
                      <Clock />
                    </span>
                  </div>

                  {/* mountains, parallaxed a touch more */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[30%] bg-[#301538]/50"
                    style={{
                      transform: 'translate(calc(var(--wpx,0px) * 1.6), 0)',
                      clipPath: 'polygon(0 62%, 10% 44%, 22% 58%, 34% 34%, 47% 56%, 60% 40%, 73% 60%, 86% 46%, 100% 58%, 100% 100%, 0 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[22%] bg-[#1f0d26]/80"
                    style={{
                      transform: 'translate(calc(var(--wpx,0px) * 2.4), 0)',
                      clipPath: 'polygon(0 70%, 14% 48%, 30% 66%, 46% 42%, 62% 64%, 78% 50%, 92% 66%, 100% 56%, 100% 100%, 0 100%)',
                    }}
                  />

                  {/* -------- LOCK SCREEN -------- */}
                  <div
                    className="absolute inset-0 z-30 transition-[opacity,transform] duration-500 will-change-[opacity,transform]"
                    style={{
                      opacity: lockOpacity,
                      transform: unlocked ? 'translateY(-6%)' : 'none',
                      pointerEvents: unlocked ? 'none' : 'auto',
                    }}
                  >
                    <div className="absolute inset-x-0 top-[4%] sm:top-[15%]">
                      <Clock big />
                    </div>

                    <div className="absolute inset-x-4 top-[30%] z-40 mx-auto flex max-w-[15rem] flex-col gap-1.5 sm:inset-x-auto sm:right-3 sm:top-9 sm:mx-0 sm:w-56 sm:max-w-none sm:gap-2">
                      {[
                        { app: 'Mail', badge: true },
                        { app: 'Reminders', badge: false },
                      ].map((n, i) => (
                        <div
                          key={n.app}
                          className={cn('mac-noti mac-glass flex items-center gap-2 rounded-2xl p-2 sm:gap-2.5 sm:p-2.5', notiIn && 'is-in')}
                          style={{ transitionDelay: `${i * 140}ms` }}
                        >
                          <span className="relative block h-7 w-7 flex-none sm:h-8 sm:w-8">
                            <span className="absolute inset-0 overflow-hidden rounded-[22%]">
                              <AppIcon src={n.app === 'Mail' ? '/mac-icons/mail.webp' : '/mac-icons/reminders.png'} />
                            </span>
                            {n.badge && (
                              <span className="mac-font absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff3b30] text-[8px] font-bold text-white ring-[1.5px] ring-white/80 sm:h-4 sm:w-4 sm:text-[9px]">
                                1
                              </span>
                            )}
                          </span>
                          <span className="mac-font min-w-0">
                            <span className="block text-[11px] font-semibold leading-tight text-black/85 sm:text-[12px]">{n.app}</span>
                            <span className="block text-[10px] leading-tight text-black/55 sm:text-[11px]">Notification</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-[4%] mx-auto flex w-max flex-col items-center gap-1 sm:bottom-[9%] sm:gap-1.5">
                      <span className="mac-glass flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg italic text-white/90 sm:h-12 sm:w-12 sm:text-xl">
                        N
                      </span>
                      <span className="mac-font text-[12px] font-semibold text-white/95 drop-shadow sm:text-[13px]">
                        Nandini
                      </span>
                      <svg viewBox="0 0 16 16" className="mac-lock h-3 w-3 text-white/85 sm:h-3.5 sm:w-3.5" aria-hidden="true">
                        <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
                        <path d="M5 7 V5.5 a3 3 0 0 1 6 0 V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  {/* -------- DESKTOP -------- */}
                  <div
                    className="absolute inset-0 z-20 transition-[opacity,transform] duration-500"
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
                              'mac-window absolute',
                              // Mobile: one centered window at a time (the dock
                              // switches apps). Desktop: the cascade.
                              isNarrow ? 'w-full' : 'w-[66%] sm:w-[62%]',
                              !isActive && 'brightness-[0.96]',
                              dragId === w.id
                                ? 'transition-none'
                                : 'transition-[top,left,width] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
                            )}
                            style={{
                              left: st.max || isNarrow ? '0%' : HOME[w.id].left,
                              top: st.max ? '0px' : isNarrow ? '0px' : `${HOME[w.id].top}px`,
                              width: st.max || isNarrow ? '100%' : undefined,
                              // Mobile: shrink the window 15% from the top so its
                              // bottom clears the dock and all content stays readable.
                              transform: st.max
                                ? undefined
                                : isNarrow
                                  ? 'scale(0.85)'
                                  : `translate(${st.dx}px, ${st.dy}px)`,
                              transformOrigin: isNarrow ? 'top center' : undefined,
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
                            {w.id === 'word' ? (
                              <WordBody />
                            ) : w.id === 'notes' ? (
                              <NotesBody />
                            ) : (
                              <SafariBody tab={safariTab} setTab={setSafariTab} />
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Dock */}
                    <div className="absolute bottom-1.5 left-1/2 z-40 w-full max-w-[96%] -translate-x-1/2 sm:bottom-2 sm:w-auto sm:max-w-none">
                      <div className="mac-glass flex items-end justify-center gap-1 rounded-2xl px-1.5 py-1 sm:gap-2 sm:px-2.5 sm:py-1.5">
                        <DockTile label="Finder"><AppIcon src="/mac-icons/finder.png" /></DockTile>
                        <DockTile label="Safari" onClick={() => launch('safari')} indicator={!wins.safari.closed}>
                          <AppIcon src="/mac-icons/safari.jpg" />
                        </DockTile>
                        <DockTile label="Microsoft Word" onClick={() => launch('word')} indicator={!wins.word.closed}>
                          <AppIcon src="/mac-icons/word.webp" fit="contain" bg="bg-white" />
                        </DockTile>
                        <DockTile label="Notes" onClick={() => launch('notes')} indicator={!wins.notes.closed}>
                          <AppIcon src="/mac-icons/notes.png" />
                        </DockTile>
                        <DockTile label="Spotify"><AppIcon src="/mac-icons/spotify.webp" /></DockTile>
                        <DockTile label="Photos"><AppIcon src="/mac-icons/photos.webp" /></DockTile>
                        <DockTile label="Reminders"><AppIcon src="/mac-icons/reminders.png" /></DockTile>
                        <DockTile label="Mail" badge="1"><AppIcon src="/mac-icons/mail.webp" /></DockTile>
                        <span className="mx-0.5 mb-1.5 h-6 w-px bg-white/30 sm:h-8" aria-hidden="true" />
                        <DockTile label="Trash"><TrashIcon /></DockTile>
                      </div>
                    </div>
                  </div>
                </div>

                {/* camera in the top bezel */}
                <span
                  className="pointer-events-none absolute left-1/2 top-[3px] z-[45] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#243448] ring-1 ring-white/10"
                  aria-hidden="true"
                />
              </div>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          {!unlocked
            ? 'Scroll to unlock — or tap the screen'
            : isNarrow
              ? 'Tap the dock to switch apps'
              : 'Drag the windows · click a title to bring it forward'}
        </p>
      </div>
    </div>
  )
}
