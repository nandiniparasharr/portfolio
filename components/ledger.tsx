import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { BadgeTone } from '@/lib/content'

/* The Ledger primitives — square corners, mono labels, glyphs over icons. */

const btnBase =
  'inline-flex items-center gap-2 font-mono uppercase tracking-[0.08em] cursor-pointer transition-colors duration-150 active:translate-y-px'
const btnVariants = {
  primary:
    'bg-rose text-on-accent border border-transparent hover:bg-rose-deep',
  secondary:
    'bg-transparent text-foreground border border-border-strong hover:bg-inverse hover:text-on-inverse',
  ghost:
    'bg-transparent text-plum border-b border-current pb-0.5 hover:text-rose',
} as const
const btnSizes = {
  sm: 'text-[11px] px-4 py-[9px]',
  md: 'text-xs px-[22px] py-3',
  lg: 'text-[13px] px-[30px] py-4',
} as const

type BtnVariant = keyof typeof btnVariants
type BtnSize = keyof typeof btnSizes

function btnClass(variant: BtnVariant, size: BtnSize, className?: string) {
  return cn(
    btnBase,
    btnVariants[variant],
    variant === 'ghost' ? 'text-xs p-0 pb-0.5' : btnSizes[size],
    className,
  )
}

export function LButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant
  size?: BtnSize
}) {
  return (
    <button
      type={props.type ?? 'button'}
      className={btnClass(variant, size, className)}
      {...props}
    />
  )
}

export function LLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  external = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: BtnVariant
  size?: BtnSize
  href: string
  external?: boolean
}) {
  const cls = btnClass(variant, size, cn('no-underline', className))
  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls} {...props} />
    )
  }
  return <Link href={href} className={cls} {...props} />
}

const badgeTones: Record<BadgeTone, string> = {
  rose: 'bg-rose text-on-accent',
  plum: 'bg-plum text-on-accent',
  forest: 'bg-forest text-on-accent',
  ink: 'bg-inverse text-on-inverse',
}

export function Badge({
  tone = 'rose',
  children,
  className,
}: {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-1 font-mono text-label-xs uppercase tracking-[0.1em]',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

const labelTones = {
  rose: 'text-rose',
  plum: 'text-plum',
  forest: 'text-forest',
  ink: 'text-foreground',
  muted: 'text-muted-foreground',
} as const

export function SectionLabel({
  index,
  tone = 'rose',
  children,
  className,
}: {
  index?: string
  tone?: keyof typeof labelTones
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-3 font-mono text-label uppercase tracking-[0.12em]',
        labelTones[tone],
        className,
      )}
    >
      {index && <span className="text-faint">{index}</span>}
      <span>{children}</span>
    </div>
  )
}

const numeralTones = {
  rose: 'text-rose',
  plum: 'text-plum',
  forest: 'text-forest',
  tint: 'text-rose-tint',
} as const

export function IndexNumeral({
  value,
  tone = 'rose',
  className,
}: {
  value: string
  tone?: keyof typeof numeralTones
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block select-none font-serif italic leading-[0.8]',
        numeralTones[tone],
        className,
      )}
    >
      {value}
    </span>
  )
}

export function LedgerRow({
  label,
  value,
  last = false,
  href,
}: {
  label: string
  value: ReactNode
  last?: boolean
  href?: string
}) {
  const row = (
    <div
      className={cn(
        'flex items-baseline justify-between gap-6 py-2.5',
        !last && 'border-b border-border',
      )}
    >
      <span className="flex-none font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
        {label}
      </span>
      <span className="text-right text-sm text-foreground">{value}</span>
    </div>
  )
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className="group block text-inherit no-underline transition-colors hover:text-rose"
      >
        {row}
      </a>
    )
  }
  return row
}

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-[1200px] px-7', className)}>
      {children}
    </div>
  )
}

/** Sunken paper block that marks an image slot until real work drops in. */
export function ImagePlaceholder({
  label = 'PROJECT IMAGE — DROP IN REAL WORK',
  ratio = '16/9',
  className,
}: {
  label?: string
  ratio?: string
  className?: string
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        'flex items-center justify-center border border-border bg-sunken p-4 text-center font-mono text-[10px] tracking-[0.1em] text-faint',
        className,
      )}
    >
      {label}
    </div>
  )
}
