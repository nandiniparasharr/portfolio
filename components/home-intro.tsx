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
        Many hats
      </SectionLabel>

      <p className="m-0 max-w-md font-serif text-[clamp(1.5rem,2.7vw,2.05rem)] leading-[1.18] text-foreground">
        I wear a lot of hats, often at the same time.
      </p>

      <p className="m-0 mt-7 max-w-md text-muted-foreground">
        My 9 to 5 is AI, workflows and the fancier end of corporate problem
        solving, and I like it more than that sentence makes it sound.
        Everything after that is less organised. I read, I write, I sing. I
        watch too much YouTube and then put Netflix on anyway.
      </p>

      <p className="m-0 mt-4 max-w-md text-muted-foreground">
        Every few weeks I end up three tabs deep in some bit of history I have
        no reason to be reading about, and I stay there until something else
        grabs me. I’ll go to a lecture on almost anything. I like finding new
        places, usually somewhere to eat, often just for the chai. A good
        kulhad wali chai will get me across the city.
      </p>

      <p className="m-0 mt-4 max-w-md text-muted-foreground">
        None of it is a plan. I get curious, I follow it, and some of it ends
        up here.
      </p>
    </section>
  )
}
