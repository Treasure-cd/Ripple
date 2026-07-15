// export interface SocialLinks {
//   github?: string
//   twitter?: string
//   linkedin?: string
// }

export interface UserProfile {
  id: number
  name: string
  email: string
  cached_balance: number
  social_links: string[]
  created_at: string
}

export interface AuthResponse {
  user: UserProfile
  token: string
}

export interface MeResponse {
  user: UserProfile
}

export interface UpdateMePayload{
  name: string;
  social_links: string[]
}
