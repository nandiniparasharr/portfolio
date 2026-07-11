import Link from 'next/link'
import { Container, LLink, SectionLabel } from '@/components/ledger'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'
import { AllocationDonut } from '@/components/allocation-donut'
import { SkillsetTabs } from '@/components/skillset-tabs'
import { experience, projects, site } from '@/lib/content'

function Stage({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <div
      className={`np-stage ${className ?? ''}`}
      style={{ ['--stage-delay' as string]: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Page() {
  return (
    <>
      {/* Hero */}
      <Container className="pb-20 pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Stage delay={0}>
              <SectionLabel className="mb-5">Portfolio — 2026</SectionLabel>
            </Stage>
            <Stage delay={80}>
              <h1 className="max-w-xl text-hero">
                Curiosity, <em className="text-rose">compounding</em> daily.
              </h1>
            </Stage>
            <Stage delay={160}>
              <p className="mt-6 max-w-md text-muted-foreground">
                Finance professional building across markets, machines, and
                the written word.
              </p>
            </Stage>
            <Stage
              delay={240}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              <LLink href="/work" variant="primary">
                See the work <span className="np-arrow">→</span>
              </LLink>
              <LLink href={site.substack} variant="ghost">
                Read the Substack ↗
              </LLink>
            </Stage>
          </div>
          <Stage delay={320} className="justify-self-center lg:justify-self-end">
            <AllocationDonut />
          </Stage>
        </div>
      </Container>

      {/* Skillset */}
      <div className="border-t border-border">
        <Container className="py-14">
          <Reveal>
            <SectionLabel index="02" tone="muted" className="mb-8">
              Skillset
            </SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <SkillsetTabs />
          </Reveal>
        </Container>
      </div>

      {/* Selected work */}
      <div className="border-t border-border">
        <Container className="py-16">
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <Reveal>
              <SectionLabel index="03">Selected work</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <LLink href="/work" variant="ghost">
                All projects <span className="np-arrow">→</span>
              </LLink>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* Trajectory index */}
      <div className="border-t border-border">
        <Container className="py-16">
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <Reveal>
              <SectionLabel index="04">Trajectory</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <LLink href="/about" variant="ghost">
                The full story <span className="np-arrow">→</span>
              </LLink>
            </Reveal>
          </div>
          <Reveal>
            <div className="np-rule-draw h-0.5 bg-border-strong" />
          </Reveal>
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 80}>
              <Link
                href="/about"
                className="group flex flex-wrap items-baseline gap-x-7 gap-y-1 border-b border-border py-5 no-underline"
              >
                <span className="w-40 flex-none font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                  {role.date}
                </span>
                <span className="font-serif text-h3 text-foreground transition-colors duration-150 group-hover:text-rose">
                  {role.company}
                </span>
                <span className="ml-auto text-sm text-muted-foreground">
                  {role.role}
                </span>
              </Link>
            </Reveal>
          ))}
        </Container>
      </div>

      {/* Writing teaser */}
      <div className="border-t border-border">
        <Container className="py-16">
          <Reveal>
            <SectionLabel index="05" className="mb-6">
              Writing
            </SectionLabel>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal delay={80}>
              <h2 className="max-w-lg text-display">
                Notes from the <em className="text-rose">margins</em>.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Essays on markets, learning curves, and compounding — in money
                and in life. They live on Substack.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <LLink href={site.substack} variant="secondary">
                Subscribe on Substack ↗
              </LLink>
            </Reveal>
          </div>
        </Container>
      </div>
    </>
  )
}
