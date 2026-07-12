import { createFileRoute, redirect } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'
import {
  Mail,
  Calendar,
  Coins,
  Settings,
  Pencil,
  ArrowRight,
} from 'lucide-react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { apiFetch } from '../../../lib/api-client'
import { useAuthStore } from '../../../store/auth-store'

const meQueryOptions = (token: string) =>
  queryOptions({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const res = await apiFetch<MeResponse>('/users/me', { token })
      return res.user
    },
  })

export const Route = createFileRoute('/_authenticated/profile')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(
      meQueryOptions(useAuthStore.getState().accessToken as string),
    ),
  component: PersonalProfile,
})

// Helper to generate a simple initial-based avatar
const generateAvatar = (name: string) => {
  const initial = name.charAt(0).toUpperCase()
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="32" fill="#0f766e"/>
      <text x="50%" y="54%" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff" dy=".3em">${initial}</text>
    </svg>
  `
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function PersonalProfile() {
  const { auth } = Route.useRouteContext()
  const { data: user } = useSuspenseQuery(meQueryOptions(auth.accessToken))
  console.log(user)
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="min-h-[calc(100vh-5rem)] pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-body">
      {/* ─── Page Header ─── */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-semibold text-foreground tracking-tight">
          My Profile
        </h1>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Settings className="w-4 h-4 text-muted-foreground" />
          Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ─── Left Column (Identity & Contact) ─── */}
        <div className="md:col-span-1 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/10" />

            {/* Avatar */}
            <div className="relative mt-8 mb-4">
              <img
                src={generateAvatar(user.name)}
                alt={user.name}
                className="w-24 h-24 rounded-2xl shadow-md border-2 border-card relative z-10"
              />
              <button
                className="absolute -bottom-2 -right-2 z-20 bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm hover:scale-105 transition-transform"
                aria-label="Edit Avatar"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Name */}
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {user.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </p>
          </div>

          {/* Details Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
              Account Details
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Joined
                </span>
                <span className="font-medium text-foreground">{joinDate}</span>
              </li>

              {user.social_links.github && (
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </span>
                  <a
                    href={user.social_links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-2"
                  >
                    @{user.social_links.github.split('/').pop()}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ─── Right Column (Wallet & Actions) ─── */}
        <div className="md:col-span-2 space-y-6">
          {/* Balance Widget */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-2">
                <Coins className="w-5 h-5 text-primary" />
                Wallet Balance
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-semibold text-foreground">
                  {user.cached_balance}
                </span>
                <span className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
                  Credits
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Use credits to request skills from others. You can earn more by
                sharing your own skills.
              </p>
            </div>

            <button className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_color-mix(in_srgb,var(--primary)_40%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Top up balance
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Onboarding / Next Steps */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Complete your profile
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background transition hover:border-primary/50 cursor-pointer">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Add your bio
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tell the community about yourself and your expertise.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Pencil className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background transition hover:border-primary/50 cursor-pointer">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    List skills to share
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add at least 3 skills you are comfortable teaching.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Pencil className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
