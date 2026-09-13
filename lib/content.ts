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
  badges: { tone: BadgeTone; label: string }[]
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
    badges: [
      { tone: 'forest', label: 'Finance' },
      { tone: 'plum', label: 'AI & Code' },
    ],
    stack: 'Robo-advisor model · risk analytics',
    blurb:
      'An AI-driven portfolio analysis app that reads a set of holdings the way an advisor would.',
    brief:
      'Most retail portfolios never get a second pair of eyes. The idea: a robo-advisor model that takes a user’s holdings and returns an honest read — risk, asset allocation, correlation exposure, and diversification — without the wealth-management minimum.',
    role: 'Research & build',
    status: 'Live',
    href: 'https://portfolio-prism.vercel.app',
    hrefLabel: 'Open the app ↗',
    image: '/projects/portfolio-prism.png',
    record: [
      { label: 'The question', value: 'Can a retail investor get an advisor’s read without an advisor?' },
      { label: 'The call' },
      { label: 'Method', value: 'Risk, allocation, correlation and diversification scoring' },
      { label: 'Built with', value: 'Python · Streamlit' },
      { label: 'When', value: '2025' },
    ],
  },
  {
    slug: 'avenue-supermarts',
    num: '02',
    title: 'Avenue Supermarts, profiled',
    badges: [{ tone: 'forest', label: 'Finance' }],
    stack: 'Company profile · equity research',
    blurb:
      'A one-page company profile of DMart — five years of financials, ratios, and price history.',
    brief:
      'Avenue Supermarts runs DMart on a simple premise: everyday low cost, everyday low price. The exercise: compress the company into one honest page — what it does, how the strategy shows up in the numbers, and what the market pays for it.',
    role: 'Equity research',
    status: 'Shipped',
    href: 'https://drive.google.com/file/d/1csVyFxaZZWlwcMgR4yM1XdoT6RySykMq/view?usp=sharing',
    hrefLabel: 'View the profile ↗',
    image: '/projects/avenue-supermarts.png',
    record: [
      { label: 'The question', value: 'Does everyday-low-price actually show up in DMart’s numbers?' },
      { label: 'The call' },
      { label: 'Method', value: 'Five-year ratio and price analysis' },
      { label: 'Data', value: 'Company filings · FY19—FY24' },
      { label: 'When', value: '2024' },
    ],
  },
  {
    slug: 'skippi-ice-pops',
    num: '03',
    title: 'Skippi, by the unit',
    badges: [{ tone: 'forest', label: 'Finance' }],
    stack: 'Unit economics · scenario analysis',
    blurb:
      'Unit economics of a ₹20 ice pop — the Shark Tank India case, taken seriously.',
    brief:
      'Skippi sells an FMCG product for ₹20. The question worth answering: does a popsicle that cheap actually make money once COGS, CAC, and two very different channels (retail vs. wholesale) have their say?',
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
    badges: [{ tone: 'plum', label: 'AI & Code' }],
    stack: 'Study timer · CFA prep',
    blurb:
      'A desktop app I built to track my CFA study hours — a timer, and a dashboard that shows where the week actually went.',
    brief: [
      'I was studying for CFA Level I and had no real idea where my hours were going. I knew I’d done a lot of Derivatives and not much Ethics — but that’s a feeling, and a feeling is a bad way to allocate time across a syllabus.',
      'Every tracker I looked at wanted an account and a subscription to tell me something that should live on my own laptop. So I made one that doesn’t.',
    ],
    foundLabel: 'How I use it',
    found: [
      'I start it when I sit down and stop it when I get up — a stopwatch when I’m just working, a countdown when I’m doing a fixed block. Tagging the subject is optional, so there’s never an excuse not to start.',
      'At the end of the week it shows me the daily bars, the streak, and a breakdown of where the hours actually went. That last part is the whole point: it’s how I find out I’ve been quietly avoiding Quant for nine days.',
    ],
    role: 'Design & build',
    status: 'Live',
    href: 'https://github.com/nandiniparasharr/studytracker',
    hrefLabel: 'View the repo ↗',
    image: '/projects/study-tracker.png',
    record: [
      {
        label: 'The question',
        value: 'Is my study time spread across the syllabus, or piled into what I already like?',
      },
      { label: 'The call' },
      { label: 'How it works', value: 'Start a timer, tag the subject, see the week' },
      { label: 'Built with', value: 'Python — runs on my laptop, no account, no cloud' },
      { label: 'When', value: 'Aug — Sep 2026' },
    ],
  },
  {
    slug: 'the-rebrand',
    num: '05',
    title: 'The rebrand — this site',
    badges: [{ tone: 'ink', label: 'Design' }],
    stack: 'Design system · Next.js',
    blurb:
      'This site. A full design system in rose madder, plum, and forest ink.',
    brief:
      'A portfolio should read like its owner thinks. The brief: design a personal brand system from scratch — editorial, square-cornered, serif-led — and implement it as a real site with light and dark themes.',
    role: 'Design & build',
    status: 'Live',
    record: [
      { label: 'The question', value: 'What does a personal brand look like when you build it yourself?' },
      { label: 'The call' },
      { label: 'Method', value: 'Token system · light and dark themes' },
      { label: 'Built with', value: 'Next.js · TypeScript' },
      { label: 'When', value: '2026' },
    ],
  },
]

export const workFilters = ['All', 'Finance', 'AI & Code', 'Design']

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
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]
