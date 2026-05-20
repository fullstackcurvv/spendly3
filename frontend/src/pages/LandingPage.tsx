import { LandingNavbar } from './landing/LandingNavbar'
import { HeroSection } from './landing/HeroSection'
import { StatsBand } from './landing/StatsBand'
import { FeaturesSection } from './landing/FeaturesSection'
import { CtaSection } from './landing/CtaSection'
import { LandingFooter } from './landing/LandingFooter'

export function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--page-bg)' }}>
      <LandingNavbar />
      <main>
        <HeroSection />
        <StatsBand />
        <FeaturesSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
