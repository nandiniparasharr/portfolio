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

      <p className="m-0 max-w-md font-serif text-[clamp(1.5rem,2.7vw,2.05rem)] leading-[1.18] text-foreground">
        Well, Hello :)
      </p>

      <p className="m-0 mt-7 max-w-md text-muted-foreground">
      hi, i’m nandini. by day, i work in finance and spend a lot of time around AI and automation.
      apart from that, i usually keep picking up things that i find intriguing, it could be 
      researching some random history topic that is completely unrelated to me, finding a new place to eat, 
      going to a lecture, or sitting somewhere with a kulhad wali chai.
         
      </p>
    </section>
  )
}
