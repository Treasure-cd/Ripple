import { Section, SectionCard, SectionEyebrow, SectionHeading } from './landing-ui'

export function HowItWorksSection() {
  const steps = [
    {
      title: 'Offer what you know',
      description: 'List a skill you can teach in a clear sentence. If you can explain it to a friend, you can offer it on Ripple.',
    },
    {
      title: 'Earn a credit',
      description: 'When your swap partner marks the session complete, the credit lands in your account.',
    },
    {
      title: 'Spend it later',
      description: 'Use that credit with another person entirely. The loop keeps moving until you have learned what you needed.',
    },
  ]

  return (
    <Section id="how-it-works">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <SectionCard key={step.title} className="flex gap-6 items-start">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#18191a] border border-[#3e3e44] text-[13px] font-mono text-[#f7f8f8]">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-[22px] font-medium leading-[1.25] tracking-[-0.4px] text-[#f7f8f8] mb-2">
                  {step.title}
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#d0d6e0]">
                  {step.description}
                </p>
              </div>
            </SectionCard>
          ))}
        </div>
        <div className="space-y-6 lg:pl-12">
          <SectionEyebrow>How it works</SectionEyebrow>
          <SectionHeading
            title="A credit keeps moving."
            description="The exchange is clear. One hour taught becomes one hour learned somewhere else."
          />
        </div>
      </div>
    </Section>
  )
}
