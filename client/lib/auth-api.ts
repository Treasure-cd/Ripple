import type { UserProfile } from '../types/user'

type AuthResult = {
  token?: string | null
  user: Pick<UserProfile, 'id' | 'name' | 'email'>
}

async function authRequest(path: string, payload: object): Promise<AuthResult> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      body.message ?? body.error?.message ?? `Authentication failed: ${res.status}`,
    )
  }

  return res.json() as Promise<AuthResult>
}

export async function signup(payload: {
  email: string
  password: string
  name: string
}) {
  return authRequest('/auth/sign-up/email', payload)
}

export async function signin(payload: {
  email: string
  password: string
}) {
  return authRequest('/auth/sign-in/email', payload)
}
