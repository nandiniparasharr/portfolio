/* ------------------------------------------------------------------
   HOME INTRO
   Prose on the left of the allocation donut. The page otherwise goes
   straight from a name to a chart with nothing said in between.

   Named for where it sits rather than what it currently says, so the
   copy can change without the file lying about itself.

   Two beats, each a large rose serif line with a small grey line of
   detail under it, split by a short rose rule. The display lines carry
   the voice; the small print carries the specifics ("kulhad wali chai"
   does more work than any positioning language could).
   ------------------------------------------------------------------ */
const DISPLAY =
  'm-0 font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.08] text-rose'
const DETAIL = 'm-0 max-w-[27rem] text-[15px] leading-[1.55] text-muted-foreground'

export function HomeIntro({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="About me">
      <p className={DISPLAY}>hi, i’m nandini,</p>
      <p className={`${DETAIL} mt-2`}>
        and by day i work in finance and spend a lot of time around AI and
        automation.
      </p>

      <span aria-hidden="true" className="my-6 block h-[1.5px] w-10 bg-rose" />

      <p className={`${DISPLAY} max-w-[10em]`}>
        <em>apart from that,</em>
        <br />
        i get randomly obsessed with things.
      </p>
      <p className={`${DETAIL} mt-3`}>
        researching some random history topic that is completely unrelated to
        me, finding a new place to eat, going to a lecture, or sitting
        somewhere with a kulhad wali chai.
      </p>
    </section>
  )
}
