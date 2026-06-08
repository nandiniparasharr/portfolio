import { Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const certs = [
  {
    name: 'CFA Program Level I',
    issuer: 'CFA Institute',
    date: 'Mar 2026',
    href: 'https://credentials.cfainstitute.org/e2070836-c122-4f13-b9ed-78018a9132f3#acc.tlmfRdTy',
  },
  {
    name: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    date: 'Dec 2025',
    href: 'https://www.credly.com/badges/16786155-2f96-4ff7-abad-03273c06ced8/public_url',
  },
  {
    name: 'Bloomberg Finance Fundamentals',
    issuer: 'Bloomberg',
    date: 'May 2024',
    href: 'https://portal.bloombergforeducation.com/certificates/bUmafHj52QN7NohrTNdNBG3F',
  },
  {
    name: 'Bloomberg Market Concepts',
    issuer: 'Bloomberg',
    date: 'July 2023',
    href: 'https://portal.bloombergforeducation.com/certificates/5WRzuYqPqQ51DzEJtm8Fqbxr',
  },
  {
    name: 'Introduction to Strategy Consulting',
    issuer: 'BCG',
    date: 'Nov 2022',
    href: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/BCG%20/4Rfzeut8gXmNwfxXv_BCG%20_W7jWxe9XGttSAFaiE_1669142379135_completion_certificate.pdf',
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading eyebrow="Credentials" title="Certifications & Learning" />

        <div className="-mx-6 flex snap-x gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {certs.map((cert, i) => (
            <Reveal
              key={cert.name}
              delay={i * 70}
              className="min-w-[260px] snap-start md:min-w-0"
            >
              <a
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${cert.name} certificate (opens in a new tab)`}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-gold/60"
              >
                <Star
                  className="h-5 w-5 fill-gold/20 text-gold"
                  aria-hidden="true"
                />
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {cert.issuer} &middot; {cert.date}
                </p>
                <h3 className="mt-1 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
                  {cert.name}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
