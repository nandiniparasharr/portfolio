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
      {/* No heading: the greeting is the opening words themselves, set in
          rose and a step up so they do the job "Well, Hello" used to. */}
      <p className="m-0 max-w-[31.5rem] text-[16px] leading-[1.6] text-muted-foreground">
        <span className="text-[1.25em] font-medium text-rose">
          hi, i’m nandini
        </span>
        , and by day i work in finance and spend a lot of time around AI and
        automation.
      </p>

      <p className="m-0 mt-4 max-w-[31.5rem] text-[16px] leading-[1.6] text-muted-foreground">
        apart from that, i get randomly obsessed with things: researching some
        random history topic that is completely unrelated to me, finding a new
        place to eat, going to a lecture, or sitting somewhere with a kulhad
        wali chai.
      </p>
    </section>
  )
}
