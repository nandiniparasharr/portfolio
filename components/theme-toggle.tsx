'use client'

import { useEffect, useState } from 'react'

/* A switch, not a labelled button. The old version printed the
   destination ("Dark" while in light mode), which read as a statement
   about the current theme. Position now carries the state instead. */

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.6v2.4M12 19v2.4M2.6 12h2.4M19 12h2.4" />
        <path d="M5.4 5.4l1.7 1.7M16.9 16.9l1.7 1.7M18.6 5.4l-1.7 1.7M7.1 16.9l-1.7 1.7" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 14.6A8.6 8.6 0 0 1 9.4 4a8.6 8.6 0 1 0 10.6 10.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
    setReady(true)
  }, [])

  const toggle = () => {
    const next = document.documentElement.getAttribute('data-theme') !== 'dark'
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={toggle}
      className="np-theme-switch"
      data-dark={dark || undefined}
      data-ready={ready || undefined}
    >
      <span className="np-theme-knob" aria-hidden="true" />
      <span className="np-theme-ico np-theme-sun" aria-hidden="true">
        <SunIcon />
      </span>
      <span className="np-theme-ico np-theme-moon" aria-hidden="true">
        <MoonIcon />
      </span>
    </button>
  )
}

/** Imperative toggle used by the command palette. */
export function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') !== 'dark'
  document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light')
  } catch {}
}
