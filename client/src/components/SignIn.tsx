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
    password: '',
  })

  return (
    <AuthShell
      heading="Welcome back"
      subheading="Sign in to pick up where you left off and continue your swaps."
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <Field
          id="email"
          label="Email address"
          type="email"
          value={signInPayload.email}
          onChange={(e) =>
            setSignInPayload((prev) => ({ ...prev, email: e.target.value }))
          }
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
          onChange={(e) =>
            setSignInPayload((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="••••••••"
          autoComplete="current-password"
          icon={<LockKeyhole className="h-4.5 w-4.5" />}
          delay={nextDelay()}
          showToggle
        />

        <div
          className="flex items-center justify-between pt-1 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#8a8f98] select-none">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded-[4px] border border-[#34343a] bg-[#0f1011] accent-[#5e6ad2]"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-[14px] font-medium text-[#f7f8f8] transition-colors hover:text-[#5e6ad2]"
          >
            Forgot password?
          </button>
        </div>

        <div
          className="pt-2 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          <button
            disabled={isPending}
            onClick={() => mutate(signInPayload)}
            type="submit"
            className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#5e6ad2] px-[14px] py-[10px] text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#828fff] focus:ring-2 focus:ring-[#5e69d1]/50 outline-none disabled:opacity-50"
          >
            {isPending ? 'Signing in...' : 'Sign in'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>

        {error && <p className="text-[14px] text-[#27a644]">{error.message}</p>}

        <Divider delay={nextDelay()} />

        <p
          className="text-center text-[14px] text-[#8a8f98] opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          New to Ripple?{' '}
          <Link
            to="/signup"
            className="font-medium text-[#f7f8f8] transition-colors hover:text-[#5e6ad2]"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
