import { Section, SectionEyebrow, SectionHeading } from './landing-ui'

const stories = [
  {
    quote:
      'I taught spreadsheet shortcuts for an hour and used the credit to get help polishing my portfolio.',
    name: 'Amina',
    role: 'Product designer',
  },
  {
    quote:
      'Ripple made it easy to turn my guitar basics into interview practice later.',
    name: 'Tunde',
    role: 'Self-taught developer',
  },
  {
    quote:
      'The best part is helping someone now and learning from someone else next.',
    name: 'Maya',
    role: 'Community tutor',
  },
]

export function StoriesSection() {
  return (
    <Section>
      <div className="space-y-12">
        <div className="max-w-2xl space-y-6">
          <SectionEyebrow>Swap stories</SectionEyebrow>
          <SectionHeading
            title="People use Ripple in both directions."
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.name} className="rounded-[12px] bg-[#141516] p-[32px] border border-[#23252a]">
              <blockquote className="text-[18px] leading-[1.5] tracking-[-0.1px] text-[#f7f8f8] mb-8">
                "{story.quote}"
              </blockquote>
              <div className="flex items-center gap-4 border-t border-[#23252a] pt-6">
                <div className="h-10 w-10 rounded-full bg-[#18191a] border border-[#3e3e44]" />
                <div>
                  <div className="text-[14px] font-medium text-[#f7f8f8]">{story.name}</div>
                  <div className="text-[12px] text-[#8a8f98]">{story.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
