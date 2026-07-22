'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/content'

/* A Mac desktop for the inside of my head. Click the thought. */

type Tab = {
  name: string
  cat: 'Research' | 'Code' | 'Writing' | 'Ideas' | 'Reading'
  note: string
  href?: string
  featured?: boolean
}

const TABS: Tab[] = [
  { name: 'dmart_company_profile.pdf', cat: 'Research', note: 'Five years of DMart, compressed to one page.', href: '/work/avenue-supermarts', featured: true },
  { name: 'distressed_assets_notes.xlsx', cat: 'Research', note: '25+ NCLT cases screened. Some were even good.' },
  { name: 'nifty_500_screener.xlsx', cat: 'Research', note: 'Watchlist mechanics, forever a work in progress.' },
  { name: '“how incentives work”', cat: 'Research', note: 'A search I never really close.' },
  { name: 'portfolio_prism.py', cat: 'Code', note: 'The robo-advisor read on any portfolio.', href: '/work/portfolio-prism', featured: true },
  { name: 'excel_automation.py', cat: 'Code', note: 'The workflow that got management’s attention.', featured: true },
  { name: 'genai_workflow_notes.md', cat: 'Code', note: 'Prompts that survived contact with reality.' },
  { name: 'draft_substack_essay.md', cat: 'Writing', note: 'Nine drafts. One survivor.', href: site.substack, featured: true },
  { name: 'headline_ideas.txt', cat: 'Writing', note: 'Words auditioning for the click.' },
  { name: '“words that earn the click”', cat: 'Writing', note: 'Research, allegedly.' },
  { name: 'personal_brand_engine.md', cat: 'Ideas', note: 'A repeatable content system, one useful post at a time.', featured: true },
  { name: 'side_quest_backlog.txt', cat: 'Ideas', note: 'Longer than the done list. As it should be.' },
  { name: '“what compounds besides money”', cat: 'Ideas', note: 'Working theory: almost everything.' },
  { name: 'current_book', cat: 'Reading', note: 'Ask me — it changes weekly.', featured: true },
  { name: 'annual_reports_pile.pdf', cat: 'Reading', note: 'Bedtime stories.' },
  { name: '“books that rewire you”', cat: 'Reading', note: 'Always accepting recommendations.' },
]

const CATS = ['Research', 'Code', 'Writing', 'Ideas', 'Reading'] as const

const CAT_CHIP: Record<string, string> = {
  Research: 'bg-forest-tint text-forest',
  Code: 'bg-plum-tint text-plum',
  Writing: 'bg-rose-tint text-rose',
  Ideas: 'bg-ember-tint text-ember',
  Reading: 'bg-sunken text-muted-foreground',
}
const CAT_FOLDER: Record<string, string> = {
  Research: 'bg-forest/80',
  Code: 'bg-plum/80',
  Writing: 'bg-rose/80',
  Ideas: 'bg-ember/80',
  Reading: 'bg-[#8d7f8a]/80',
}

function Clock() {
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
  const date = now
    ? now.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : ''
  return (
    <div className="pointer-events-none select-none text-center text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
      <p
        suppressHydrationWarning
        className="m-0 text-6xl font-light tracking-tight sm:text-7xl"
      >
        {time}
      </p>
      <p suppressHydrationWarning className="m-0 mt-1 text-sm font-medium">
        {date}
      </p>
    </div>
  )
}

/** Hand-drawn-ish thought bubble. */
function ThoughtBubble({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? 'Close open tabs' : 'Open my open tabs'}
      className="mac-bubble group absolute bottom-6 left-1/2 z-30 -translate-x-1/2 cursor-pointer"
    >
      <span className="relative block">
        <span className="mac-glass flex h-14 w-24 items-center justify-center rounded-[999px] font-serif text-xl italic text-foreground">
          {open ? '×' : '5+'}
        </span>
        <span className="mac-glass absolute -bottom-2.5 left-4 block h-3 w-3 rounded-full" />
        <span className="mac-glass absolute -bottom-5 left-1 block h-1.5 w-1.5 rounded-full" />
      </span>
    </button>
  )
}

export function OpenTabs({ className }: { className?: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cat, setCat] = useState<string | null>(null)
  const [peek, setPeek] = useState<Tab | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPeek(null)
        setOpen(false)
        setCat(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shown = cat
    ? TABS.filter((t) => t.cat === cat)
    : TABS.filter((t) => t.featured)

  const openTab = (tab: Tab) => {
    if (tab.href) {
      if (tab.href.startsWith('http')) window.open(tab.href, '_blank')
      else router.push(tab.href)
    } else {
      setPeek(tab)
    }
  }

  return (
    <div className={cn('mx-auto w-full max-w-3xl', className)}>
      {/* Laptop bezel */}
      <div className="rounded-[20px] bg-inverse p-2 shadow-pop sm:p-2.5">
        <div className="mac-wallpaper relative aspect-[16/10] overflow-hidden rounded-[12px]">
          {/* Menu bar */}
          <div className="mac-glass absolute inset-x-0 top-0 z-20 flex h-7 items-center justify-between rounded-none border-x-0 border-t-0 px-3 font-mono text-[9px] uppercase tracking-[0.08em] text-foreground/80">
            <span className="flex items-center gap-3">
              <span className="font-serif normal-case italic">N—P</span>
              <span className="hidden gap-3 sm:flex">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Go</span>
                <span>Help</span>
              </span>
            </span>
            <span>Inside my brain</span>
          </div>

          {/* Clock */}
          <div
            className={cn(
              'absolute inset-x-0 top-[22%] transition-opacity duration-300',
              open && 'opacity-25',
            )}
          >
            <Clock />
          </div>

          {/* Fan of cards */}
          {open && (
            <div
              className="absolute inset-x-0 bottom-24 top-10 z-20"
              onClick={() => setPeek(null)}
            >
              {shown.map((tab, i) => {
                const mid = (shown.length - 1) / 2
                const off = i - mid
                return (
                  <button
                    key={`${cat}-${tab.name}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      openTab(tab)
                    }}
                    className="fan-card mac-glass absolute bottom-0 left-1/2 flex h-36 w-28 flex-col justify-between rounded-xl p-3 text-left sm:h-40 sm:w-32"
                    style={{
                      ['--fan-rot' as string]: `${off * 10}deg`,
                      ['--fan-x' as string]: `${off * 58}px`,
                      ['--fan-y' as string]: `${Math.abs(off) * 14}px`,
                      ['--fan-delay' as string]: `${i * 45}ms`,
                      zIndex: 20 - Math.abs(off),
                    }}
                  >
                    <span
                      className={cn(
                        'self-start px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]',
                        CAT_CHIP[tab.cat],
                      )}
                    >
                      {tab.cat}
                    </span>
                    <span className="break-words font-mono text-[10px] leading-snug text-foreground">
                      {tab.name}
                    </span>
                    <span className="font-mono text-[9px] text-faint">
                      {tab.href ? 'Open →' : 'Peek ▾'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Quick Look */}
          {peek && (
            <div className="absolute inset-0 z-40" onClick={() => setPeek(null)}>
              <div
                role="dialog"
                aria-label={peek.name}
                onClick={(e) => e.stopPropagation()}
                className="mac-quicklook mac-glass absolute left-1/2 top-1/2 w-64 rounded-2xl p-5 sm:w-72"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em]',
                      CAT_CHIP[peek.cat],
                    )}
                  >
                    {peek.cat}
                  </span>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setPeek(null)}
                    className="font-mono text-sm text-faint hover:text-rose"
                  >
                    ×
                  </button>
                </div>
                <p className="m-0 mt-3 break-words font-mono text-xs text-foreground">
                  {peek.name}
                </p>
                <p className="m-0 mt-2 font-serif text-lg italic leading-snug text-muted-foreground">
                  {peek.note}
                </p>
              </div>
            </div>
          )}

          {/* Thought bubble (hidden while fan is open on small screens) */}
          {!open && <ThoughtBubble open={open} onClick={() => setOpen(true)} />}

          {/* Dock */}
          {open && (
            <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
              <div className="mac-glass flex items-end gap-2 rounded-2xl px-3 py-2">
                {CATS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCat((prev) => (prev === c ? null : c))
                      setPeek(null)
                    }}
                    aria-pressed={cat === c}
                    className="group flex flex-col items-center gap-1"
                  >
                    {/* folder */}
                    <span className="relative block h-7 w-9 transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:scale-110">
                      <span
                        className={cn(
                          'absolute left-0 top-0 h-2 w-4 rounded-t-sm',
                          CAT_FOLDER[c],
                        )}
                      />
                      <span
                        className={cn(
                          'absolute bottom-0 left-0 h-5.5 w-full rounded-sm rounded-tl-none',
                          CAT_FOLDER[c],
                        )}
                      />
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/90 drop-shadow">
                      {c}
                    </span>
                    <span
                      className={cn(
                        'h-1 w-1 rounded-full bg-white/90',
                        cat === c ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </button>
                ))}
                <span className="mx-1 h-8 w-px bg-white/30" />
                <button
                  type="button"
                  aria-label="Close tabs"
                  onClick={() => {
                    setOpen(false)
                    setCat(null)
                    setPeek(null)
                  }}
                  className="mb-3 font-mono text-sm text-white/90 transition-colors hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Laptop base */}
      <div className="mx-auto h-1.5 w-1/3 rounded-b-xl bg-inverse/80" />
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        {open ? 'Pick a folder from the dock · Esc closes' : 'Click the thought'}
      </p>
    </div>
  )
}
