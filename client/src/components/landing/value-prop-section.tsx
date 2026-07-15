import { Section, SectionCard, SectionEyebrow, SectionHeading } from './landing-ui'

export function ValuePropSection() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div className="space-y-6">
          <SectionEyebrow>The core loop</SectionEyebrow>
          <SectionHeading
            title="Teach one thing. Learn anything."
            description="Ripple isn't a marketplace dressed up in softer words. It's a network where helping someone now pays forward later."
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <SectionCard>
            <div className="text-[28px] font-semibold tracking-[-0.6px] text-[#f7f8f8] mb-2">No cash needed</div>
            <p className="text-[16px] leading-[1.5] text-[#d0d6e0]">
              Skills are the currency. You don't have to link a bank account or pay hidden fees to learn something new.
            </p>
          </SectionCard>
          <SectionCard>
            <div className="text-[28px] font-semibold tracking-[-0.6px] text-[#f7f8f8] mb-2">Everyone has a skill</div>
            <p className="text-[16px] leading-[1.5] text-[#d0d6e0]">
              You don't need a degree to teach. Spreadsheet wizardry counts as much as coding or speaking Spanish.
            </p>
          </SectionCard>
          <SectionCard className="sm:col-span-2">
            <div className="text-[28px] font-semibold tracking-[-0.6px] text-[#f7f8f8] mb-2">The ripple effect</div>
            <p className="text-[16px] leading-[1.5] text-[#d0d6e0]">
              You don't have to trade with the person who helped you. You help someone, earn a credit, and that credit ripples out to whoever you spend it with next.
            </p>
          </SectionCard>
        </div>
      </div>
    </Section>
  )
}
