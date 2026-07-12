import { useNavigate } from "@tanstack/react-router";
import {useMutation} from '@tanstack/react-query'
import { signup } from "../lib/auth-api";
import { useAuthStore } from "../store/auth-store";

export function useSignUp() {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((s) => s.setAccessToken)

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      navigate({to: "/signin"})
    }
  })
}
