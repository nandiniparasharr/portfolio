import type { Metadata } from 'next'
import {
  Container,
  ImagePlaceholder,
  LLink,
  LedgerRow,
  SectionLabel,
} from '@/components/ledger'
import { Reveal } from '@/components/reveal'
import {
  certifications,
  currently,
  education,
  experience,
  ledgers,
  site,
} from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — Nandini Parashar',
  description:
    'Finance by profession — markets, machines, margins, and making. The full ledger.',
}

export default function AboutPage() {
  return (
    <Container className="pb-24 pt-18">
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="order-2 lg:order-1">
          <ImagePlaceholder
            ratio="4/5"
            label="PORTRAIT — A REAL PHOTO, NOT A HEADSHOT"
          />
          <div className="mt-5 border border-border bg-card p-4">
            <SectionLabel tone="muted" className="mb-2">
              Currently
            </SectionLabel>
            {currently.map((c, i) => (
              <LedgerRow
                key={c.label}
                label={c.label}
                value={c.value}
                last={i === currently.length - 1}
              />
            ))}
          </div>
          <div className="mt-5">
            <LLink href={site.resume} variant="ghost">
              Download the CV ↗
            </LLink>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel className="mb-4">About</SectionLabel>
          <h1 className="text-display">
            Jack of all trades, <em className="text-rose">on purpose</em>.
          </h1>
          <p className="mt-6 max-w-lg text-lead text-muted-foreground">
            I work in finance and love it — and I refuse to stop there. This
            site is the ledger of everything else: code, writing, design, and
            the reading that feeds all of it.
          </p>

          <div className="mt-12">
            {ledgers.map((l, i) => (
              <Reveal
                key={l.num}
                delay={i * 80}
                className={`flex items-baseline gap-6 py-5 ${
                  i < ledgers.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <span className="w-14 flex-none font-serif text-[34px] italic text-rose">
                  {l.num}
                </span>
                <div>
                  <div className="font-serif text-h3 text-foreground">
                    {l.title}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {l.note}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <section id="experience" className="mt-24">
        <Reveal>
          <SectionLabel index="02" className="mb-6">
            Experience
          </SectionLabel>
          <div className="np-rule-draw h-0.5 bg-border-strong" />
        </Reveal>
        {experience.map((role, i) => (
          <Reveal
            key={role.company}
            delay={i * 80}
            className="grid gap-x-12 gap-y-2 border-b border-border py-8 md:grid-cols-[220px_1fr]"
          >
            <div>
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                {role.date}
              </p>
              <h3 className="mt-1 text-h3">{role.company}</h3>
              <p className="m-0 mt-1 text-sm text-muted-foreground">
                {role.role}
              </p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden="true" className="text-rose">
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      {/* Education & credentials */}
      <section className="mt-24 grid items-start gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel index="03" className="mb-6">
              Education
            </SectionLabel>
            <div className="np-rule-draw h-0.5 bg-border-strong" />
          </Reveal>
          {education.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 80}
              className="border-b border-border py-6"
            >
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                {item.date}
              </p>
              <h3 className="mt-1 text-h3">{item.title}</h3>
              <p className="m-0 mt-1 text-sm text-rose">{item.institution}</p>
              <p className="m-0 mt-3 text-sm text-muted-foreground">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>
        <div>
          <Reveal>
            <SectionLabel index="04" className="mb-6">
              Credentials
            </SectionLabel>
            <div className="np-rule-draw h-0.5 bg-border-strong" />
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
