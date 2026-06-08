'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
{ label: 'About', href: '#about' },
{ label: 'Experience', href: '#experience' },
{ label: 'Education', href: '#education' },
{ label: 'Projects', href: '#projects' },
{ label: 'Skills', href: '#skills' },
{ label: 'Certifications', href: '#certifications' },
{ label: 'Contact', href: '#contact' },
]

export function Nav() {
const [scrolled, setScrolled] = useState(false)
const [open, setOpen] = useState(false)
const [activeSection, setActiveSection] = useState('#about')

useEffect(() => {
const onScroll = () => setScrolled(window.scrollY > 24)

```
onScroll()

window.addEventListener('scroll', onScroll, { passive: true })

return () => window.removeEventListener('scroll', onScroll)
```

}, [])

useEffect(() => {
const observers: IntersectionObserver[] = []

```
links.forEach((link) => {
  const id = link.href.replace('#', '')
  const element = document.getElementById(id)

  if (!element) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setActiveSection(link.href)
      }
    },
    {
      threshold: 0.4,
    }
  )

  observer.observe(element)
  observers.push(observer)
})

return () => {
  observers.forEach((observer) => observer.disconnect())
}
```

}, [])

return (
<header
className={cn(
'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
scrolled
? 'border-b border-border/70 bg-background/90 backdrop-blur-md'
: 'border-b border-transparent bg-transparent',
)}
> <nav
     className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-10"
     aria-label="Primary"
   > <a
       href="#about"
       className="font-serif text-lg font-semibold tracking-wide text-foreground"
     >
NP<span className="text-gold">.</span> </a>

```
    <ul className="hidden items-center gap-8 md:flex">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={cn(
              'text-sm transition-all duration-300',
              activeSection === link.href
                ? 'text-gold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
    >
      <span className="relative block h-3 w-4">
        <span
          className={cn(
            'absolute left-0 top-0 h-px w-4 bg-current transition-transform',
            open && 'translate-y-1.5 rotate-45',
          )}
        />
        <span
          className={cn(
            'absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity',
            open && 'opacity-0',
          )}
        />
        <span
          className={cn(
            'absolute bottom-0 left-0 h-px w-4 bg-current transition-transform',
            open && '-translate-y-1.5 -rotate-45',
          )}
        />
      </span>
    </button>
  </nav>

  {open && (
    <div className="border-t border-border/70 bg-background/95 backdrop-blur-md md:hidden">
      <ul className="mx-auto flex max-w-[1400px] flex-col px-10 py-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block py-3 text-sm transition-colors',
                activeSection === link.href
                  ? 'text-gold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )}
</header>
```

)
}
