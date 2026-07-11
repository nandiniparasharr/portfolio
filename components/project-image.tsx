'use client'

import { useEffect, useState } from 'react'
import { ImagePlaceholder } from '@/components/ledger'

/** Shows the project screenshot once the file exists; placeholder until then. */
export function ProjectImage({
  src,
  alt,
  ratio = '16/9',
  label,
  fit = 'cover',
}: {
  src?: string
  alt: string
  ratio?: string
  label?: string
  fit?: 'cover' | 'contain'
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src) return
    const probe = new Image()
    probe.onload = () => setLoaded(true)
    probe.src = src
  }, [src])

  if (src && loaded) {
    return (
      <span
        className="block overflow-hidden border border-border bg-sunken"
        style={{ aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={
            fit === 'contain'
              ? 'h-full w-full object-contain'
              : 'h-full w-full object-cover object-top'
          }
        />
      </span>
    )
  }
  return <ImagePlaceholder ratio={ratio} label={label} />
}
