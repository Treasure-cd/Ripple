import { Link } from '@tanstack/react-router'
import { ArrowRight, Menu } from 'lucide-react'

import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Why Ripple', href: '/#why-ripple' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-sm font-black text-background shadow-[0_10px_24px_rgba(15,17,20,0.16)]">
            R
          </span>
          <div className="hidden sm:block">
            <p className="font-heading text-lg font-[900] tracking-[-0.05em] text-foreground">
              Ripple
            </p>
            <p className="text-xs text-muted-foreground">
              Teach one thing. Learn anything.
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            to="/signin"
            className="hidden rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent/60 hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_12px_28px_rgba(93,111,255,0.22)] transition hover:bg-[color-mix(in_srgb,var(--primary)_86%,black)]"
          >
            Start swapping
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
