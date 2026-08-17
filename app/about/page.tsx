import type { Metadata } from 'next'
import { EducationFolder } from '@/components/education-folder'
import { Container, LLink, SectionLabel } from '@/components/ledger'
import { ProjectImage } from '@/components/project-image'
import { Reveal } from '@/components/reveal'
import { OpenTabs } from '@/components/open-tabs'
import { certifications, site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — Nandini Parashar',
  description:
    'Finance by profession — markets, machines, margins, and making. The full story.',
}

export default function AboutPage() {
  return (
    <Container className="pb-24 pt-18">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <ProjectImage
            src="/about/moodboard.jpg"
            alt="A moodboard of Nandini's notes, books, and current obsessions"
            ratio="5/6"
            fit="cover"
            label="MOODBOARD — DROP IN YOUR COLLAGE (public/about/moodboard.jpg)"
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionLabel className="mb-6">About</SectionLabel>
          <h1 className="font-serif leading-[0.98] text-[clamp(2.75rem,6.5vw,4.75rem)]">
            <span className="block text-foreground">Jack of</span>
            <span className="block text-foreground">all trades.</span>
            <span className="mt-2 block italic text-rose">on purpose.</span>
          </h1>
          <p className="mt-8 max-w-md text-lead text-muted-foreground">
            I work in finance and love it — and I refuse to stop there. This
            site is the archive of everything else: code, writing, design, and
            the reading that feeds all of it.
          </p>
          <div className="mt-8">
            <LLink href={site.resume} variant="ghost">
              Download the CV ↗
            </LLink>
          </div>
        </div>
      </div>

      {/* Inside my head — the desktop */}
      <section className="mt-24">
        <Reveal>
          <SectionLabel tone="muted" className="mb-8 justify-center">
            On my desk
          </SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <OpenTabs />
        </Reveal>
      </section>

      {/* Education & credentials */}
      <section className="mt-24 grid items-start gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel index="02" className="mb-6">
              Education
            </SectionLabel>
            <div className="np-rule-draw h-[1.5px] bg-border-strong" />
          </Reveal>
          <Reveal>
            <EducationFolder />
          </Reveal>
        </div>
        <div>
          <Reveal>
            <SectionLabel index="03" className="mb-6">
              Credentials
            </SectionLabel>
            <div className="np-rule-draw h-[1.5px] bg-border-strong" />
          </Reveal>
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 60}>
              <a
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-6 border-b border-border py-4 no-underline"
              >
                <span>
                  <span className="block font-serif text-lg text-foreground transition-colors duration-150 group-hover:text-rose">
                    {cert.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                    {cert.issuer} · {cert.date}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-muted-foreground transition-colors duration-150 group-hover:text-rose"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-20">
        <LLink href="/contact" variant="primary">
          Work with me <span className="np-arrow">→</span>
        </LLink>
      </Reveal>
    </Container>
  )
}
