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
        className="space-y-5"
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

        <div
          className="pt-2 opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          <button
            type="submit"
            disabled={isPending}
            onClick={() => mutate(signUpPayload)}
            className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#5e6ad2] px-[14px] py-[10px] text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#828fff] focus:ring-2 focus:ring-[#5e69d1]/50 outline-none disabled:opacity-50"
          >
            {isPending ? 'Creating account...' : 'Create account'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>

        {error && <p className="text-[14px] text-[#27a644]">{error.message}</p>}
        
        <Divider delay={nextDelay()} />

        <p
          className="text-center text-[14px] text-[#8a8f98] opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
          style={{ animationDelay: `${nextDelay()}ms` }}
        >
          Already have an account?{' '}
          <Link
            to="/signin"
            className="font-medium text-[#f7f8f8] transition-colors hover:text-[#5e6ad2]"
          >
            Sign in
          </Link>
        </p>
      </form>

      <p
        className="mt-8 text-center text-[12px] text-[#8a8f98] opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards]"
        style={{ animationDelay: `${nextDelay()}ms` }}
      >
        By continuing you agree to Ripple's{' '}
        <button
          type="button"
          className="underline decoration-[#34343a] underline-offset-[3px] transition-colors hover:text-[#f7f8f8]"
        >
          Terms
        </button>{' '}
        and{' '}
        <button
          type="button"
          className="underline decoration-[#34343a] underline-offset-[3px] transition-colors hover:text-[#f7f8f8]"
        >
          Privacy Policy
        </button>
      </p>
    </AuthShell>
  )
}
