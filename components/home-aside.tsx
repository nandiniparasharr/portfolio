import { LLink } from '@/components/ledger'
import { site } from '@/lib/content'

/* ------------------------------------------------------------------
   HOME ASIDE
   Sits to the right of the long/short notes. Named for where it sits
   rather than what it holds, so it can change without the file lying
   about itself.

   The page's forward step: the intro and the notes have said who she
   is, so this points at the work, with the CV alongside for the reader
   who wants the formal version instead.

   Both buttons are size md — a step down from the lg they started at,
   which is the ~20% the pink button was asked to lose — and sharing a
   size keeps the pair the same height side by side.
   ------------------------------------------------------------------ */
export function HomeAside({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="See the work">
      {/* The "currently" line sits right above the buttons, black, with a
          mono micro-cap label. Text is a placeholder to edit. */}
      <p className="mb-5 max-w-[34ch] text-[15px] leading-[1.5] text-foreground">
        <span className="mr-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em]">
          Currently
        </span>
        half in a spreadsheet, half down a rabbit hole.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <LLink href="/work" variant="primary" size="md">
          See my work <span className="np-arrow">→</span>
        </LLink>
        <LLink href={site.resume} variant="secondary" size="md">
          CV ↗
        </LLink>
      </div>
    </section>
  )
}
