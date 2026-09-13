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
  /** Shape of the box. Governs the placeholder always, and the loaded image
      only when fit is 'cover' — see below. */
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
    /* 'contain' inside a fixed-ratio box is a guaranteed letterbox: anything
       that is not exactly that ratio gets bars, and screenshots never are.
       The three case-study images run from 1.53 to 2.20 against a 16/9 box,
       so one was pillarboxed and two were letterboxed. When the whole image
       has to be visible, the image sets the height and the box follows it.

       'cover' still takes the ratio, because cropping to a deliberate shape
       is the entire point of that mode (the About moodboard). */
    const contain = fit === 'contain'
    return (
      <span
        className="block overflow-hidden border border-border bg-sunken"
        style={contain ? undefined : { aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={
            contain
              ? 'block h-auto w-full'
              : 'h-full w-full object-cover object-top'
          }
        />
      </span>
    )
  }
  return <ImagePlaceholder ratio={ratio} label={label} />
}
