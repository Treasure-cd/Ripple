import { Link } from '@tanstack/react-router'
import { Bolt, ArrowRight } from 'lucide-react'

import { mockUsers } from '../../data/mock'
import type { User } from '../../types/user'

export default function List({ selected }: { selected: string[] }) {
  let filteredUsers = mockUsers.filter((user) =>
    user.skills.some((skill) => selected.includes(skill)),
  )

  if (filteredUsers.length <= 0) {
    filteredUsers = mockUsers
  }

  return (
    <div className="grid gap-4 lg:flex-1">
      {filteredUsers.map((user: User) => (
        <div
          key={user.id}
          className="rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_rgba(15,17,20,0.06)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-[900] tracking-[-0.05em] text-foreground">
                {user.name}
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm font-semibold text-foreground">
                <Bolt className="h-4 w-4 text-primary" />
                {user.credits} credits
              </div>
            </div>
            <Link
              to="/user/$id"
              params={{ id: user.id }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-[color-mix(in_srgb,var(--primary)_24%,var(--border))] hover:bg-accent/40"
            >
              View profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {user.skills.map((skill: string) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Interested in:</span>
            {user.interests.map((int: string) => (
              <span key={int}>{int}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
