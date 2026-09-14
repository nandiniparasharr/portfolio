/* ------------------------------------------------------------------
   THE BRAIN
   A filled doodle: pale rose body, deeper rose outline, folds drawn over
   the fill, and a dotted line down the middle dividing left from right.

   Viewed from above rather than side-on. A side profile is the prettier
   drawing, but only this angle has a left and a right half to divide,
   which is the whole point of the piece.

   Colour comes from the site's own tokens, so it follows the theme with
   no palette of its own: --np-rose-tint is the body, --np-rose the line.
   Both are overridable per instance, for tinting one hemisphere later.

   The two hemispheres are separate <g> elements from the start — later
   steps hang things off one side or the other, and splitting a single
   path after the fact is far more work than keeping them apart now.
   ------------------------------------------------------------------ */

/* Line weights, in viewBox units. The drawing renders about 1.7x, so a
   width of 3 lands near 5px on screen. Kept together and named because
   they are the first thing to reach for when the drawing reads too heavy
   or too faint: outline slightly above folds, folds above the divide. */
const W_OUTLINE = 3
const W_FOLD = 2.4
const W_DIVIDE = 2.2

/** One hemisphere. `side` mirrors the same geometry rather than restating
    it, so the halves stay symmetrical by construction. */
function Hemisphere({ side }: { side: 'left' | 'right' }) {
  const flip = side === 'right'
  return (
    <g
      /* the mirror pivots on the midline at x=200 */
      transform={flip ? 'translate(400 0) scale(-1 1)' : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Body. The path is left open at the midline on purpose: SVG fills an
          open subpath as though it were closed, but strokes only the segments
          actually drawn. So one element gives a filled half with an outline
          around the outside and nothing down the centre, leaving the middle
          clear for the dotted divide. */}
      <path
        fill="var(--brain-body, var(--np-rose-tint))"
        stroke="var(--brain-line, var(--np-rose))"
        strokeWidth={W_OUTLINE}
        d="M200 42
           C174 34 148 40 138 60
           C112 48 86 62 88 84
           C62 84 46 104 54 124
           C34 138 36 164 56 174
           C46 194 58 216 80 220
           C84 240 104 252 126 246
           C142 258 166 260 180 250
           C188 258 194 262 200 262"
      />

      {/* Folds, over the fill. Thinner than the outline, the way the gyri sit
          inside the silhouette in the reference. Each stops well short of
          x=200: drawn to the midline, mirroring closes every pair into a ring
          straddling the divide, and the whole thing reads as a tree. */}
      <g
        fill="none"
        stroke="var(--brain-line, var(--np-rose))"
        strokeWidth={W_FOLD}
      >
        <path d="M182 72 C152 74 136 92 144 110 C150 124 170 128 182 120" />
        <path d="M182 142 C150 138 122 152 122 174 C122 192 142 204 162 200" />
        <path d="M178 213 C154 213 136 223 139 235" />
        <path d="M160 56 C140 58 128 68 126 82" />
        <path d="M100 112 C92 126 96 142 108 150" />
        <path d="M82 180 C74 194 80 210 92 216" />
        <path d="M64 138 C56 147 56 159 64 168" />
        <path d="M114 226 C126 234 140 236 152 230" />
      </g>
    </g>
  )
}

export function Brain({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      role="img"
      aria-label="A brain, divided down the middle into a left and a right half"
    >
      {/* the doodle floats, so it gets a shadow to sit on */}
      <ellipse
        cx={200}
        cy={284}
        rx={96}
        ry={10}
        fill="var(--brain-line, var(--np-rose))"
        opacity={0.1}
      />

      <Hemisphere side="left" />
      <Hemisphere side="right" />

      {/* The divide. Drawn last so it sits over both halves, and dotted so it
          reads as a notional split rather than another fold. */}
      <line
        x1={200}
        y1={44}
        x2={200}
        y2={258}
        stroke="var(--brain-line, var(--np-rose))"
        strokeWidth={W_DIVIDE}
        strokeLinecap="round"
        strokeDasharray="0.1 12"
        opacity={0.85}
      />
    </svg>
  )
}
