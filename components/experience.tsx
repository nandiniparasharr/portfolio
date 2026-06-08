import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

type Experience = {
  company: string
  role: string
  date: string
  points: string[]
}

const experiences: Experience[] = [
  {
    company: 'American Express',
    role: 'Finance & Automations Apprentice',
    date: 'June 2025 – Present',
    points: [
      'Collaborated with 5+ cross-functional teams to identify automation opportunities.',
      'Built a Python-assisted automation workflow using ChatGPT, Copilot, PyCharm, and Excel — appreciated by management.',
      'Supported month-end close, financial reporting, capitalization testing, OPEX review, and 5+ regulatory filings (XBRL, SOFTEX, MPR).',
    ],
  },
  {
    company: 'Kairne Capital IFSC',
    role: 'Investment Intern',
    date: 'Feb 2025 – June 2025',
    points: [
      'Conducted financial due diligence and analysis for M&A and startup transactions.',
      'Identified investment opportunities in distressed assets and 25+ NCLT cases.',
      'Worked on 20+ pitch decks for unlisted companies and startups.',
    ],
  },
  {
    company: 'RevRoad VC',
    role: 'Remote Extern',
    date: 'Aug 2024 – Sep 2024',
    points: [
      'Performed secondary research on US EdTech companies; identified 10+ actionable growth opportunities.',
      "Sourced a startup with 75% adherence to RevRoad's investment criteria.",
    ],
  },
  {
    company: 'Tech Mahindra',
    role: 'Finance Department Intern',
    date: 'June 2023 – July 2023',
    points: [
      'Supported budgeting and cost analysis; implemented cost-saving measures resulting in a 15% overhead cost reduction.',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading eyebrow="Career" title="Work Experience" />

        <ol className="relative ml-[5px] border-l border-gold/25 pl-12 sm:pl-16">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.company} delay={i * 80} className="mb-14 last:mb-0">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {exp.date}
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-gold">
                {exp.company}
              </h3>
              <p className="text-sm font-medium text-foreground">{exp.role}</p>
              <ul className="mt-3 space-y-2">
                {exp.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    <span className="text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
