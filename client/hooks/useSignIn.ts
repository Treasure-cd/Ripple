import { signin } from '../lib/auth-api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth-store'

export function useSignIn() {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((s) => s.setAccessToken)

  return useMutation({
    mutationFn: signin,
    onSuccess: (data: any) => {
      console.log("Success: ", data)
      setAccessToken(data.token)
      console.log("Navigating...")
      navigate({ to: '/profile' })
    },
  })
}
