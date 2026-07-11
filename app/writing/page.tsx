import type { Metadata } from 'next'
import {
  Container,
  IndexNumeral,
  LLink,
  LedgerRow,
  SectionLabel,
} from '@/components/ledger'
import { Reveal } from '@/components/reveal'
import { site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Writing — Nandini Parashar',
  description:
    'Essays on markets, learning curves, and compounding — in money and in life. On Substack.',
}

export default function WritingPage() {
  return (
    <Container className="relative pb-24 pt-18">
      <IndexNumeral
        value="03"
        tone="tint"
        className="absolute right-7 top-10 hidden text-[190px] md:block"
      />
      <div className="relative">
        <SectionLabel className="mb-4">Writing</SectionLabel>
        <h1 className="max-w-xl text-display">
          Notes from the <em className="text-rose">margins</em>.
        </h1>
        <p className="mt-6 max-w-md text-lead text-muted-foreground">
          Essays on markets, learning curves, and compounding — in money and
          in life. The archive lives on Substack.
        </p>
        <div className="mt-9">
          <LLink href={site.substack} variant="primary">
            Read the archive ↗
          </LLink>
        </div>
      </div>

      <Reveal className="mt-20 max-w-lg">
        <div className="np-rule-draw h-0.5 bg-border-strong" />
        <div className="border border-t-0 border-border bg-card p-6">
          <SectionLabel tone="muted" className="mb-3">
            The masthead
          </SectionLabel>
          <LedgerRow
            label="Newsletter"
            value={`${site.substackName} ↗`}
            href={site.substack}
          />
          <LedgerRow
            label="Beat"
            value="Markets · learning curves · compounding"
          />
          <LedgerRow label="Cadence" value="When it's worth your time" last />
        </div>
      </Reveal>
    </Container>
  )
}
