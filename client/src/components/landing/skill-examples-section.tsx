import { Brain, GraduationCap, Languages, LineChart, MessageSquare, PenTool } from 'lucide-react'
import { Section, SectionCard, SectionEyebrow, SectionHeading } from './landing-ui'

const skills = [
  { icon: PenTool, name: 'Design feedback', detail: 'Brand polish and UI reviews' },
  { icon: Languages, name: 'Language practice', detail: 'Conversation and vocabulary' },
  { icon: GraduationCap, name: 'Tutoring', detail: 'Homework support and study plans' },
  { icon: LineChart, name: 'Spreadsheet work', detail: 'Reports, formulas, templates' },
  { icon: Brain, name: 'Interview prep', detail: 'Practice and confidence' },
  { icon: MessageSquare, name: 'Writing help', detail: 'Clarity, tone, structure' },
]

export function SkillExamplesSection() {
  return (
    <Section>
      <div className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
          <div className="space-y-6 max-w-2xl">
            <SectionEyebrow>What can you teach?</SectionEyebrow>
            <SectionHeading
              title="If you know it, it has value."
              description="A good listing doesn't need to sound like a sales page. It just needs to say what you can teach and what kind of help you want next."
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <SectionCard key={skill.name} className="flex flex-col">
                <div className="mb-4 text-[#5e6ad2]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[22px] font-medium leading-[1.25] tracking-[-0.4px] text-[#f7f8f8] mb-2">
                  {skill.name}
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#8a8f98]">
                  {skill.detail}
                </p>
              </SectionCard>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
