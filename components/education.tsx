import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const education = [
  {
    title: 'CFA Program Level I',
    institution: 'CFA Institute',
    date: 'March 2026',
    note: 'Practical Skill Module — Financial Modelling',
  },
  {
    title: 'BSc Finance',
    institution: 'NMIMS Bangalore',
    date: 'Aug 2021 – Aug 2024',
    note: 'Key modules: Strategic Management, Corporate Finance, Financial Reporting, Derivatives & Risk Management, Financial Modelling and Valuations.',
  },
]

export function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="gold-grid absolute inset-0 z-0 opacity-50" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <SectionHeading eyebrow="Academics" title="Education" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <article className="group h-full rounded-lg border border-gold/30 bg-card p-7 transition-colors hover:border-gold/70">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.date}
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">
                  {item.institution}
                </p>
                <div className="mt-5 h-px w-full bg-gold/20" />
                <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
