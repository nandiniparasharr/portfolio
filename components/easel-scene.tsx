'use client'

/* The wooden display easel. Pure SVG so the whole thing scales as one
   piece. The canvas face is left blank — the artifacts are laid over it
   by Canvas, and the two are tilted together by .np-scene. */

export function EaselScene() {
  return (
    <svg
      viewBox="0 0 384 530"
      className="np-scene-svg"
      role="img"
      aria-label="A wooden easel holding a blank canvas"
    >
      <defs>
        <linearGradient id="np-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9873f" />
          <stop offset="0.28" stopColor="#eac68f" />
          <stop offset="0.62" stopColor="#dcb178" />
          <stop offset="1" stopColor="#a97a36" />
        </linearGradient>
        <linearGradient id="np-wood-dk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9a6c33" />
          <stop offset="0.5" stopColor="#c08f4f" />
          <stop offset="1" stopColor="#8b6029" />
        </linearGradient>
        <linearGradient id="np-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d2a4" />
          <stop offset="0.5" stopColor="#dcb178" />
          <stop offset="1" stopColor="#b4842f" />
        </linearGradient>
        <linearGradient id="np-canvas-face" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.65" stopColor="#fdfcfa" />
          <stop offset="1" stopColor="#f2f0ea" />
        </linearGradient>
        {/* a soft pool of light under the easel */}
        <radialGradient id="np-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#17181b" stopOpacity="0.13" />
          <stop offset="1" stopColor="#17181b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---------- ground ---------- */}
      <ellipse cx="192" cy="500" rx="168" ry="26" fill="url(#np-halo)" />

      {/* ---------- back leg (hidden behind the canvas) ---------- */}
      <line x1="178" y1="120" x2="232" y2="494" stroke="url(#np-wood-dk)" strokeWidth="12" />

      {/* ---------- front legs ---------- */}
      <line x1="146" y1="62" x2="78" y2="494" stroke="url(#np-wood)" strokeWidth="16" />
      <line x1="238" y1="62" x2="306" y2="494" stroke="url(#np-wood)" strokeWidth="16" />

      {/* ---------- head ---------- */}
      <rect x="132" y="56" width="120" height="14" rx="3" fill="url(#np-wood)" />
      <rect x="147" y="26" width="14" height="34" rx="3" fill="url(#np-wood)" />
      <rect x="224" y="26" width="14" height="34" rx="3" fill="url(#np-wood)" />
      <rect x="147" y="22" width="91" height="12" rx="4" fill="url(#np-wood-dk)" />
      <circle cx="192" cy="43" r="6.5" fill="#c99a58" />

      {/* ---------- the canvas ---------- */}
      <rect x="90" y="100" width="212" height="258" fill="#e3ded2" opacity="0.5" />
      <rect
        x="86" y="96" width="212" height="258"
        fill="url(#np-canvas-face)"
        stroke="#e2e0d8" strokeWidth="1.5"
      />
      <rect x="86" y="348" width="212" height="6" fill="#e8e5dd" />

      {/* ---------- tray ---------- */}
      <rect x="80" y="354" width="224" height="16" rx="2" fill="url(#np-tray)" />
      <rect x="80" y="369" width="224" height="12" rx="2" fill="#b4842f" />
      <rect x="80" y="369" width="224" height="3" fill="#9d7128" opacity="0.6" />

      {/* a brush on the tray */}
      <g transform="rotate(-3 150 352)">
        <rect x="112" y="347" width="72" height="5" rx="2.5" fill="#8e6f4e" />
        <rect x="182" y="346" width="14" height="7" rx="2" fill="#c9c6c0" />
        <path d="M196 346.5 L211 349.5 L196 352.5 Z" fill="#b8496a" />
      </g>
    </svg>
  )
}
