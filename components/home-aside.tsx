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
