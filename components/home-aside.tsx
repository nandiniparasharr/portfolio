/* ------------------------------------------------------------------
   HOME ASIDE
   The prose that sits to the right of the long/short notes. Named for
   where it sits rather than what it says, so the copy can change
   without the file lying about itself.

   Set to match the intro paragraph beside the donut above: 21px, the
   same +25% over the band's body size, so the two halves of the page
   read as a pair.
   ------------------------------------------------------------------ */
export function HomeAside({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="What I keep doing">
      <p className="m-0 max-w-[35rem] text-[21px] leading-[1.5] text-muted-foreground">
        apart from that, i get randomly obsessed with things: researching some
        random history topic that is completely unrelated to me, finding a new
        place to eat, going to a lecture, or sitting somewhere with a kulhad
        wali chai.
      </p>
    </section>
  )
}
