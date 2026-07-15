import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuthStore } from '../../store/auth-store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => ({
    auth: context.auth,
  }),
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  useEffect(() => {
    if (hasHydrated && !accessToken) {
      void navigate({
        to: '/signin',
        replace: true,
      })
    }
  }, [accessToken, hasHydrated, navigate])

  if (!hasHydrated) {
    return null
  }

  if (!accessToken) {
    return null
  }

  return <Outlet />
}
