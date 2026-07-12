import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { AuthShell, Divider, Field, createStagger } from './auth-primitives'
import { useSignIn } from '../../hooks/useSignIn'
import type { SignInPayload } from '../../types/signinPayload'

export default function SignIn() {
  const nextDelay = createStagger()
  const { mutate, isPending, error } = useSignIn()
  const [signInPayload, setSignInPayload] = useState<SignInPayload>({
    email: '',
    password: ''
  })

  return (
    <AuthShell
      heading="Welcome back"
      subheading="Sign in to pick up where you left off and continue your swaps."
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <Field
          id="email"
          label="Email address"
          type="email"
          value={signInPayload.email}
          onChange={(e) => setSignInPayload((prev) => ({...prev, email: e.target.value}))}
          placeholder="ada@example.com"
          autoComplete="email"
          icon={<Mail className="h-4.5 w-4.5" />}
          delay={nextDelay()}
        />

        <Field
          id="password"
          label="Password"
          type="password"
          value={signInPayload.password}
          onChange={(e) => setSignInPayload((prev) => ({...prev, password: e.target.value}))}
          placeholder="••••••••"
          autoComplete="current-password"
          icon={<LockKeyhole className="h-4.5 w-4.5" />}
          delay={nextDelay()}
          showToggle
        />

        {/* Remember / Forgot */}
        <div
          className="flex items-center justify-between pt-1 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-muted-foreground select-none">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 cursor-pointer rounded border-border accent-primary"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <div
          className="pt-2 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          <button
            disabled={isPending}
            onClick={() => mutate(signInPayload)}
            type="submit"
            className="group/btn relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_color-mix(in_srgb,var(--primary)_40%,transparent)] active:translate-y-0 active:shadow-md"
          >
            {isPending ? 'Signing in': 'Sign in'}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        {/* Divider + Switch */}
        <Divider delay={nextDelay()} />

        <p
          className="text-center text-[13px] text-muted-foreground opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          New to Ripple?{' '}
          <Link
            to="/signup"
            className="font-semibold text-foreground transition-colors hover:text-primary"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
