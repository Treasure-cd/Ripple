import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { AuthShell, Divider, Field, createStagger } from './auth-primitives'
import { useSignUp } from '../../hooks/useSignUp'
import type { SignUpPayload } from '../../types/signupPayload'

export default function SignUp() {
  const nextDelay = createStagger()
  const { mutate, isPending, error } = useSignUp()
  const [signUpPayload, setSignUpPayload] = useState<SignUpPayload>({
    name: '',
    email: '',
    password: '',
  })
  return (
    <AuthShell
      heading="Create your account"
      subheading="Set up your profile and start swapping skills with people around you."
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <Field
          id="username"
          label="Full name"
          type="text"
          value={signUpPayload.name}
          onChange={(e) =>
            setSignUpPayload((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Ada Lovelace"
          autoComplete="name"
          icon={<UserRound className="h-4.5 w-4.5" />}
          delay={nextDelay()}
        />

        <Field
          id="email"
          label="Email address"
          type="email"
          value={signUpPayload.email}
          onChange={(e) =>
            setSignUpPayload((prev) => ({ ...prev, email: e.target.value }))
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
          value={signUpPayload.password}
          onChange={(e) =>
            setSignUpPayload((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Create a strong password"
          autoComplete="new-password"
          icon={<LockKeyhole className="h-4.5 w-4.5" />}
          delay={nextDelay()}
          showToggle
        />

        {/* Submit */}
        <div
          className="pt-2 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          <button
            type="submit"
            disabled={isPending}
            onClick={() => mutate(signUpPayload)}
            className="group/btn relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_color-mix(in_srgb,var(--primary)_40%,transparent)] active:translate-y-0 active:shadow-md"
          >
            {isPending ? 'Creating account...' : 'Create account'}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        {error && <p>{error.message}</p>}
        {/* Divider + Switch */}
        <Divider delay={nextDelay()} />

        <p
          className="text-center text-[13px] text-muted-foreground opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          Already have an account?{' '}
          <Link
            to="/signin"
            className="font-semibold text-foreground transition-colors hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </form>

      {/* Legal footnote */}
      <p
        className="mt-6 text-center text-xs leading-relaxed text-[color-mix(in_srgb,var(--muted-foreground)_60%,transparent)] opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
        style={{ animationDelay: `${nextDelay()}ms` }}
      >
        By continuing you agree to Ripple's{' '}
        <button
          type="button"
          className="underline decoration-border decoration-[1.5px] underline-offset-[3px] transition-colors hover:text-foreground"
        >
          Terms
        </button>{' '}
        and{' '}
        <button
          type="button"
          className="underline decoration-border decoration-[1.5px] underline-offset-[3px] transition-colors hover:text-foreground"
        >
          Privacy Policy
        </button>
      </p>
    </AuthShell>
  )
}
