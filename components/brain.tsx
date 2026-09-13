/* ------------------------------------------------------------------
   THE BRAIN
   A doodle, not an anatomical drawing: a lobed outline per hemisphere, a
   few folds inside each, and a dotted line down the middle dividing left
   from right. Drawn in currentColor so it inherits the page's ink and
   needs no theme handling of its own.

   The two hemispheres are separate <g> elements from the start — later
   steps hang things off one side or the other, and splitting a single
   path after the fact is far more work than keeping them apart now.
   ------------------------------------------------------------------ */

/** One hemisphere. `side` mirrors the same geometry rather than restating
    it, so the halves stay symmetrical by construction. */
function Hemisphere({ side }: { side: 'left' | 'right' }) {
  const flip = side === 'right'
  return (
    <g
      /* the mirror pivots on the midline at x=200 */
      transform={flip ? 'translate(400 0) scale(-1 1)' : undefined}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outline, from the top of the midline anticlockwise to the bottom.
          Six shallow lobes: enough to read as a brain, few enough that it
          still reads as a doodle rather than a cauliflower. */}
      <path
        strokeWidth={5}
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

      {/* Folds. Each stops well short of x=200 so that mirroring cannot
          close it into a ring across the midline — two arcs meeting at the
          centre read as a hole, not as a pair of gyri. */}
      <path
        strokeWidth={4.5}
        d="M182 72 C152 74 136 92 144 110 C150 124 170 128 182 120"
      />
      <path
        strokeWidth={4.5}
        d="M182 142 C150 138 122 152 122 174 C122 192 142 204 162 200"
      />
      <path strokeWidth={4.5} d="M178 216 C152 216 132 228 136 242" />

      {/* two short ticks along the outer edge, so the left side is not bare */}
      <path strokeWidth={4.5} d="M100 112 C92 126 96 142 108 150" />
      <path strokeWidth={4.5} d="M82 180 C74 194 80 210 92 216" />
    </g>
  )
}

export function Brain({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="A brain, divided down the middle into a left and a right half"
    >
      <Hemisphere side="left" />
      <Hemisphere side="right" />

      {/* The divide. Drawn last so it sits over both halves, and dotted so it
          reads as a notional split rather than another fold. */}
      <line
        x1={200}
        y1={44}
        x2={200}
        y2={258}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="0.1 12"
        opacity={0.7}
      />
    </svg>
  )
}
