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
  Clock
} from 'lucide-react'
import { mockUsers } from '../../../data/mock'

export const Route = createFileRoute('/_authenticated/user/$id')({
  component: UserProfile,
})

function UserProfile() {
  const { id } = Route.useParams()
  const user = mockUsers.find((u) => u.id === id)

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center text-[var(--muted-foreground)]">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-foreground mb-2">User not found</h2>
          <p>The profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-body">
      {/* ─── Header Section ─── */}
      <header className="relative flex flex-col md:flex-row gap-8 items-start md:items-center pb-12 border-b border-border">
        {/* Avatar */}
        <div className="shrink-0 relative">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-32 h-32 rounded-3xl object-cover shadow-xl border border-border/50"
          />
          <div className="absolute -bottom-3 -right-3 bg-card border border-border rounded-full p-2 shadow-sm">
            <Medal className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground tracking-tight">
                {user.name}
              </h1>
              <span className="text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {user.contactDetails.handle}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                {user.rating} ({user.reputation})
              </div>
            </div>
          </div>

          <p className="text-lg text-foreground/90 max-w-2xl leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full md:w-auto gap-3 shrink-0">
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-card border border-border px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_color-mix(in_srgb,var(--primary)_40%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowRightLeft className="w-4 h-4" />
            Request Swap
          </button>
        </div>
      </header>

      {/* ─── Body Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">

        {/* Left Column (Skills & Contact) */}
        <div className="lg:col-span-1 space-y-10">

          {/* Teaches */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Skills to share
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Learns */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              Wants to learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground border border-border"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Details Card */}
          <section className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
            <div className="space-y-4">
               <h3 className="text-sm font-semibold text-foreground">Availability</h3>
               <div className="flex items-start gap-3 text-sm text-muted-foreground">
                 <Calendar className="w-5 h-5 shrink-0 text-foreground/40 mt-0.5" />
                 <span>{user.availability}</span>
               </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-4">
               <h3 className="text-sm font-semibold text-foreground">Contact Info</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-center gap-3">
                   <Mail className="w-4 h-4 shrink-0" />
                   <a href={`mailto:${user.contactDetails.email}`} className="hover:text-primary transition-colors">
                     {user.contactDetails.email}
                   </a>
                 </li>
                 <li className="flex items-center gap-3">
                   <Phone className="w-4 h-4 shrink-0" />
                   {user.contactDetails.phone}
                 </li>
               </ul>
            </div>
          </section>

        </div>

        {/* Right Column (Stats & History) */}
        <div className="lg:col-span-2 space-y-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
             <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 shadow-sm">
               <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                 <Coins className="w-4 h-4" />
                 Available Credits
               </div>
               <div className="text-3xl font-heading font-semibold text-foreground">
                 {user.credits}
               </div>
             </div>

             <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 shadow-sm">
               <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                 <ArrowRightLeft className="w-4 h-4" />
                 Total Swaps
               </div>
               <div className="text-3xl font-heading font-semibold text-foreground">
                 {user.previousExchanges.length}
               </div>
             </div>

             <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 shadow-sm sm:col-span-1 col-span-2">
               <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                 <Clock className="w-4 h-4" />
                 Member Since
               </div>
               <div className="text-3xl font-heading font-semibold text-foreground">
                 2026
               </div>
             </div>
          </div>

          {/* Recent Exchanges */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Recent Exchanges
              </h3>
            </div>

            {user.previousExchanges.length > 0 ? (
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <ul className="divide-y divide-border">
                  {user.previousExchanges.map((exchange, idx) => (
                    <li key={idx} className="p-6 transition hover:bg-muted/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">
                            Swapped with <span className="text-primary">{exchange.with}</span>
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Taught: {exchange.gave}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              Learned: {exchange.received}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground shrink-0">
                          {new Date(exchange.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                <p>No recent exchanges to show.</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  )
}
