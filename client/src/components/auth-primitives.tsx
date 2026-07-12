import { useState } from 'react'
import { Eye, EyeOff, Radio } from 'lucide-react'

/* ───────────────────────── Field ───────────────────────── */

type FieldProps = {
  id: string
  label: string
  type: string
  value: string
  onChange: (e: any) => void
  placeholder: string
  autoComplete?: string
  icon: React.ReactNode
  delay: number
  showToggle?: boolean
}

export function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  icon,
  delay,
  showToggle,
}: FieldProps) {
  const [visible, setVisible] = useState(false)
  const resolvedType = showToggle ? (visible ? 'text' : 'password') : type

  return (
    <div
      className="group space-y-2 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <label
        htmlFor={id}
        className="block text-[13px] font-medium tracking-wide text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative flex items-center gap-3 rounded-xl border border-border bg-input px-4 py-3.5 transition-all duration-200 focus-within:border-ring focus-within:bg-[color-mix(in_srgb,var(--input)_92%,var(--primary)_8%)] focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ring)_15%,transparent)]">
        <span className="shrink-0 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={resolvedType}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-[color-mix(in_srgb,var(--muted-foreground)_50%,transparent)]"
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

/* ──────────────────────── Divider ──────────────────────── */

export function Divider({ delay }: { delay: number }) {
  return (
    <div
      className="flex items-center gap-4 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium text-muted-foreground">
        or
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

/* ─────────────────────── AuthShell ─────────────────────── */

type AuthShellProps = {
  heading: string
  subheading: string
  children: React.ReactNode
}

export function AuthShell({ heading, subheading, children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] font-body tracking-tight items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-primary/4 blur-[100px]" />
      </div>

      {/* Auth card */}
      <div className="relative w-full max-w-104">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl sm:p-10">
          {/* Brand */}
          <div
            className="mb-8 flex flex-col items-center text-center opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
            style={{ animationDelay: '60ms' }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary/10 shadow-sm">
              <Radio className="h-5.5 w-5.5 text-primary" />
            </div>
            <h1 className="font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
              {heading}
            </h1>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {subheading}
            </p>
          </div>

          {children}
        </div>
      </div>
    </main>
  )
}

/* ──────────────────── Stagger helper ──────────────────── */

export function createStagger(base = 200, step = 80) {
  let i = 0
  return () => base + step * i++
}
