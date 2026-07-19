'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/content'
import { toggleTheme } from '@/components/theme-toggle'

type Command = {
  group: 'Pages' | 'Actions'
  label: string
  hint: string
  run: () => void | Promise<void>
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Command[]>(
    () => [
      { group: 'Pages', label: 'Home', hint: '→', run: () => router.push('/') },
      { group: 'Pages', label: 'Work', hint: '→', run: () => router.push('/work') },
      { group: 'Pages', label: 'About', hint: '→', run: () => router.push('/about') },
      { group: 'Pages', label: 'Contact', hint: '→', run: () => router.push('/contact') },
      { group: 'Actions', label: 'Toggle theme', hint: '● ○', run: () => toggleTheme() },
      {
        group: 'Actions',
        label: copied ? 'Email copied' : 'Copy email',
        hint: copied ? '✓' : '⧉',
        run: async () => {
          await navigator.clipboard.writeText(site.email)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        },
      },
      { group: 'Actions', label: 'Download CV', hint: '↗', run: () => window.open(site.resume, '_blank') },
      { group: 'Actions', label: 'Open LinkedIn', hint: '↗', run: () => window.open(site.linkedin, '_blank') },
      { group: 'Actions', label: 'Read the Substack', hint: '↗', run: () => window.open(site.substack, '_blank') },
    ],
    [router, copied],
  )

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? commands.filter((c) => c.label.toLowerCase().includes(q))
      : commands
  }, [commands, query])

  const execute = useCallback(
    (cmd: Command) => {
      const keepOpen = cmd.label.startsWith('Copy') || cmd.label === 'Toggle theme'
      cmd.run()
      if (!keepOpen) onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, shown.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter' && shown[active]) {
        e.preventDefault()
        execute(shown[active])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, shown, active, execute, onClose])

  if (!open) return null

  let lastGroup = ''

  return (
    <div
      className="palette-overlay fixed inset-0 z-[110] flex items-start justify-center bg-inverse/40 px-4 pt-[18vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="palette-panel w-full max-w-md border border-border-strong bg-card shadow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          placeholder="TYPE A COMMAND —"
          className="w-full border-b border-border bg-transparent px-5 py-4 font-mono text-xs uppercase tracking-[0.1em] text-foreground outline-none placeholder:text-faint"
        />
        <div className="max-h-72 overflow-y-auto py-2">
          {shown.length === 0 && (
            <p className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              No entry found.
            </p>
          )}
          {shown.map((cmd, i) => {
            const showGroup = cmd.group !== lastGroup
            lastGroup = cmd.group
            return (
              <div key={cmd.label}>
                {showGroup && (
                  <p className="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {cmd.group}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => execute(cmd)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150',
                    i === active
                      ? 'bg-rose text-on-accent'
                      : 'text-muted-foreground',
                  )}
                >
                  <span>{cmd.label}</span>
                  <span aria-hidden="true">{cmd.hint}</span>
                </button>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between border-t border-border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          <span>↑↓ Navigate · ↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  )
}
