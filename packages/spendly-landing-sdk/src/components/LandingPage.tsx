import { LandingNavbar } from './LandingNavbar'
import { HeroSection } from './HeroSection'
import { StatsBand } from './StatsBand'
import { FeaturesSection } from './FeaturesSection'
import { CtaSection } from './CtaSection'
import { LandingFooter } from './LandingFooter'

interface LandingPageProps {
  onSeeHowItWorks?: () => void
}

export function LandingPage({ onSeeHowItWorks }: LandingPageProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--page-bg)' }}>
      <LandingNavbar />
      <main>
        <HeroSection onSeeHowItWorks={onSeeHowItWorks} />
        <StatsBand />
        <FeaturesSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
