import { Link } from '@tanstack/react-router'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Why Ripple', href: '/#why-ripple' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', to: '/signin' },
      { label: 'Start swapping', to: '/signup' },
      { label: 'Discover', to: '/discover' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/80 py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-sm font-black text-background">
              R
            </span>
            <div>
              <p className="font-heading text-lg font-[900] tracking-[-0.05em] text-foreground">
                Ripple
              </p>
              <p className="text-sm text-muted-foreground">
                Teach what you know. Learn what you do not.
              </p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Ripple is a skill-swapping platform built around reciprocity. Credits move
            forward, so the person who helped you does not have to be the same person who
            helps you next.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {group.title}
              </p>
              <div className="flex flex-col gap-3">
                {group.links.map((link) =>
                  'to' in link ? (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
