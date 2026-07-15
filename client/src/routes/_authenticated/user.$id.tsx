import { createFileRoute } from '@tanstack/react-router'
import {
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRightLeft,
  Star,
  Coins,
  Medal,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
} from 'lucide-react'

import { mockUsers } from '../../../data/mock'
import { Section, SectionCard, SectionEyebrow, SectionHeading } from '#/components/landing/landing-ui'

export const Route = createFileRoute('/_authenticated/user/$id')({
  component: UserProfile,
})

function UserProfile() {
  const { id } = Route.useParams()
  const user = mockUsers.find((u) => u.id === id)

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[linear-gradient(180deg,#f7f8fc_0%,#f4f6fb_48%,#ffffff_100%)] px-4 dark:bg-[linear-gradient(180deg,#0b0d10_0%,#0d1014_48%,#10141a_100%)]">
        <Section>
          <SectionCard className="mx-auto max-w-md text-center">
            <SectionEyebrow className="mx-auto">
              <Calendar className="h-3.5 w-3.5" />
              Profile not found
            </SectionEyebrow>
            <SectionHeading
              className="mt-4"
              title="User not found"
              description="The profile you're looking for doesn't exist or has been removed."
            />
          </SectionCard>
        </Section>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[linear-gradient(180deg,#f7f8fc_0%,#f4f6fb_48%,#ffffff_100%)] py-8 dark:bg-[linear-gradient(180deg,#0b0d10_0%,#0d1014_48%,#10141a_100%)]">
      <Section className="space-y-8">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <SectionCard className="overflow-hidden p-0">
            <div className="h-24 bg-[linear-gradient(90deg,rgba(93,111,255,0.14),rgba(93,111,255,0.04))]" />
            <div className="px-6 pb-6 pt-0 sm:px-8">
              <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <div className="relative">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-24 w-24 rounded-2xl border-4 border-card object-cover shadow-[0_16px_40px_rgba(15,17,20,0.14)]"
                    />
                    <div className="absolute -bottom-2 -right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background shadow-lg">
                      <Medal className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="pb-1">
                    <h1 className="font-heading text-3xl font-[900] tracking-[-0.05em] text-foreground sm:text-4xl">
                      {user.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 text-foreground">
                        {user.contactDetails.handle}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {user.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-primary" />
                        {user.rating} ({user.reputation})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[color-mix(in_srgb,var(--primary)_24%,var(--border))] hover:bg-accent/40">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(93,111,255,0.22)] transition hover:bg-[color-mix(in_srgb,var(--primary)_84%,black)]">
                    <ArrowRightLeft className="h-4 w-4" />
                    Request swap
                  </button>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
                {user.bio}
              </p>
            </div>
          </SectionCard>

          <SectionCard className="space-y-4">
            <SectionEyebrow>Swap details</SectionEyebrow>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Available credits
                </p>
                <p className="mt-2 text-3xl font-heading font-[900] tracking-[-0.06em] text-foreground">
                  {user.credits}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Total swaps
                </p>
                <p className="mt-2 text-3xl font-heading font-[900] tracking-[-0.06em] text-foreground">
                  {user.previousExchanges.length}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary p-4 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Member since
                </p>
                <p className="mt-2 inline-flex items-center gap-2 font-semibold text-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  2026
                </p>
              </div>
            </div>
          </SectionCard>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionCard>
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Skills to share
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                <Star className="h-4 w-4 text-primary" />
                Wants to learn
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Availability
                </h3>
                <div className="mt-3 flex items-start gap-3 text-sm text-muted-foreground">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{user.availability}</span>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Contact info
                </h3>
                <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0" />
                    <a
                      href={`mailto:${user.contactDetails.email}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {user.contactDetails.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0" />
                    {user.contactDetails.phone}
                  </li>
                </ul>
              </div>
            </SectionCard>
          </div>

          <SectionCard className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-[900] tracking-[-0.05em] text-foreground">
                Recent exchanges
              </h3>
            </div>

            {user.previousExchanges.length > 0 ? (
              <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {user.previousExchanges.map((exchange, idx) => (
                  <div key={idx} className="p-5 transition hover:bg-accent/40">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          Swapped with{' '}
                          <span className="text-primary">{exchange.with}</span>
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Taught: {exchange.gave}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            Learned: {exchange.received}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(exchange.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No recent exchanges to show.
              </div>
            )}
          </SectionCard>
        </div>
      </Section>
    </main>
  )
}
