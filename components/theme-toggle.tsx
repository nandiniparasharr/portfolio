'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  const toggle = () => {
    const next =
      document.documentElement.getAttribute('data-theme') !== 'dark'
    document.documentElement.setAttribute(
      'data-theme',
      next ? 'dark' : 'light',
    )
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }

  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggle}
      className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
    >
      <span aria-hidden="true">{dark ? '○' : '●'}</span>
      <span className="w-8 text-left">{dark === null ? '—' : dark ? 'Light' : 'Dark'}</span>
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
