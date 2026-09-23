/* ------------------------------------------------------------------
   HOME INTRO
   Prose on the left of the allocation donut. The page otherwise goes
   straight from a name to a chart with nothing said in between.

   Named for where it sits rather than what it currently says, so the
   copy can change without the file lying about itself.

   One display line (the greeting, rose serif italic), then two short
   paragraphs in the serif at reading size, split by a short rose rule.
   The specifics are the whole point: "kulhad wali chai" does more work
   than any positioning language could.
   ------------------------------------------------------------------ */
/* Body back in the sans. 17px, not the serif's 20px: Cormorant has a much
   smaller x-height, so 17px Archivo reads at about the same size. */
const BODY =
  'm-0 max-w-[29rem] font-sans text-[17px] leading-[1.6] text-foreground/80'

export function HomeIntro({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="About me">
      <p className="m-0 font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium italic leading-[1.1] text-rose">
        hi, i’m nandini :)
      </p>
      <p className={`${BODY} mt-2`}>
        by day i work in finance and spend a lot of time around AI and
        automation.
      </p>

      <span aria-hidden="true" className="my-5 block h-[1.5px] w-10 bg-rose" />

      <p className={BODY}>
        apart from that, i get randomly obsessed with things: researching
        some random history topic that is completely unrelated to me, finding
        a new place to eat, going to a lecture, or sitting somewhere with a
        kulhad wali chai.
      </p>
    </section>
  )
}
