import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Badge,
  Container,
  IndexNumeral,
  LLink,
  LedgerRow,
  SectionLabel,
} from '@/components/ledger'
import { ProjectImage } from '@/components/project-image'
import { Reveal } from '@/components/reveal'
import { projects } from '@/lib/content'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Nandini Parashar`,
    description: project.blurb,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = projects[index]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <Container className="pb-24 pt-18">
      <div className="grid items-start gap-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative">
          <IndexNumeral
            value={project.num}
            tone="tint"
            className="absolute -top-6 right-0 z-0 text-[220px]"
          />
          <div className="relative">
            <SectionLabel className="mb-4">
              Case study — {project.num}
            </SectionLabel>
            <h1 className="max-w-lg text-display">{project.title}</h1>
            <p className="mt-5 max-w-md text-lead text-muted-foreground">
              {project.blurb}
            </p>
            <div className="mt-5 flex gap-1.5">
              {project.badges.map((b) => (
                <Badge key={b.label} tone={b.tone}>
                  {b.label}
                </Badge>
              ))}
            </div>
          </div>

          <Reveal className="mt-10">
            <ProjectImage
              src={project.image}
              alt={`${project.title} screenshot`}
              ratio="16/9"
              fit="contain"
              label="HERO IMAGE — SCREENSHOT OR CHART OF THE REAL THING"
            />
          </Reveal>

          <Reveal>
            <h3 className="mb-3 mt-12 text-h3">The brief</h3>
            <p className="m-0 max-w-xl text-muted-foreground">
              {project.brief}
            </p>
          </Reveal>
          <Reveal>
            <h3 className="mb-3 mt-10 text-h3">What shipped</h3>
            <p className="m-0 max-w-xl text-muted-foreground">
              {project.shipped}
            </p>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="border border-border bg-card p-6 shadow-card">
            <SectionLabel tone="muted" className="mb-3">
              The record
            </SectionLabel>
            <LedgerRow label="Role" value={project.role} />
            <LedgerRow label="Stack" value={project.stack} />
            <LedgerRow label="Status" value={project.status} last={!project.href} />
            {project.href && (
              <div className="mt-5">
                <LLink
                  href={project.href}
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center"
                >
                  {project.hrefLabel ?? 'View source ↗'}
                </LLink>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-between">
            <Link
              href={`/work/${prev.slug}`}
              aria-label={`Previous entry: ${prev.title}`}
              className="border border-border px-3.5 py-2 font-mono text-sm text-muted-foreground no-underline transition-colors duration-150 hover:border-border-strong hover:text-foreground"
            >
              ←
            </Link>
            <Link
              href="/work"
              className="border-b border-current pb-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-plum no-underline transition-colors duration-150 hover:text-rose"
            >
              All entries
            </Link>
            <Link
              href={`/work/${next.slug}`}
              aria-label={`Next entry: ${next.title}`}
              className="border border-border px-3.5 py-2 font-mono text-sm text-muted-foreground no-underline transition-colors duration-150 hover:border-border-strong hover:text-foreground"
            >
              →
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  )
}
