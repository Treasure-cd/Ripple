import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'

import List from '#/components/List'
import Sidebar from '#/components/Sidebar'
import { Section, SectionHeading, SectionEyebrow } from '#/components/landing/landing-ui'

export const Route = createFileRoute('/_authenticated/discover')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selected, setSelected] = useState<string[]>([])

  const onSelect = (filter: string): void => {
    setSelected((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    )
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[linear-gradient(180deg,#f7f8fc_0%,#f4f6fb_48%,#ffffff_100%)] py-8 dark:bg-[linear-gradient(180deg,#0b0d10_0%,#0d1014_48%,#10141a_100%)]">
      <Section className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <SectionEyebrow>
              <Search className="h-3.5 w-3.5" />
              Discover swaps
            </SectionEyebrow>
            <SectionHeading
              title="Find people with the skills you need."
              description="Filter by what you want to learn, then reach out when a swap looks like a fit."
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            No cash required
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar selected={selected} onSelect={onSelect} />
          <List selected={selected} />
        </div>
      </Section>
    </main>
  )
}
