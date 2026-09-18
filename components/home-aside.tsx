/* ------------------------------------------------------------------
   HOME ASIDE
   The prose that sits to the right of the long/short notes. Named for
   where it sits rather than what it says, so the copy can change
   without the file lying about itself.

   The lowercase is Nandini's own, written that way on purpose. It is
   the only copy on the site that runs like a note to herself, which is
   the point of it sitting next to a notebook.
   ------------------------------------------------------------------ */
export function HomeAside({ className }: { className?: string }) {
  return (
    <section className={className} aria-label="What I keep doing">
      <p className="m-0 max-w-md text-muted-foreground">
        i get randomly obsessed with things. sometimes i’ll spend hours
        reading about something i came across five minutes ago. sometimes
        i’ll want to build something. sometimes i’ll want to write. sometimes
        i’ll just want to go somewhere i’ve never been before.
      </p>

      <p className="m-0 mt-4 max-w-md text-muted-foreground">
        that’s pretty much me. i’m curious about a lot of things and i like
        keeping myself busy with whatever happens to interest me at the time.
      </p>

      <p className="m-0 mt-4 max-w-md text-muted-foreground">
        so yeah, this website is a little bit of all of that.
      </p>
    </section>
  )
}
