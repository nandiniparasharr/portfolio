import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Education />
        <Experience />
        <Skills />
        <Certifications />
        <div className="mx-auto max-w-[1500px] px-10">
          <hr className="border-t border-gold/30" />
        </div>
        <Contact />
      </main>
      <footer className="border-t border-border py-8">
        <p className="text-center text-xs text-muted-foreground">
          &copy; 2026 Nandini Parashar. Built with intention.
        </p>
      </footer>
    </>
  )
}
