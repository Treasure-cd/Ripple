import type { User } from '../types/user'

export async function signup(payload: {
  email: string
  password: string
  name: string
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? 'Account creation failed')
  }

  return res.json() as Promise<{ accessToken: string; user: User }>
}

export async function signin(payload: {
  email: string
  password: string
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload)
  })


  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? 'Account creation failed')
  }

  return res.json() as Promise<{ accessToken: string; user: User }>
}
