import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Instrument_Serif, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Shell } from '@/components/shell'

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
      className={`${instrument.variable} ${archivo.variable} ${plexMono.variable} bg-background`}
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
