// types/user.ts
interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
}

interface UserProfile {
  id: number
  name: string
  email: string
  cached_balance: number
  social_links: SocialLinks
  created_at: string
}

interface AuthResponse {
  user: UserProfile
  token: string
}

interface MeResponse {
  user: UserProfile
}
