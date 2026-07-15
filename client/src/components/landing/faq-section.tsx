import { ChevronDown } from 'lucide-react'
import { Section, SectionEyebrow, SectionHeading } from './landing-ui'

const questions = [
  {
    q: 'Do I have to swap with the same person later?',
    a: 'No. That is the ripple effect. You can teach one person and spend the credit with someone else entirely.',
  },
  {
    q: 'What if my skill is niche?',
    a: 'That still counts. Narrow skills can be extremely useful when they solve a real problem for another person.',
  },
  {
    q: 'What exactly is a credit?',
    a: 'It is the unit Ripple uses to keep swaps clear. You earn it by teaching, then spend it when you need help learning.',
  },
  {
    q: 'Can I be both a teacher and a learner?',
    a: 'Yes. Most people move between both roles depending on the week.',
  },
]

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionHeading
            title="A few things people usually ask."
            description="The answer is usually simple. If you can teach it, you can probably swap it."
          />
        </div>
        <div className="space-y-4">
          {questions.map((item) => (
            <details
              key={item.q}
              className="group rounded-[12px] border border-[#23252a] bg-[#0f1011] px-[24px] py-[20px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-[#f7f8f8] marker:hidden">
                <span>{item.q}</span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 text-[#8a8f98]" />
              </summary>
              <p className="mt-4 text-[16px] leading-[1.5] text-[#8a8f98]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
