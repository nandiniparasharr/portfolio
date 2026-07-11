'use client'

import { useState } from 'react'
import { site } from '@/lib/content'

export function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="border-b border-current pb-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-plum transition-colors duration-150 hover:text-rose"
    >
      {copied ? 'Copied —' : 'Copy'}
    </button>
  )
}
