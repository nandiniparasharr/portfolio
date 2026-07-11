/* All site copy and data in one place. TODO markers are yours to fill. */

export const site = {
  name: 'Nandini Parashar',
  shortMark: 'N—P',
  email: 'nandiniparashar207@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nandiniparashar/',
  substack: 'https://substack.com/@archivesbynan',
  substackName: 'Archives by Nan',
  resume: '/NandiniParashar_CV.pdf',
  location: 'Delhi-NCR, India',
  tagline: 'Numbers by day. Everything else by curiosity.',
}

export type BadgeTone = 'rose' | 'plum' | 'forest' | 'ink'

export type Project = {
  slug: string
  num: string
  title: string
  badges: { tone: BadgeTone; label: string }[]
  stack: string
  blurb: string
  brief: string
  shipped: string
  role: string
  status: string
  href?: string
  hrefLabel?: string
}

export const projects: Project[] = [
  {
    slug: 'portfolio-pulse',
    num: '01',
    title: 'Portfolio Pulse',
    badges: [
      { tone: 'forest', label: 'Finance' },
      { tone: 'plum', label: 'AI & Code' },
    ],
    stack: 'Robo-advisor model · risk analytics',
    blurb:
      'An AI-driven portfolio analysis tool that reads a set of holdings the way an advisor would.',
    brief:
      'Most retail portfolios never get a second pair of eyes. The idea: a robo-advisor model that takes a user’s holdings and returns an honest read — risk, asset allocation, correlation exposure, and diversification — without the wealth-management minimum.',
    shipped:
      'A working analysis engine that evaluates holdings across risk, allocation, correlation, and diversification metrics, then distils the diagnosis into three actionable insights per portfolio.',
    role: 'Research & build',
    status: 'Shipped',
  },
  {
    slug: 'avenue-supermarts',
    num: '02',
    title: 'Avenue Supermarts, valued',
    badges: [{ tone: 'forest', label: 'Finance' }],
    stack: 'DCF · relative valuation',
    blurb:
      'A full DCF and relative valuation of DMart’s parent, projected through FY29.',
    brief:
      'Avenue Supermarts trades at multiples that make analysts argue. The exercise: build the model from first principles — project the financials through FY29 and let reinvestment rates and capital efficiency, not sentiment, set the intrinsic value.',
    shipped:
      'A detailed valuation model covering five fiscal years and 10+ key metrics — reinvestment rates, capital efficiency, intrinsic value per share — with DCF and relative approaches reconciled side by side.',
    role: 'Equity research & modelling',
    status: 'Shipped',
    href: 'https://drive.google.com/file/d/1csVyFxaZZWlwcMgR4yM1XdoT6RySykMq/view?usp=sharing',
    hrefLabel: 'View the model ↗',
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
    shipped:
      'A unit-economics breakdown with dual-channel margin analysis and payback dynamics, plus scenario analysis on distribution and profitability — the spreadsheet answers the question either way.',
    role: 'Analysis & modelling',
    status: 'Shipped',
    href: 'https://docs.google.com/spreadsheets/d/1QwZtbIA13qkOlhkFZbImC76xpiuAyIsD/edit?usp=sharing&ouid=108525365897885632984&rtpof=true&sd=true',
    hrefLabel: 'View the sheet ↗',
  },
  {
    slug: 'the-rebrand',
    num: '04',
    title: 'The rebrand — this site',
    badges: [{ tone: 'ink', label: 'Design' }],
    stack: 'Design system · Next.js',
    blurb:
      'This site. A full design system in rose madder, plum, and forest ink.',
    brief:
      'A portfolio should read like its owner thinks. The brief: design a personal brand system from scratch — editorial, square-cornered, serif-led — and implement it as a real site with light and dark themes.',
    shipped:
      'A complete token system (colour, type, spacing, motion) and this six-page site: theme toggle, page transitions, a command palette, and no icons — typographic glyphs do the expressive work.',
    role: 'Design & build',
    status: 'Live',
  },
]

export const workFilters = ['All', 'Finance', 'AI & Code', 'Design']

export type Role = {
  company: string
  role: string
  date: string
  points: string[]
  initials: string
  /** Drop a real logo at this path in /public and it replaces the monogram. */
  logo: string
}

export const experience: Role[] = [
  {
    company: 'American Express',
    role: 'Gen AI & Automations Apprentice',
    date: 'Jun 2025 — Present',
    initials: 'AE',
    logo: '/logos/american-express.png',
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
    initials: 'KC',
    logo: '/logos/kairne-capital.png',
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
    initials: 'RR',
    logo: '/logos/revroad.png',
    points: [
      'Performed secondary research on US EdTech companies; identified 10+ actionable growth opportunities.',
      "Sourced a startup with 75% adherence to RevRoad's investment criteria.",
    ],
  },
  {
    company: 'Tech Mahindra',
    role: 'Finance Department Intern',
    date: 'Jun 2023 — Jul 2023',
    initials: 'TM',
    logo: '/logos/tech-mahindra.png',
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
    items: ['Singing', 'Writing & editing', 'Design — in progress'],
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
    note: 'Essays on Substack; a reading habit that funds them.',
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

export const education = [
  {
    title: 'CFA Program',
    institution: 'CFA Institute',
    date: 'Level I · Mar 2026',
    note: 'Passed Level I (March 2026). Practical Skill Module — Financial Modelling.',
  },
  {
    title: 'BSc Finance',
    institution: 'NMIMS Bangalore',
    date: '2021 — 2024',
    note: 'Strategic Management, Corporate Finance, Financial Reporting, Derivatives & Risk Management, Financial Modelling and Valuations.',
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
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
]
