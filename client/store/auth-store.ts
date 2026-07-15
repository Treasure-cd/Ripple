import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  hasHydrated: boolean
  setAccessToken: (token: string | null) => void
  clearAccessToken: () => void
  setHasHydrated: (hasHydrated: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      hasHydrated: false,
      setAccessToken: (token: string | null) =>
        set({
          accessToken: token,
        }),
      clearAccessToken: () =>
        set({
          accessToken: null,
        }),
      setHasHydrated: (hasHydrated: boolean) =>
        set({
          hasHydrated,
        }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
