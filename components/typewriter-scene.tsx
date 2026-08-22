'use client'

/* The typewriter. Pure SVG so the whole machine scales as one drawing, and
   the sheet in the platen is left blank — whatever goes on the page is laid
   over it by Canvas, the same arrangement the easel used.

   Every colour comes from CSS custom properties set by the colourway class,
   so a variant swap is one attribute and no new markup. The ribbon is the
   one deliberate exception: it is always rose. The system rations rose to a
   single small accent, and a typewriter ribbon is exactly that — the one
   place on the machine where the colour means something. */

const ROW_1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+']
const ROW_2 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '←']
const ROW_3 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"']
const ROW_4 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']

const BED_X = 86
const BED_W = 248
const STEP = 19
const KEY = 16

/** centre a row of n keys inside the keyboard bed */
const rowStart = (n: number) => BED_X + (BED_W - (n * STEP - (STEP - KEY))) / 2

function KeyRow({ keys, y }: { keys: string[]; y: number }) {
  const x0 = rowStart(keys.length)
  return (
    <g>
      {keys.map((k, i) => {
        const x = x0 + i * STEP
        return (
          <g key={`${k}-${i}`}>
            {/* the shadow the key sits in */}
            <rect x={x} y={y + 1.5} width={KEY} height={KEY} rx={5} fill="#0c0c0e" opacity="0.55" />
            <rect x={x} y={y} width={KEY} height={KEY} rx={5} fill="url(#tw-key)" />
            <text
              x={x + KEY / 2}
              y={y + KEY / 2 + 2.6}
              textAnchor="middle"
              fontSize="7"
              fontFamily="var(--font-mono)"
              fill="#55545a"
            >
              {k}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export function TypewriterScene() {
  return (
    <svg
      viewBox="0 0 420 568"
      className="np-scene-svg"
      role="img"
      aria-label="A typewriter with a blank sheet of paper in it"
    >
      <defs>
        {/* the shell: lit from upper left, falling into shadow at the base */}
        <linearGradient id="tw-shell" x1="0.12" y1="0" x2="0.88" y2="1">
          <stop offset="0" stopColor="var(--tw-1)" />
          <stop offset="0.46" stopColor="var(--tw-2)" />
          <stop offset="1" stopColor="var(--tw-3)" />
        </linearGradient>
        <linearGradient id="tw-deck" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="var(--tw-1)" />
          <stop offset="0.62" stopColor="var(--tw-2)" />
          <stop offset="1" stopColor="var(--tw-3)" />
        </linearGradient>
        <linearGradient id="tw-paper" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#fdfcfa" />
          <stop offset="1" stopColor="#f3f1ea" />
        </linearGradient>
        <linearGradient id="tw-platen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4b52" />
          <stop offset="0.4" stopColor="#26272c" />
          <stop offset="1" stopColor="#141519" />
        </linearGradient>
        <linearGradient id="tw-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f3f1" />
          <stop offset="0.5" stopColor="#d3d1cc" />
          <stop offset="1" stopColor="#a9a7a2" />
        </linearGradient>
        <linearGradient id="tw-key" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f5f2" />
          <stop offset="0.62" stopColor="#e6e4df" />
          <stop offset="1" stopColor="#cfccc6" />
        </linearGradient>
        <linearGradient id="tw-paper-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d8878" stopOpacity="0" />
          <stop offset="1" stopColor="#8d8878" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="tw-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#17181b" stopOpacity="0.13" />
          <stop offset="1" stopColor="#17181b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---------- ground ---------- */}
      <ellipse cx="210" cy="508" rx="172" ry="22" fill="url(#tw-halo)" />

      {/* ---------- the sheet in the platen ----------
           It runs past the platen line so its bottom edge is hidden behind the
           roller — a sheet with a visible bottom edge reads as a card lying on
           the machine rather than as paper fed through it. */}
      <g>
        <rect x="108" y="26" width="204" height="244" rx="1.5" fill="url(#tw-paper)" />
        <rect x="108" y="26" width="204" height="244" rx="1.5" fill="none" stroke="#e6e3db" strokeWidth="1.2" />
        {/* the edge that catches the light */}
        <rect x="108" y="26" width="4" height="244" fill="#eeebe3" opacity="0.9" />
        {/* and the roller's shadow falling up the sheet */}
        <rect x="108" y="222" width="204" height="30" fill="url(#tw-paper-shadow)" />
      </g>

      {/* ---------- carriage ----------
           Wider than the body, with the knobs standing proud of it at both
           ends, which is what makes the carriage read as a separate assembly
           sitting on top of the machine. */}
      <rect x="52" y="240" width="316" height="7" rx="3.5" fill="url(#tw-metal)" />
      {/* platen roller */}
      <rect x="74" y="244" width="272" height="26" rx="13" fill="url(#tw-platen)" />
      {/* paper bail, with its two rubber rollers */}
      <rect x="96" y="252" width="228" height="3.4" rx="1.7" fill="#cfcdc8" />
      <rect x="150" y="248" width="15" height="11" rx="3" fill="#1b1c20" />
      <rect x="256" y="248" width="15" height="11" rx="3" fill="#1b1c20" />
      {/* knobs at both ends */}
      <circle cx="56" cy="257" r="16" fill="url(#tw-metal)" />
      <circle cx="56" cy="257" r="7" fill="#b6b3ae" />
      <circle cx="364" cy="257" r="16" fill="url(#tw-metal)" />
      <circle cx="364" cy="257" r="7" fill="#b6b3ae" />

      {/* carriage return lever — an arm off the left end with a flat paddle,
          rather than the bare bent line this used to be */}
      <g>
        <path
          d="M58 246 L26 228"
          stroke="#8d8b90"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <rect x="8" y="216" width="22" height="6" rx="3" transform="rotate(-16 19 219)" fill="#a5a3a8" />
      </g>

      {/* ---------- upper deck ---------- */}
      <rect x="74" y="266" width="272" height="82" rx="15" fill="url(#tw-deck)" />
      {/* rim highlight along the top edge */}
      <rect x="80" y="267" width="260" height="1.6" rx="0.8" fill="var(--tw-rim)" opacity="0.55" />

      {/* type basket — the well the typebars swing out of */}
      <path d="M150 282 L270 282 L250 330 L170 330 Z" fill="#14151a" />
      <path d="M150 282 L270 282 L266 292 L154 292 Z" fill="#0b0c0f" />
      {/* the typebars, fanned */}
      <g stroke="#5c5e66" strokeWidth="1.6" strokeLinecap="round">
        <path d="M176 328 L196 296" />
        <path d="M188 329 L202 296" />
        <path d="M200 330 L208 296" />
        <path d="M212 330 L214 296" />
        <path d="M224 330 L220 296" />
        <path d="M236 329 L226 296" />
        <path d="M248 328 L232 296" />
      </g>
      {/* the ribbon — rose by default, since that is the one place rose belongs
          on this machine. A colourway that is itself rose overrides it, or the
          ribbon would vanish into the shell. */}
      <rect x="163" y="286" width="94" height="4.6" rx="2.3" fill="var(--tw-ribbon, var(--np-rose))" />
      <rect x="163" y="290.6" width="94" height="3.4" rx="1.7" fill="#26272c" />

      {/* ---------- body ---------- */}
      <rect x="58" y="322" width="304" height="170" rx="24" fill="url(#tw-shell)" />
      {/* the seam where the deck meets the body */}
      <rect x="70" y="323" width="280" height="1.6" rx="0.8" fill="var(--tw-rim)" opacity="0.4" />

      {/* keyboard recess */}
      <rect x="76" y="342" width="268" height="132" rx="12" fill="#17181c" />
      <rect x="76" y="342" width="268" height="2" rx="1" fill="#000" opacity="0.5" />

      <KeyRow keys={ROW_1} y={352} />
      <KeyRow keys={ROW_2} y={374} />
      <KeyRow keys={ROW_3} y={396} />
      <KeyRow keys={ROW_4} y={418} />

      {/* spacebar */}
      <rect x="146" y="442" width="128" height="15" rx="6" fill="#0c0c0e" opacity="0.55" />
      <rect x="146" y="440.5" width="128" height="15" rx="6" fill="url(#tw-key)" />

      {/* feet */}
      <rect x="86" y="488" width="36" height="10" rx="5" fill="var(--tw-3)" />
      <rect x="298" y="488" width="36" height="10" rx="5" fill="var(--tw-3)" />
    </svg>
  )
}
