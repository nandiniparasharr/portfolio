import { LLink } from '@/components/ledger'

/* ------------------------------------------------------------------
   HOME ASIDE
   Sits to the right of the long/short notes. Named for where it sits
   rather than what it holds, so it can change without the file lying
   about itself.

   Now the page's one forward step: the intro and the notes have said
   who she is, so this points at the work.
   ------------------------------------------------------------------ */
export function HomeAside({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="See the work">
      <LLink href="/work" variant="primary" size="lg">
        See my work <span className="np-arrow">→</span>
      </LLink>
    </section>
  )
}
