import type { Metadata } from 'next'
import { Container, LedgerRow, SectionLabel } from '@/components/ledger'
import { ContactForm } from '@/components/contact-form'
import { CopyEmail } from '@/components/copy-email'
import { site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact — Nandini Parashar',
  description:
    'Roles, collaborations, or a good book recommendation — say the word.',
}

export default function ContactPage() {
  return (
    <Container className="pb-24 pt-18">
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionLabel className="mb-4">Contact</SectionLabel>
          <h1 className="text-display">
            Say the <em className="text-rose">word</em>.
          </h1>
          <p className="mt-5 max-w-sm text-lead text-muted-foreground">
            Roles, collaborations, or a good book recommendation — I read
            everything.
          </p>
          <div className="mt-10 max-w-sm">
            <LedgerRow
              label="Email"
              value={
                <span className="inline-flex items-baseline gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-foreground no-underline hover:text-rose"
                  >
                    {site.email}
                  </a>
                  <CopyEmail />
                </span>
              }
            />
            <LedgerRow label="LinkedIn" value="in/nandiniparashar ↗" href={site.linkedin} />
            <LedgerRow
              label="Substack"
              value={`${site.substackName} ↗`}
              href={site.substack}
              last
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </Container>
  )
}
