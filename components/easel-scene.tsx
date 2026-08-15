'use client'

/* The wooden display easel and the girl who painted it.
   Pure SVG so the whole scene scales as one piece. The canvas face is
   left blank — the interactive artifacts are laid over it in Canvas. */

export function EaselScene() {
  return (
    <svg
      viewBox="0 0 500 530"
      className="np-scene-svg"
      role="img"
      aria-label="A small wooden easel holding a canvas, with a girl painting beside it"
    >
      <defs>
        <linearGradient id="np-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c08f4a" />
          <stop offset="0.3" stopColor="#e7c390" />
          <stop offset="0.62" stopColor="#dcb178" />
          <stop offset="1" stopColor="#b5833f" />
        </linearGradient>
        <linearGradient id="np-wood-dk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a3743a" />
          <stop offset="0.5" stopColor="#c39558" />
          <stop offset="1" stopColor="#96692f" />
        </linearGradient>
        <linearGradient id="np-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eccb9a" />
          <stop offset="0.55" stopColor="#dcb178" />
          <stop offset="1" stopColor="#bd8c48" />
        </linearGradient>
        <linearGradient id="np-canvas-face" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f4f3ef" />
        </linearGradient>
      </defs>

      {/* ---------- ground shadow ---------- */}
      <ellipse cx="196" cy="502" rx="128" ry="11" fill="#17181b" opacity="0.08" />
      <ellipse cx="408" cy="500" rx="32" ry="6" fill="#17181b" opacity="0.07" />

      {/* ---------- back leg (hidden behind the canvas, emerges below) ---------- */}
      <line x1="186" y1="120" x2="240" y2="496" stroke="url(#np-wood-dk)" strokeWidth="12" />

      {/* ---------- front legs ---------- */}
      <line x1="146" y1="62" x2="78" y2="496" stroke="url(#np-wood)" strokeWidth="16" />
      <line x1="238" y1="62" x2="306" y2="496" stroke="url(#np-wood)" strokeWidth="16" />

      {/* ---------- head: crossbar + peak ---------- */}
      <rect x="132" y="56" width="120" height="14" rx="3" fill="url(#np-wood)" />
      <rect x="147" y="26" width="14" height="34" rx="3" fill="url(#np-wood)" />
      <rect x="224" y="26" width="14" height="34" rx="3" fill="url(#np-wood)" />
      <rect x="147" y="22" width="91" height="12" rx="4" fill="url(#np-wood-dk)" />
      <circle cx="192" cy="43" r="6.5" fill="#c99a58" />

      {/* ---------- the canvas ---------- */}
      <rect
        x="86" y="96" width="212" height="258"
        fill="url(#np-canvas-face)"
        stroke="#e0ded7" strokeWidth="1.5"
      />
      <rect x="86" y="348" width="212" height="6" fill="#e6e3db" />

      {/* ---------- tray (sized to the legs, not overhanging like a table) ---------- */}
      <rect x="80" y="354" width="224" height="16" rx="2" fill="url(#np-tray)" />
      <rect x="80" y="369" width="224" height="12" rx="2" fill="#bc8b48" />
      <rect x="80" y="369" width="224" height="3" fill="#a87b3d" opacity="0.6" />

      {/* a spare brush resting on the tray */}
      <g transform="rotate(-3 150 352)">
        <rect x="112" y="347" width="72" height="5" rx="2.5" fill="#8e6f4e" />
        <rect x="182" y="346" width="14" height="7" rx="2" fill="#c9c6c0" />
        <path d="M196 346.5 L211 349.5 L196 352.5 Z" fill="#b8496a" />
      </g>

      {/* ================= the girl ================= */}
      <g className="np-girl">
        {/* back arm, hanging */}
        <path
          d="M418 404 q14 18 10 36"
          stroke="#e6bfa2" strokeWidth="9" strokeLinecap="round" fill="none"
        />

        {/* dress */}
        <path d="M396 394 q16 -7 32 0 l14 66 q-30 10 -60 0 Z" fill="#b8496a" />
        <path d="M382 460 q30 10 60 0 l2 7 q-32 10 -64 0 Z" fill="#9c3a58" opacity="0.75" />

        {/* legs */}
        <line x1="400" y1="466" x2="397" y2="496" stroke="#e6bfa2" strokeWidth="8" strokeLinecap="round" />
        <line x1="424" y1="466" x2="427" y2="496" stroke="#e6bfa2" strokeWidth="8" strokeLinecap="round" />
        <rect x="388" y="493" width="18" height="7" rx="3.5" fill="#17181b" />
        <rect x="418" y="493" width="18" height="7" rx="3.5" fill="#17181b" />

        {/* painting arm — raised toward the canvas */}
        <path
          d="M398 398 q-22 -14 -36 -34"
          stroke="#e6bfa2" strokeWidth="9" strokeLinecap="round" fill="none"
        />
        {/* the brush she is painting with — positive rotation swings the tip
            up and left, onto the canvas; negative sent it down-right */}
        <g transform="translate(-22 -6) rotate(34 362 364)">
          <rect x="318" y="361" width="46" height="4.5" rx="2.2" fill="#8e6f4e" />
          <rect x="311" y="360" width="9" height="6.5" rx="2" fill="#c9c6c0" />
          <path d="M311 360.5 L297 363.2 L311 366.5 Z" fill="#b8496a" />
        </g>

        {/* head */}
        <circle cx="412" cy="368" r="23" fill="#f0cdb1" />
        <path
          d="M389 368 a23 23 0 0 1 46 0 q0 -30 -23 -30 q-23 0 -23 30 Z"
          fill="#2b2118"
        />
        <path d="M389 366 q-4 22 4 32 q-10 -4 -8 -22 Z" fill="#2b2118" />
        <path d="M435 366 q4 22 -4 32 q10 -4 8 -22 Z" fill="#2b2118" />
        <circle cx="412" cy="337" r="11" fill="#2b2118" />
        {/* face, turned toward her canvas */}
        <circle cx="400" cy="370" r="2.2" fill="#17181b" />
        <circle cx="412" cy="370" r="2.2" fill="#17181b" />
        <path d="M400 378 q6 5 12 0" stroke="#17181b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="394" cy="376" r="3.4" fill="#b8496a" opacity="0.28" />
      </g>
    </svg>
  )
}
