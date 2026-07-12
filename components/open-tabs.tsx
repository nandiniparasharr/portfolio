'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  {
    id: 'Research',
    tabs: [
      'dmart_company_profile.pdf',
      'distressed_assets_notes.xlsx',
      'nifty_500_screener.xlsx',
      '“how incentives work”',
    ],
  },
  {
    id: 'Code',
    tabs: [
      'portfolio_prism.py',
      'excel_automation.py',
      'genai_workflow_notes.md',
    ],
  },
  {
    id: 'Writing',
    tabs: [
      'draft_substack_essay.md',
      'headline_ideas.txt',
      '“words that earn the click”',
    ],
  },
  {
    id: 'Ideas',
    tabs: [
      'personal_brand_engine.md',
      'side_quest_backlog.txt',
      '“what compounds besides money”',
    ],
  },
  {
    id: 'Reading',
    tabs: [
      'current_book — ask me',
      'annual_reports_pile.pdf',
      '“books that rewire you”',
    ],
  },
] as const

/** What's open in my head, filed under browser tabs. × closes; I reopen. */
export function OpenTabs({ className }: { className?: string }) {
  const [active, setActive] = useState<string>('All')
  const [closed, setClosed] = useState<Set<string>>(new Set())

  const groups =
    active === 'All' ? CATEGORIES : CATEGORIES.filter((c) => c.id === active)
  const shown = groups.flatMap((g) => g.tabs.filter((t) => !closed.has(t)))

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Open tabs categories"
        className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              '-mb-px border-b pb-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-150',
              active === c.id
                ? 'border-rose text-rose'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {c.id}
          </button>
        ))}
      </div>

      <div className="border border-t-0 border-border bg-card px-5 pb-4 pt-4 shadow-card">
        <p className="m-0 flex items-baseline justify-between border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Open tabs
          <span>{shown.length}</span>
        </p>
        {shown.length === 0 ? (
          <p className="m-0 py-6 font-serif text-lg italic text-muted-foreground">
            All caught up — for once.
          </p>
        ) : (
          shown.map((tab) => (
            <div
              key={tab}
              className="group flex items-baseline justify-between gap-4 border-b border-border py-2.5"
            >
              <span className="font-mono text-xs text-foreground transition-colors duration-150 group-hover:text-rose">
                {tab}
              </span>
              <button
                type="button"
                aria-label={`Close ${tab}`}
                onClick={() =>
                  setClosed((prev) => new Set(prev).add(tab))
                }
                className="font-mono text-xs text-faint transition-colors duration-150 hover:text-rose"
              >
                ×
              </button>
            </div>
          ))
        )}
        <div className="flex justify-between pt-3">
          <button
            type="button"
            onClick={() => setActive('All')}
            className={cn(
              'font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150',
              active === 'All'
                ? 'text-rose'
                : 'border-b border-current pb-0.5 text-plum hover:text-rose',
            )}
          >
            {active === 'All' ? 'All tabs open' : 'View all tabs →'}
          </button>
          {closed.size > 0 && (
            <button
              type="button"
              onClick={() => setClosed(new Set())}
              className="border-b border-current pb-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-plum transition-colors duration-150 hover:text-rose"
            >
              Reopen all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
