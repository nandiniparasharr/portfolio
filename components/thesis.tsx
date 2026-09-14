import Link from 'next/link'
import { SectionLabel } from '@/components/ledger'

/* ------------------------------------------------------------------
   THE THESIS
   Prose on the left of the allocation donut. The home page otherwise
   goes straight from a name to a chart with nothing said in between,
   so this is the one place that explains the person before the data.

   Deliberately not a restatement of the hero line above it — that one
   is the joke, this is the reasoning behind it.
   ------------------------------------------------------------------ */
export function Thesis({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="The thesis">
      <SectionLabel tone="muted" className="mb-6">
        The thesis
      </SectionLabel>

      <p className="m-0 max-w-md font-serif text-[clamp(1.5rem,2.7vw,2.05rem)] leading-[1.18] text-foreground">
        Finance is the day job. The rest is the same instinct, pointed
        somewhere else.
      </p>

      <p className="m-0 mt-7 max-w-md text-muted-foreground">
        Most of what I make starts as a question I could not let go of. Does a
        ₹20 ice pop actually make money. Where do my study hours really go. Can
        a retail investor get an advisor’s read without paying for an advisor.
      </p>

      <p className="m-0 mt-4 max-w-md text-muted-foreground">
        The answers are{' '}
        <Link
          href="/work"
          className="border-b border-current pb-px text-plum no-underline transition-colors duration-150 hover:text-rose"
        >
          on the work page
        </Link>
        . The questions are the point.
      </p>
    </section>
  )
}
