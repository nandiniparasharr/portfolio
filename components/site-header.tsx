'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/content'
import { ThemeToggle } from '@/components/theme-toggle'

function ScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      doc.style.setProperty('--scroll-progress', String(p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div
      aria-hidden="true"
      className="scroll-progress absolute inset-x-0 -bottom-0.5 h-0.5 bg-rose"
    />
  )
}

export function SiteHeader({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border-strong bg-background">
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-7 py-5">
        <Link
          href="/"
          className="whitespace-nowrap font-serif text-xl text-foreground no-underline"
        >
          Nandini Parashar
        </Link>

        <nav className="flex items-center gap-5" aria-label="Primary">
          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'border-b pb-0.5 font-mono text-[11px] uppercase tracking-[0.1em] no-underline transition-colors duration-150',
                  isActive(l.href)
                    ? 'border-rose text-rose'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                'px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] no-underline transition-colors duration-150',
                'bg-rose text-on-accent hover:bg-rose-deep',
              )}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="hidden border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground lg:inline-flex"
            >
              ⌘K
            </button>
            <ThemeToggle />
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-base text-foreground md:hidden"
          >
            {open ? '×' : '☰'}
          </button>
        </nav>
        <ScrollProgress />
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col px-7 py-2">
            {[...navLinks, { href: '/contact', label: 'Contact' }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'border-b border-border py-4 font-mono text-xs uppercase tracking-[0.1em] no-underline last:border-b-0',
                  isActive(l.href) ? 'text-rose' : 'text-muted-foreground',
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="py-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
