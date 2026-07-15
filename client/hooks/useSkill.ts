import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { apiFetch } from '../lib/api-client'
import type { AddSkillPayload, AddUserSkillPayload, Skill } from '../types/skill'

type SkillListResponse = {
  skills: Skill[]
}

type UserSkill = {
  id: number
  user_id: number
  skill_id: number
  intent: 'Teach' | 'Learn'
  proficiency_level: string | null
  hourly_rate: number | null
}

type UserSkillListResponse = {
  skills: UserSkill[]
}

type CreateResponse = {
  id: number
}

export const skillKeys = {
  all: () => ['skills'] as const,
  me: () => ['me', 'skills'] as const,
  add: () => ['skills', 'add'] as const,
  attach: () => ['me', 'skills', 'add'] as const,
}

export const requireToken = (token: string | null | undefined) => {
  if (!token) {
    throw new Error('Missing auth token')
  }

  return token
}

const getSkills = (token: string | null | undefined) => 
  queryOptions({
    queryKey: skillKeys.all(),
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const authToken = requireToken(token)
      const res = await apiFetch<SkillListResponse>('/skills', {
        token: authToken,
      })

      return res.skills
    },
  })

const getUserSkills = (token: string | null | undefined) =>
  queryOptions({
    queryKey: skillKeys.me(),
    enabled: Boolean(token),
    staleTime: 60 * 1000,
    queryFn: async () => {
      const authToken = requireToken(token)
      const res = await apiFetch<UserSkillListResponse>('/users/me/skills', {
        token: authToken,
      })

      return res.skills
    },
  })

const getUserSkill = getUserSkills

function useAddSkill(token: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: skillKeys.add(),
    mutationFn: async (newSkill: AddSkillPayload) => {
      const authToken = requireToken(token)

      return apiFetch<CreateResponse>('/skills', {
        token: authToken,
        method: 'POST',
        body: JSON.stringify(newSkill),
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: skillKeys.all() })
    },
  })
}

function useAddUserSkill(token: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: skillKeys.attach(),
    mutationFn: async (newUserSkillPayload: AddUserSkillPayload) => {
      const authToken = requireToken(token)

      return apiFetch<CreateResponse>('/users/me/skills', {
        token: authToken,
        method: 'POST',
        body: JSON.stringify(newUserSkillPayload),
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: skillKeys.me() })
    },
  })
}

export { getSkills, getUserSkills, getUserSkill, useAddSkill, useAddUserSkill }
