import { useState } from 'react'
import { Eye, EyeOff, Radio } from 'lucide-react'

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
        className="block text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]"
      >
        {label}
      </label>
      <div className="relative flex items-center gap-3 rounded-[8px] border border-[#34343a] bg-[#0f1011] px-[12px] py-[8px] transition-all duration-200 focus-within:border-[#5e69d1] focus-within:ring-2 focus-within:ring-[#5e69d1]/50">
        <span className="shrink-0 text-[#8a8f98] transition-colors duration-200 group-focus-within:text-[#5e6ad2]">
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
          className="w-full bg-transparent text-[16px] text-[#f7f8f8] outline-none placeholder:text-[#62666d]"
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 text-[#8a8f98] transition-colors hover:text-[#f7f8f8]"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
}

export function Divider({ delay }: { delay: number }) {
  return (
    <div
      className="flex items-center gap-4 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-px flex-1 bg-[#23252a]" />
      <span className="text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">
        OR
      </span>
      <div className="h-px flex-1 bg-[#23252a]" />
    </div>
  )
}

type AuthShellProps = {
  heading: string
  subheading: string
  children: React.ReactNode
}

export function AuthShell({ heading, subheading, children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010102] px-6 py-10 font-sans">
      <section className="relative w-full max-w-[440px] rounded-[16px] border border-[#23252a] bg-[#0f1011] p-8 sm:p-10">
        <div
          className="mx-auto flex w-full flex-col items-center text-center opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: '60ms' }}
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#141516] border border-[#23252a]">
            <Radio className="h-6 w-6 text-[#5e6ad2]" />
          </div>
          <h1 className="font-semibold text-[32px] leading-[1.15] tracking-[-1.0px] text-[#f7f8f8] sm:text-[40px]">
            {heading}
          </h1>
          <p className="mt-4 text-[16px] leading-[1.5] tracking-[-0.05px] text-[#d0d6e0]">
            {subheading}
          </p>
        </div>

        <div className="mt-8">{children}</div>

        <div className="mt-8 grid gap-3 text-[14px] sm:grid-cols-3">
          {['No cash required', 'Credits move forward', 'Teach and learn'].map((item) => (
            <div
              key={item}
              className="rounded-[6px] bg-[#141516] border border-[#23252a] px-3 py-2 text-center font-medium text-[#8a8f98]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export function createStagger(base = 200, step = 80) {
  let i = 0
  return () => base + step * i++
}
