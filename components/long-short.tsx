import { cn } from '@/lib/utils'

const LONGS = ['Curiosity', 'Small daily improvements', 'Writing', 'Builders']
const SHORTS = [
  'Hustle culture',
  'Doom scrolling',
  "Meetings that could've been emails",
]

/** Spiral binding along a page's top edge. */
function Spiral() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2.5 left-5 right-5 flex justify-between"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className="h-5 w-2 rounded-full border-[1.5px] border-faint bg-transparent"
        />
      ))}
    </span>
  )
}

function Page({
  heading,
  headingClass,
  items,
  className,
}: {
  heading: string
  headingClass: string
  items: string[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'absolute w-60 border border-border bg-card px-5 pb-6 pt-7 shadow-card transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-20 hover:-translate-y-1 hover:shadow-pop sm:w-64',
        className,
      )}
      style={{
        backgroundImage:
          'repeating-linear-gradient(transparent, transparent 27px, var(--np-line) 27px, var(--np-line) 28px)',
        backgroundPosition: '0 8px',
      }}
    >
      <Spiral />
      <p
        className={cn(
          'm-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] leading-[28px]',
          headingClass,
        )}
      >
        {heading}
      </p>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 font-mono text-xs leading-[28px] text-foreground"
          >
            <span aria-hidden="true" className="text-faint">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The investor memo, kept in a notebook: long conviction, short noise. */
export function LongShort({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-[420px] w-[320px] sm:w-[360px]', className)}>
      <h2 className="sr-only">What I&apos;m long on</h2>
      <Page
        heading="Long:"
        headingClass="text-forest"
        items={LONGS}
        className="left-0 top-0 rotate-[-3deg]"
      />
      <Page
        heading="Short:"
        headingClass="text-rose"
        items={SHORTS}
        className="left-12 top-44 rotate-[2.5deg] sm:left-20"
      />
    </div>
  )
}
