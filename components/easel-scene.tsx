'use client'

/* The wooden display easel. Pure SVG so the whole thing scales as one
   piece. The canvas face is left blank — the artifacts are laid over it
   by Canvas, and the two are tilted together by .np-scene.

   The wood is a warm, muted brown — real timber rather than the earlier
   cartoon gold, but held back enough that the artifacts on the canvas
   stay the brightest thing on the page. */

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
          <stop offset="0" stopColor="#6f4f36" />
          <stop offset="0.3" stopColor="#b08a66" />
          <stop offset="0.66" stopColor="#9a7550" />
          <stop offset="1" stopColor="#6a4a31" />
        </linearGradient>
        <linearGradient id="np-wood-dk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b3f2b" />
          <stop offset="0.5" stopColor="#87643f" />
          <stop offset="1" stopColor="#523825" />
        </linearGradient>
        <linearGradient id="np-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b98f68" />
          <stop offset="0.5" stopColor="#96704c" />
          <stop offset="1" stopColor="#6b4a30" />
        </linearGradient>
        <linearGradient id="np-canvas-face" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#fdfcfa" />
          <stop offset="1" stopColor="#f4f2ec" />
        </linearGradient>
        <radialGradient id="np-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#17181b" stopOpacity="0.1" />
          <stop offset="1" stopColor="#17181b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---------- ground ---------- */}
      <ellipse cx="192" cy="500" rx="176" ry="24" fill="url(#np-halo)" />

      {/* ---------- back leg (hidden behind the canvas) ---------- */}
      <line x1="180" y1="130" x2="228" y2="494" stroke="url(#np-wood-dk)" strokeWidth="9" />

      {/* ---------- front legs — slimmer, splayed wider ---------- */}
      <line x1="146" y1="56" x2="48" y2="494" stroke="url(#np-wood)" strokeWidth="11" />
      <line x1="238" y1="56" x2="336" y2="494" stroke="url(#np-wood)" strokeWidth="11" />

      {/* ---------- head ---------- */}
      <rect x="138" y="52" width="108" height="10" rx="2.5" fill="url(#np-wood)" />
      <rect x="151" y="30" width="10" height="26" rx="2.5" fill="url(#np-wood)" />
      <rect x="223" y="30" width="10" height="26" rx="2.5" fill="url(#np-wood)" />
      <rect x="151" y="26" width="82" height="9" rx="3" fill="url(#np-wood-dk)" />
      <circle cx="192" cy="43" r="5" fill="#8a6845" />

      {/* ---------- the canvas — wider and a little taller ---------- */}
      <rect x="78" y="92" width="236" height="282" fill="#ded8ca" opacity="0.45" />
      <rect
        x="74" y="88" width="236" height="282"
        fill="url(#np-canvas-face)"
        stroke="#e4e1d9" strokeWidth="1.4"
      />
      <rect x="74" y="364" width="236" height="6" fill="#eae7df" />

      {/* ---------- tray ---------- */}
      <rect x="68" y="370" width="248" height="11" rx="2" fill="url(#np-tray)" />
      <rect x="68" y="380" width="248" height="8" rx="2" fill="#6b4a30" />
      <rect x="68" y="380" width="248" height="2" fill="#573b25" opacity="0.55" />

      {/* a brush on the tray */}
      <g transform="rotate(-3 140 368)">
        <rect x="106" y="364" width="68" height="4.5" rx="2.2" fill="#7d6046" />
        <rect x="172" y="363" width="13" height="6.5" rx="2" fill="#c9c6c0" />
        <path d="M185 363.5 L199 366.2 L185 369.5 Z" fill="#b8496a" />
      </g>
    </svg>
  )
}
