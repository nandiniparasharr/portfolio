'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/content'
import { LButton } from '@/components/ledger'

const KINDS = ['An opportunity', 'A collaboration', 'Just hello'] as const

const fieldLabel =
  'font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground'
const fieldInput =
  'w-full border border-border bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors duration-150 placeholder:text-faint focus:border-rose'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Delivers via FormSubmit's AJAX relay — no backend, straight to the inbox. */
export function ContactForm() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>('An opportunity')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${site.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `${kind} — from ${name || 'the website'}`,
            _template: 'box',
          }),
        },
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="flex flex-col gap-5 border border-border bg-card p-8 shadow-card"
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {KINDS.map((k) => (
            <label
              key={k}
              className="flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              <input
                type="radio"
                name="kind"
                checked={kind === k}
                onChange={() => setKind(k)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors duration-150',
                  kind === k ? 'border-rose' : 'border-faint',
                )}
              >
                {kind === k && (
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                )}
              </span>
              {k}
            </label>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Your name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className={fieldInput}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={fieldInput}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Message</span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What are we building?"
            className={cn(fieldInput, 'resize-y')}
          />
        </label>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
            Straight to my inbox
          </span>
          <LButton type="submit" variant="primary" disabled={status === 'sending'}>
            {status === 'sending' ? (
              'Sending —'
            ) : (
              <>
                Send it <span className="np-arrow">→</span>
              </>
            )}
          </LButton>
        </div>
      </form>

      {(status === 'sent' || status === 'error') && (
        <div
          role="status"
          className={cn(
            'np-toast fixed bottom-6 left-1/2 z-[105] -translate-x-1/2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-on-accent shadow-pop',
            status === 'sent' ? 'bg-forest' : 'bg-rose-deep',
          )}
        >
          {status === 'sent'
            ? 'Sent — talk soon.'
            : `Couldn't send — email me at ${site.email}`}
        </div>
      )}
    </>
  )
}
