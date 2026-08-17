'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CommandPalette } from '@/components/command-palette'
import { Intro } from '@/components/intro'

export function Shell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="np-shell flex min-h-screen flex-col">
      <Intro />
      <SiteHeader onOpenPalette={() => setPaletteOpen(true)} />
      <main className="np-content flex-1">{children}</main>
      <div className="np-content"><SiteFooter /></div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
