import { MapPin } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="about"
      className="grain relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="gold-grid absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="gold-dots absolute -right-10 top-24 z-0 hidden h-64 w-64 opacity-60 lg:block"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <span
            className="reveal is-visible inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs tracking-wide text-gold"
            style={{ animationDelay: '0ms' }}
          >
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Delhi-NCR
          </span>

          <h1 className="mt-6 text-balance text-6xl font-semibold leading-[0.95] text-foreground sm:text-7xl lg:text-8xl">
            NANDINI
            <br />
            PARASHAR
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-gold-light sm:text-lg">
            Finance &amp; Automations &middot; Investment Research &middot;
            Workflow Automation
          </p>
        </div>

        <div className="lg:col-span-4">
          <p className="text-pretty text-base leading-7 text-foreground">
            I work at the intersection of finance, research, and automation — building analytical systems 
            that improve decision-making and operational efficiency. My experience spans investment research,
            financial reporting and analysis, with a growing focus on fintech &amp; startup-focused finance.
          </p>
          <p className="text-pretty text-base leading-7 text-foreground">
            
            When I&apos;m not working, I&apos;m usually picking up side quests — exploring new tools, 
            or learning something that catches my interest. This website happenes to be one of those
            projects :D
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-[1100px] px-6">
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-light"
          >
            View My Work
          </a>
          <a
            href="/NandiniParashar_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-gold px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}
