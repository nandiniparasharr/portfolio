import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Shell } from '@/components/shell'

/* Weight lists are deliberately absent on the two variable families: naming
   weights makes next/font fetch a static file per weight (six for the serif
   alone), while the variable axis covers all of them in one. Parisienne is
   gone entirely — the calligraphy captions it was added for were removed. */
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
})
const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Nandini Parashar — Curiosity, compounding daily',
  description:
    'Finance professional building across markets, machines, and the written word. Investment research, valuation, GenAI-assisted workflows, and essays — from Delhi-NCR.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

const themeInit = `try{const t=localStorage.getItem('theme');const d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light')}catch(e){}try{if('scrollRestoration' in history){history.scrollRestoration='manual'}}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${archivo.variable} ${plexMono.variable} bg-background`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
