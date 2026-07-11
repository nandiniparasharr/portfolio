import { Container, LLink, SectionLabel } from '@/components/ledger'

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <SectionLabel className="mb-4 justify-center">Error — 404</SectionLabel>
      <h1 className="text-display">
        No such <em className="text-rose">entry</em>.
      </h1>
      <p className="mx-auto mt-5 max-w-sm text-muted-foreground">
        This page isn&apos;t in the ledger. The index will get you back on
        balance.
      </p>
      <div className="mt-9 flex justify-center">
        <LLink href="/" variant="secondary">
          Back to the ledger <span className="np-arrow">→</span>
        </LLink>
      </div>
    </Container>
  )
}
