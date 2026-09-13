/* All site copy and data in one place. TODO markers are yours to fill. */

export const site = {
  name: 'Nandini Parashar',
  email: 'nandiniparashar207@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nandiniparashar/',
  resume: '/NandiniParashar_CV.pdf',
  location: 'Delhi-NCR, India',
  tagline: 'Numbers by day. Everything else by curiosity.',
}

export type BadgeTone = 'rose' | 'plum' | 'forest' | 'ink'

/* ---------- categories ----------
   One vocabulary, shared by the canvas and the work index. The six objects
   painted on the canvas ARE the categories: clicking one on the home page
   lands on exactly the set the work filter shows under the same name, so a
   visitor never has to learn a second set of words halfway through.

   Tone groups them into families rather than giving each its own colour:
   forest is analysis, plum is built, ink is written, rose is consumer. */
export type CategoryId =
  | 'research'
  | 'models'
  | 'builds'
  | 'essays'
  | 'beauty'
  | 'luxury'

export type Category = {
  id: CategoryId
  label: string
  tone: BadgeTone
  /** What the category covers. Carries the canvas panel, and stands in as
      the work index's empty state before anything is published into it. */
  blurb: string
}

export const categories: Category[] = [
  {
    id: 'research',
    label: 'Research',
    tone: 'forest',
    blurb:
      'Company profiles and research notes — the write-ups behind the models.',
  },
  {
    id: 'models',
    label: 'Models',
    tone: 'forest',
    blurb:
      'DCFs, unit economics and scenario work, with what each one concluded.',
  },
  {
    id: 'builds',
    label: 'Builds',
    tone: 'plum',
    blurb: 'Things I designed and shipped — apps, dashboards, tools.',
  },
  {
    id: 'essays',
    label: 'Essays',
    tone: 'ink',
    blurb:
      'Essays on markets, machines and the things I cannot stop analysing.',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    tone: 'rose',
    blurb:
      'Consumer sector coverage — unit economics and brand equity, in lipstick.',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    tone: 'rose',
    blurb: 'What a handbag costs to make, and what it costs to want.',
  },
]

export function categoryById(id: CategoryId): Category {
  const found = categories.find((c) => c.id === id)
  /* A typo'd id would otherwise render an unlabelled badge and a filter that
     silently matches nothing — fail where it can be seen instead. */
  if (!found) throw new Error(`Unknown category: ${id}`)
  return found
}

/* One line of the case study's Record box. Rows are per-project on purpose:
   an equity research note and a web app do not have the same facts worth
   stating, and forcing both through Role/Stack/Status made every entry sound
   like a CV bullet. Leave `value` out and the row renders as a visible TODO
   rather than silently disappearing. */
export type RecordRow = { label: string; value?: string; href?: string }

export type Project = {
  slug: string
  num: string
  title: string
  /** Which canvas categories this entry belongs to. Drives its badges and
      every filter it appears under — there is no separate badge list to
      drift out of step with the taxonomy. */
  categories: CategoryId[]
  stack: string
  blurb: string
  /** The setup — why the question was worth settling. A single string is one
      paragraph; an array is several, so a long section can breathe instead of
      arriving as one block. */
  brief: string | string[]
  /** What you found, with the numbers. One string or several paragraphs, as
      above. Absent renders a visible prompt rather than nothing, same as an
      empty record row. */
  found?: string | string[]
  /** Heading for paragraph two. An analysis reports a finding; a build
      reports how it works. Defaults to "What I found". */
  foundLabel?: string
  /** One line worth pulling out, set between the two paragraphs. */
  pullQuote?: string
  role: string
  status: string
  /** The Record box. THE CALL is the one that earns its place — what you
      concluded, in one line. */
  record: RecordRow[]
  href?: string
  hrefLabel?: string
  /** Screenshot under /public/projects; falls back to the placeholder block. */
  image?: string
  /** Makes the screenshot itself a link. An image that links with no
      affordance is an invisible link, so the template pins a visible tag to
      it — imageHrefLabel is what that tag says. */
  imageHref?: string
  imageHrefLabel?: string
}

export const projects: Project[] = [
  {
    slug: 'portfolio-prism',
    num: '01',
    title: 'Portfolio Prism',
    categories: ['builds'],
    stack: 'Portfolio analytics · risk metrics',
    blurb:
      'You upload your portfolio and it breaks it down the way an analyst would, then explains all of it in plain English.',
    brief: [
      'Most investing apps stop at your holdings and a profit and loss number. That tells you what happened, not whether you took a sensible amount of risk to get it. The numbers that would answer that, how concentrated you are in a few positions, how volatile the whole thing is, what the returns look like once risk is accounted for, are the ones nobody bothers to put in front of a retail investor.',
      'So I built the thing I wanted to use. You drop in a CSV or an Excel file from your broker, or type the holdings in by hand, and it runs the analysis a professional would run. The name is the idea: one thing goes in, your portfolio, and it comes back refracted into all the parts worth looking at.',
    ],
    foundLabel: 'What it does',
    found: [
      'It works out how concentrated you are, how volatile the portfolio is, your Sharpe ratio, your Value at Risk on a bad day, how much your holdings move together, and how the split between equity and mutual funds actually sits. Every figure comes from a documented formula, the same ones in the CFA curriculum, so none of it is guesswork.',
      'On top of the numbers it writes a short investment brief that reads them back to you in plain language. It is only allowed to interpret figures that have already been calculated, so it cannot invent one. There is no login and nothing is stored: it runs in your browser for that session and then it is gone. Visitors can also leave a small artifact behind that scatters into the background of the site, which is the one part that exists purely because I thought it would be fun.',
    ],
    role: 'Research & build',
    status: 'Live',
    href: 'https://portfolio-prism.vercel.app',
    hrefLabel: 'Open the app ↗',
    image: '/projects/portfolio-prism.png',
    record: [
      { label: 'The question', value: 'Can a retail investor get an advisor’s read without an advisor?' },
      { label: 'The call' },
      { label: 'Method', value: 'Allocation, risk, correlation and risk-adjusted return' },
      { label: 'Data', value: 'Yahoo Finance for equities · AMFI for mutual fund NAVs' },
      { label: 'Built with', value: 'Next.js · TypeScript · Vercel' },
      { label: 'When', value: '2025' },
    ],
  },
  {
    slug: 'avenue-supermarts',
    num: '02',
    title: 'Avenue Supermarts, profiled',
    categories: ['research'],
    stack: 'Company profile · equity research',
    blurb:
      'A one-page company profile of DMart: 5Y financials, ratios, and price history.',
    brief: [
      'Avenue Supermarts runs DMart on a simple premise: everyday low cost, everyday low price. The premise is easy enough to state. Whether it actually holds up in the numbers, and whether the market is paying a fair price for it, is a different question.',
      'So I built a valuation model rather than a summary. Financials projected out to FY29, with reinvestment rates, growth trajectory and capital efficiency feeding the cash flows, and intrinsic value estimated two ways: a DCF, and a relative valuation against comparable multiples.',
    ],
    foundLabel: 'What I looked at',
    found: [
      'Alongside the model I ran a financial analysis summary across five fiscal years, covering more than ten metrics: revenue growth, EBITDA margins, return ratios and the rest. The point was to see whether a strategy like that leaves a trace you can actually measure, year after year, rather than only in the way the company describes itself.',
      'Then the valuation multiples and the analytical ratios, read as trends rather than snapshots. A single year of P/E says very little about a retailer that reinvests as heavily as this one does. What the market is paying, and what it is paying for, only shows up once you line the years up next to each other.',
    ],
    role: 'Equity research',
    status: 'Shipped',
    href: 'https://drive.google.com/file/d/1csVyFxaZZWlwcMgR4yM1XdoT6RySykMq/view?usp=sharing',
    hrefLabel: 'View the profile ↗',
    image: '/projects/avenue-supermarts.png',
    record: [
      { label: 'The question', value: 'Does everyday-low-price actually show up in DMart’s numbers?' },
      { label: 'The call' },
      { label: 'Method', value: 'DCF and relative valuation · 5Y ratio analysis' },
      { label: 'Projected to', value: 'FY29' },
      { label: 'Data', value: 'Company filings · FY19 to FY24' },
      { label: 'When', value: '2024' },
    ],
  },
  {
    slug: 'skippi-ice-pops',
    num: '03',
    title: 'Skippi, by the unit',
    categories: ['models'],
    stack: 'Unit economics · scenario analysis',
    blurb:
      'Unit economics of a ₹20 ice pop: A Shark Tank India case, taken seriously.',
    brief: [
      'I came across a Shark Tank India clip about Skippi, a brand selling ice pops, which had just raised ₹1 crore. The product sells for ₹20. That is a small enough number that it seemed worth asking whether it makes any money at all once everything has been taken out of it.',
      'So I took the pitch and built a rough model around it: cost per pop, margins across retail and wholesale, and what payback could look like on a ₹20 frozen snack. Nothing elaborate, just the question a founder would have to answer before scaling.',
    ],
    foundLabel: 'What it taught me',
    found: [
      'The interesting part was breaking a single ₹20 unit into COGS, CAC, distributor and retailer margins, and overheads, then asking how a low ticket FMCG product gets to be properly profitable at scale. Retail and wholesale behave very differently once you do that, and the gap between them is not small.',
      'Two things caught me out. Overheads carry more weight than they look like they should at this price point, and CAC can eat a real share of a ticket this tiny. It turned into a useful way into channel strategy and price positioning, and honestly it felt like wearing a founder’s hat for a few hours.',
    ],
    role: 'Analysis & modelling',
    status: 'Shipped',
    href: 'https://docs.google.com/spreadsheets/d/1QwZtbIA13qkOlhkFZbImC76xpiuAyIsD/edit?usp=sharing&ouid=108525365897885632984&rtpof=true&sd=true',
    hrefLabel: 'View the sheet ↗',
    image: '/projects/skippi-ice-pops.png',
    imageHref: 'https://www.linkedin.com/posts/nandiniparashar_i-came-across-this-shark-tank-india-clip-activity-7356610367705268225-bZJp?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdQHd8BUfsVmYttbUyqV4Vb1ti5m3ABNe4',
    imageHrefLabel: 'Read the write-up ↗',
    record: [
      { label: 'The question', value: 'Does a ₹20 ice pop actually make money?' },
      { label: 'The call' },
      { label: 'Method', value: 'Dual-channel unit economics · scenario analysis' },
      { label: 'Built with', value: 'Excel' },
      { label: 'When', value: '2024' },
    ],
  },
  {
    slug: 'study-tracker',
    num: '04',
    title: 'Study Tracker',
    categories: ['builds'],
    stack: 'Study timer · CFA prep',
    blurb:
      'A desktop app I built to track my CFA study hours. A timer, and a dashboard that shows where the week actually went.',
    brief: [
      'I was studying for CFA Level I and had no real idea where my hours were going. I knew I’d done a lot of Derivatives and not much Ethics, but that’s a feeling, and a feeling is a bad way to allocate time across a syllabus.',
      'Every tracker I looked at wanted an account and a subscription to tell me something that should live on my own laptop. So I made one that doesn’t.',
    ],
    foundLabel: 'How I use it',
    found: [
      'I start it when I sit down and stop it when I get up. It’s a stopwatch when I’m just working, and a countdown when I’m doing a fixed block. Tagging the subject is optional, so there’s never an excuse not to start.',
      'At the end of the week it shows me the daily bars, the streak, and a breakdown of where the hours actually went. That last part is the whole point: it’s how I find out I’ve been quietly avoiding Quant for nine days.',
    ],
    role: 'Design & build',
    status: 'Live',
    image: '/projects/study-tracker.png',
    imageHref: 'https://github.com/nandiniparasharr/studytracker',
    imageHrefLabel: 'View the repo ↗',
    record: [
      {
        label: 'The question',
        value: 'Is my study time spread across the syllabus, or piled into what I already like?',
      },
      { label: 'The call' },
      { label: 'How it works', value: 'Start a timer, tag the subject, see the week' },
      { label: 'Built with', value: 'Python, Claude Code' },
      { label: 'When', value: '2026' },
    ],
  },
]

/** Every entry filed under a category, in the order the index lists them. */
export function projectsIn(id: CategoryId) {
  return projects.filter((p) => p.categories.includes(id))
}

/* Derived, never hand-written: only categories that actually hold an entry
   become filters, so a chip can never return an empty grid — which reads as
   a broken page rather than an empty category. Publish into Essays and the
   Essays chip appears on its own. */
export const workFilters = categories.filter((c) => projectsIn(c.id).length > 0)

export type Role = {
  company: string
  role: string
  date: string
  points: string[]
}

export const experience: Role[] = [
  {
    company: 'American Express',
    role: 'Gen AI & Automations Apprentice',
    date: 'Jun 2025 — Present',
    points: [
      'Collaborated with cross-functional teams to identify automation opportunities.',
      'Built a Python-assisted automation workflow using ChatGPT, Copilot, PyCharm, and Excel — appreciated by management.',
      'Supported month-end close, financial reporting, capitalization testing, OPEX review, and regulatory filings (XBRL, SOFTEX, MPR).',
    ],
  },
  {
    company: 'Kairne Capital IFSC',
    role: 'Investment Intern',
    date: 'Feb 2025 — Jun 2025',
    points: [
      'Conducted financial due diligence and analysis for M&A and startup transactions.',
      'Identified investment opportunities in distressed assets and 25+ NCLT cases.',
      'Worked on 20+ pitch decks for unlisted companies and startups.',
    ],
  },
  {
    company: 'RevRoad VC',
    role: 'Remote Extern',
    date: 'Aug 2024 — Sep 2024',
    points: [
      'Performed secondary research on US EdTech companies; identified 10+ actionable growth opportunities.',
      "Sourced a startup with 75% adherence to RevRoad's investment criteria.",
    ],
  },
  {
    company: 'Tech Mahindra',
    role: 'Finance Department Intern',
    date: 'Jun 2023 — Jul 2023',
    points: [
      'Supported budgeting and cost analysis; implemented cost-saving measures resulting in a 15% overhead cost reduction.',
    ],
  },
]

export const skillGroups: {
  title: string
  tone: 'forest' | 'plum' | 'rose'
  items: string[]
}[] = [
  {
    title: 'Finance & markets',
    tone: 'forest',
    items: [
      'Valuation',
      'Pitch decks',
      'Investment memos',
      'Research reports',
    ],
  },
  {
    title: 'Technical',
    tone: 'plum',
    items: [
      'Python for finance',
      'GenAI-assisted workflows',
      'Bloomberg Terminal',
    ],
  },
  {
    title: 'Off the clock',
    tone: 'rose',
    items: ['Writing & editing', 'Design — in progress'],
  },
]

export const pursuits = [
  {
    num: '01',
    title: 'Markets',
    note: 'Finance by profession; CFA Level I passed.',
  },
  {
    num: '02',
    title: 'Machines',
    note: 'Python, GenAI, and whatever the workflow demands.',
  },
  {
    num: '03',
    title: 'Margins',
    note: 'Essays on markets and machines; a reading habit that funds them.',
  },
  {
    num: '04',
    title: 'Making',
    note: 'Design — the newest chapter, opened this year.',
  },
]

export const currently = [
  { label: 'Learning', value: 'Design, and the code that ships it' },
  { label: 'Based in', value: 'Delhi-NCR, India' },
  { label: 'Reading', value: 'Ask me — it changes weekly' },
]

/* Rendered as cards. `brand` is the short line under the title, `image` is the
   file to drop into public/ — until it exists the card shows a placeholder. */
export const education = [
  {
    title: 'BSc Finance',
    brand: 'NMIMS',
    icon: 'cap' as const,
    image: '/about/education/bsc-finance.jpg',
    institution: 'NMIMS Bangalore',
    date: '2021 — 2024',
    note: 'Strategic Management, Corporate Finance, Financial Reporting, Derivatives & Risk Management, Financial Modelling and Valuations.',
  },
  {
    title: 'CFA Level I',
    brand: 'CFA Institute',
    icon: 'seal' as const,
    image: '/about/education/cfa-level-1.png',
    institution: 'CFA Institute',
    date: 'Mar 2026',
    note: 'Passed Level I (March 2026). Practical Skill Module — Financial Modelling.',
  },
]

export const certifications = [
  {
    name: 'CFA Program Level I',
    issuer: 'CFA Institute',
    date: 'Mar 2026',
    href: 'https://credentials.cfainstitute.org/e2070836-c122-4f13-b9ed-78018a9132f3#acc.tlmfRdTy',
  },
  {
    name: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    date: 'Dec 2025',
    href: 'https://www.credly.com/badges/16786155-2f96-4ff7-abad-03273c06ced8/public_url',
  },
  {
    name: 'Bloomberg Finance Fundamentals',
    issuer: 'Bloomberg',
    date: 'May 2024',
    href: 'https://portal.bloombergforeducation.com/certificates/bUmafHj52QN7NohrTNdNBG3F',
  },
  {
    name: 'Bloomberg Market Concepts',
    issuer: 'Bloomberg',
    date: 'Jul 2023',
    href: 'https://portal.bloombergforeducation.com/certificates/5WRzuYqPqQ51DzEJtm8Fqbxr',
  },
  {
    name: 'Introduction to Strategy Consulting',
    issuer: 'BCG',
    date: 'Nov 2022',
    href: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/BCG%20/4Rfzeut8gXmNwfxXv_BCG%20_W7jWxe9XGttSAFaiE_1669142379135_completion_certificate.pdf',
  },
]

export const navLinks = [
  /* The wordmark already goes home, but only people who have used a site like
     this one know that. Home says it out loud. */
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]
