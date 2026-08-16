'use client'

/* A streetlight on the left edge that switches on with dark mode and
   washes warm light across the page. Decorative, but it does real work:
   the pooled light lifts the background behind the text, so dark mode
   stops being flat near-black. Hidden entirely in light mode. */

export function StreetLamp() {
  return (
    <div className="np-lamp" aria-hidden="true">
      {/* the pooled light — this is what actually lifts the page */}
      <span className="np-lamp-wash" />

      <svg className="np-lamp-svg" viewBox="0 0 300 1000" preserveAspectRatio="xMinYMin slice">
        <defs>
          <linearGradient id="np-post" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1e2026" />
            <stop offset="0.4" stopColor="#3a3d46" />
            <stop offset="1" stopColor="#191b20" />
          </linearGradient>
          <radialGradient id="np-bulb" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff3d6" />
            <stop offset="0.45" stopColor="#ffd89a" />
            <stop offset="1" stopColor="#f0b866" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="np-beam" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#ffd89a" stopOpacity="0.3" />
            <stop offset="0.55" stopColor="#ffd89a" stopOpacity="0.09" />
            <stop offset="1" stopColor="#ffd89a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* the cone of light thrown across the page */}
        <path d="M120 150 L300 92 L300 780 L96 620 Z" fill="url(#np-beam)" />

        {/* post and base */}
        <rect x="48" y="176" width="13" height="810" fill="url(#np-post)" />
        <rect x="38" y="962" width="33" height="16" rx="3" fill="#23262c" />
        <rect x="43" y="950" width="23" height="14" rx="2" fill="#2b2f36" />

        {/* curved arm reaching right */}
        <path
          d="M54 176 Q54 96 118 96"
          fill="none" stroke="url(#np-post)" strokeWidth="13" strokeLinecap="round"
        />

        {/* lamp head */}
        <path d="M100 104 L136 104 L128 132 L108 132 Z" fill="#2b2f36" />
        <ellipse cx="118" cy="133" rx="11" ry="4" fill="#ffe9bd" />

        {/* the glow around the bulb */}
        <circle cx="118" cy="132" r="54" fill="url(#np-bulb)" opacity="0.85" />
        <circle cx="118" cy="132" r="20" fill="#fff1cf" opacity="0.5" />
      </svg>
    </div>
  )
}
