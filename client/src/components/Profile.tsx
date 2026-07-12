import { Link } from '@tanstack/react-router'
import { UserRound } from 'lucide-react'

export default function Profile() {
  return (
    <Link
      to="/profile"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:text-primary hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="My Profile"
    >
      <UserRound className="h-5 w-5" />
    </Link>
  )
}
