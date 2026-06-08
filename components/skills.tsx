import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const groups = [
  {
    label: 'Core Competencies',
    items: [
      'Financial Analysis',
      'Financial Reporting',
      'Variance Analysis',
      'Workflow Automation',
      'Investment Research',
      'Strategy & Operations',
      'Process Optimization',
    ],
  },
  {
    label: 'Technical Skills',
    items: [
      'Advanced Excel',
      'Power Automate',
      'Generative AI',
      'ChatGPT',
      'Microsoft Copilot',
      'PyCharm',
      'Oracle EBS',
      'Python',
      'Visio',
    ],
  },
  {
    label: 'Soft Skills',
    items: ['Task Prioritization', 'Conflict Resolution', 'Team Collaboration'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="gold-grid absolute inset-0 z-0 opacity-50" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <SectionHeading eyebrow="Toolkit" title="Skills" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 90}>
              <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-gold">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-gold/30 bg-card px-3.5 py-1.5 text-sm text-foreground transition-all hover:border-gold hover:shadow-[0_0_12px_rgba(201,168,76,0.25)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
