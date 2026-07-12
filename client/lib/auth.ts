import { useAuthStore } from '../store/auth-store'

export interface AuthContext {
  accessToken: string;
  isAuthenticated: boolean;
}

export function getAuthContext(): AuthContext {
  const token = useAuthStore.getState().accessToken
  return {
    accessToken: token as string,
    isAuthenticated: Boolean(token)
  }
}
