import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

type Project = {
  name: string
  description: string
  tags: string[]
  href?: string
}

const projects: Project[] = [
  {
    name: 'Portfolio Pulse',
    description:
      'An AI-driven portfolio analysis tool — a robo-advisor model evaluating user holdings for risk, asset allocation, correlation exposure, diversification metrics, and 3 actionable insights.',
    tags: ['Portfolio Analysis', 'AI', 'Risk Metrics'],
  },
  {
    name: 'Skippi Ice Pops',
    description:
      'Unit economics breakdown for a Shark Tank India case: analyzed COGS, CAC, dual-channel margins (retail vs. wholesale), and payback dynamics for a ₹20 FMCG product, with scenario analysis on distribution and profitability.',
    tags: ['Unit Economics', 'Scenario Analysis', 'Channel Strategy'],
    href: 'https://docs.google.com/spreadsheets/d/1QwZtbIA13qkOlhkFZbImC76xpiuAyIsD/edit?usp=sharing&ouid=108525365897885632984&rtpof=true&sd=true',
  },
  {
    name: 'Avenue Supermarts Ltd',
    description:
      'Detailed DCF and relative valuation model projecting financials through FY29. Analyzed reinvestment rates, capital efficiency, intrinsic value, and 10+ key metrics over 5 fiscal years.',
    tags: ['DCF', 'Relative Valuation', 'Financial Modelling', 'Equity Research'],
    href: 'https://drive.google.com/file/d/1csVyFxaZZWlwcMgR4yM1XdoT6RySykMq/view?usp=sharing',
  },
]

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.href ? 'a' : 'div'
  const wrapperProps = project.href
    ? {
        href: project.href,
        target: '_blank',
        rel: 'noreferrer',
        'aria-label': `${project.name} (opens in a new tab)`,
      }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative block h-full overflow-hidden rounded-lg border border-border bg-card p-7 transition-colors hover:border-gold/60"
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gold/60" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-3xl font-semibold text-foreground transition-colors group-hover:text-gold">
          {project.name}
        </h3>
        {project.href ? (
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-gold"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-light"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading eyebrow="Selected Work" title="Projects" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              delay={i * 90}
              className={i === 2 ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
