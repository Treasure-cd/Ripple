import { Outlet, redirect, createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '../../store/auth-store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const accessToken = useAuthStore.getState().accessToken
    console.log('Context token:', context.auth.accessToken)
    console.log('Store token:', useAuthStore.getState().accessToken)
    if (!accessToken) {
      throw redirect({
        to: '/signin',
        search: { redirect: location.href },
      })
    }
    return {
      auth: context.auth,
    }
  },

  component: () => <Outlet />,
})
