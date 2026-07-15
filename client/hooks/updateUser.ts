import { mutationOptions, useQueryClient } from '@tanstack/react-query'
import { requireToken } from './useSkill'
import { apiFetch } from '../lib/api-client'
import type { UpdateMePayload, UserProfile } from '../types/user'

const updateUser = (token: string | null | undefined) => {
  const queryClient = useQueryClient()
  return mutationOptions({
    mutationKey: ['user', 'me', 'update'],
    mutationFn: async (updateUserPayload: UpdateMePayload) => {
      const authToken = requireToken(token)

      return apiFetch<UserProfile>('/users/me', {
        token: authToken,
        method: 'PATCH',
        body: JSON.stringify(updateUserPayload),
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
    },
  })
}

export { updateUser }
