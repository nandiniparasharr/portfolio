import { SectionLabel } from '@/components/ledger'

/* ------------------------------------------------------------------
   HOME INTRO
   Prose on the left of the allocation donut. The page otherwise goes
   straight from a name to a chart with nothing said in between.

   Named for where it sits rather than what it currently says, so the
   copy can change without the file lying about itself.

   The specifics are the whole point. "Kulhad wali chai" does more work
   than any amount of positioning language, because nobody else's
   portfolio says it.
   ------------------------------------------------------------------ */
export function HomeIntro({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="About me">
      <SectionLabel tone="muted" className="mb-6">

      </SectionLabel>

      {/* -25% from the old clamp: 1.5/2.7/2.05 -> 1.125/2.025/1.5375. */}
      <p className="m-0 max-w-md font-serif text-[clamp(1.125rem,2.025vw,1.5375rem)] leading-[1.2] text-foreground">
        Well, Hello :)
      </p>

      {/* Both lines again, at 16px — a quarter down from the 21px they briefly
          ran at. The explicit size beats the .np-positions rule on
          specificity, so it holds. */}
      <p className="m-0 mt-6 max-w-[35rem] text-[16px] leading-[1.6] text-muted-foreground">
        hi, i’m nandini, and by day i work in finance and spend a lot of time
        around AI and automation.
      </p>

      <p className="m-0 mt-4 max-w-[35rem] text-[16px] leading-[1.6] text-muted-foreground">
        apart from that, i get randomly obsessed with things: researching some
        random history topic that is completely unrelated to me, finding a new
        place to eat, going to a lecture, or sitting somewhere with a kulhad
        wali chai.
      </p>
    </section>
  )
}
