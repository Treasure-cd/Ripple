import { createFileRoute } from '@tanstack/react-router'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { apiFetch } from '../../../lib/api-client'
import { useAuthStore } from '../../../store/auth-store'
import Profile from '#/components/Profile'

const meQueryOptions = (token: string | null | undefined) =>
  queryOptions({
    queryKey: ['user', 'me'],
    enabled: Boolean(token),
    queryFn: async () => {
      if (!token) { 
        throw new Error('Missing auth token')
      }

      const res = await apiFetch<MeResponse>('/users/me', { token })
      return res.user
    },
  })

export const Route = createFileRoute('/_authenticated/profile')({
  component: PersonalProfile,
})

// Helper to generate a simple initial-based avatar
const generateAvatar = (name: string) => {
  const initial = name.charAt(0).toUpperCase()
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="32" fill="#0f766e"/>
      <text x="50%" y="54%" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff" dy=".3em">${initial}</text>
    </svg>
  `
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function PersonalProfile() {
  const token = useAuthStore((state) => state.accessToken)
  const { data: user } = useQuery(meQueryOptions(token))

  if (!user) {
    return null
  }

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return <Profile user={user} joinDate={joinDate} generateAvatar={generateAvatar} />
}
