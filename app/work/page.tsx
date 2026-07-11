import type { Metadata } from 'next'
import { Container, SectionLabel } from '@/components/ledger'
import { WorkIndex } from './work-index'

export const metadata: Metadata = {
  title: 'Work — Nandini Parashar',
  description:
    'Selected projects: portfolio analytics, equity valuation, unit economics, and a design system.',
}

export default function WorkPage() {
  return (
    <Container className="pb-24 pt-18">
      <SectionLabel className="mb-4">The index</SectionLabel>
      <h1 className="mb-10 text-display">
        Every project is an <em className="text-rose">entry</em>.
      </h1>
      <WorkIndex />
    </Container>
  )
}
