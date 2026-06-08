import { Mail, Phone } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Reveal } from '@/components/reveal'

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const contacts: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  href: string
}[] = [
  {
    icon: Mail,
    label: 'nandiniparashar207@gmail.com',
    href: 'mailto:nandiniparashar207@gmail.com',
  },
  {
    icon: Phone,
    label: '+91 81780 85401',
    href: 'tel:+918178085401',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nandiniparashar/',
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="grain relative overflow-hidden py-28 text-center"
    >
      <div className="gold-dots absolute inset-0 z-0 opacity-40" aria-hidden="true" />
      <Reveal className="relative z-10 mx-auto max-w-[1100px] px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">
          Get in touch
        </p>
        <h2 className="text-balance text-5xl font-semibold text-foreground sm:text-6xl">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Open to opportunities in investment research, alternative assets, and finance strategy.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {contacts.map((item) => {
            const Icon = item.icon
            const isExternal = item.href.startsWith('http')
            return (
              <a
                key={item.label}
                href={item.href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="gold-link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                {item.label}
              </a>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
