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
import { categoryById, projects } from '@/lib/content'

/* Copy comes through as one string or several. Several renders as separate
   paragraphs, so a long section can breathe rather than arriving as a block. */
function Prose({ copy }: { copy: string | string[] }) {
  const paras = Array.isArray(copy) ? copy : [copy]
  return (
    <div className="max-w-xl">
      {paras.map((para, i) => (
        <p key={i} className={i === 0 ? 'm-0 text-muted-foreground' : 'm-0 mt-4 text-muted-foreground'}>
          {para}
        </p>
      ))}
    </div>
  )
}

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
            {/* Clickable here, unlike on the index card — there the badge sits
                inside the card's own anchor, and a link inside a link is
                invalid. Closes the loop: canvas → category → entry → category. */}
            <div className="mt-5 flex gap-1.5">
              {project.categories.map((id) => {
                const c = categoryById(id)
                return (
                  <Link
                    key={c.id}
                    href={`/work?c=${c.id}`}
                    className="no-underline"
                    aria-label={`See everything in ${c.label}`}
                  >
                    <Badge
                      tone={c.tone}
                      className="transition-opacity duration-150 hover:opacity-80"
                    >
                      {c.label}
                    </Badge>
                  </Link>
                )
              })}
            </div>
          </div>

          <Reveal className="mt-10">
            {(() => {
              const shot = (
                <ProjectImage
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  ratio="16/9"
                  fit="contain"
                  label="HERO IMAGE — SCREENSHOT OR CHART OF THE REAL THING"
                />
              )
              /* Only link once there is a real URL — a placeholder string
                 would render a dead anchor that still looks clickable. */
              if (!project.imageHref?.startsWith('http')) return shot
              return (
                <a
                  href={project.imageHref}
                  target="_blank"
                  rel="noreferrer"
                  className="np-shot"
                  aria-label={`${project.imageHrefLabel ?? 'Read more'} — opens in a new tab`}
                >
                  {shot}
                  <span className="np-shot-tag" aria-hidden="true">
                    {project.imageHrefLabel ?? 'Read more ↗'}
                  </span>
                </a>
              )
            })()}
          </Reveal>

          {/* Two paragraphs, no more. The Record box already carries the
              question, the method and the call, so the body's only job is the
              part a box cannot hold: the setup, and the finding. */}
          <Reveal>
            <h3 className="mb-3 mt-12 text-h3">The setup</h3>
            <Prose copy={project.brief} />
          </Reveal>
          {project.pullQuote && (
            <Reveal>
              <blockquote className="np-pull">{project.pullQuote}</blockquote>
            </Reveal>
          )}
          <Reveal>
            {/* an analysis reports a finding; a build reports how it works */}
            <h3 className="mb-3 mt-10 text-h3">
              {project.foundLabel ?? 'What I found'}
            </h3>
            {project.found ? (
              <Prose copy={project.found} />
            ) : (
              <p className="m-0 max-w-xl border border-dashed border-border p-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                TODO — lib/content.ts → found
              </p>
            )}
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="border border-border bg-card p-6 shadow-card">
            <SectionLabel tone="muted" className="mb-3">
              The record
            </SectionLabel>
            {project.record.map((row, i) => (
              <LedgerRow
                key={row.label}
                label={row.label}
                href={row.href?.startsWith('http') ? row.href : undefined}
                value={
                  /* an empty row — or one whose link is still a placeholder —
                     is a prompt, not a gap. It should be impossible to ship a
                     case study with no conclusion, or a dead link. */
                  row.value && (!row.href || row.href.startsWith('http')) ? (
                    row.value
                  ) : (
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                      TODO — lib/content.ts
                    </span>
                  )
                }
                last={i === project.record.length - 1 && !project.href}
              />
            ))}
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
