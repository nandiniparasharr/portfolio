/* ------------------------------------------------------------------
   HOME ASIDE
   The line that sits to the right of the long/short notes. Named for
   where it sits rather than what it says, so the copy can change
   without the file lying about itself.

   It is one sentence in a column wide enough for four, so it is set in
   the serif at the size of a heading rather than left as a stray line
   of body copy with a lot of paper around it.
   ------------------------------------------------------------------ */
export function HomeAside({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="What this site is">
      <p className="m-0 max-w-md font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.25] text-foreground">
        so yeah, this website is a little bit of all of that.
      </p>
    </section>
  )
}
