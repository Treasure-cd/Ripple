import { ActionButton, Section } from './landing-ui'

export function ClosingCtaSection() {
  return (
    <Section className="!pb-[96px]">
      <div className="rounded-[12px] border border-[#23252a] bg-[#0f1011] p-[48px] text-center flex flex-col items-center">
        <h2 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.6px] text-[#f7f8f8] mb-8 max-w-xl">
          What you know is worth something. Spend it.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton to="/signup" variant="primary">
            Start swapping
          </ActionButton>
        </div>
      </div>
    </Section>
  )
}
