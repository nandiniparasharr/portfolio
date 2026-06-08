import type { ReactNode } from 'react'
import { Reveal } from '@/components/reveal'

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <Reveal className="mb-12 border-l-2 border-gold pl-5">
      {eyebrow ? (
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl font-semibold text-foreground sm:text-5xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {children}
        </p>
      ) : null}
    </Reveal>
  )
}
