import { TopNav } from './top-nav'
import { HeroSection } from './hero-section'
import { ValuePropSection } from './value-prop-section'
import { HowItWorksSection } from './how-it-works-section'
import { SkillExamplesSection } from './skill-examples-section'
import { StoriesSection } from './stories-section'
import { FaqSection } from './faq-section'
import { ClosingCtaSection } from './closing-cta-section'
import { Footer } from './footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#010102] text-[#f7f8f8] font-sans selection:bg-[#5e6ad2]/20 selection:text-[#ffffff]">
      <TopNav />
      <main>
        <HeroSection />
        <ValuePropSection />
        <HowItWorksSection />
        <SkillExamplesSection />
        <StoriesSection />
        <FaqSection />
        <ClosingCtaSection />
      </main>
      <Footer />
    </div>
  )
}
