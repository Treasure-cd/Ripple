export type SkillIntent = 'Teach' | 'Learn'
export type ProficiencyLevel =
  'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface AddUserSkillPayload {
  skillId: number
  intent: SkillIntent
  proficiencyLevel: ProficiencyLevel
  hourlyRate?: number
}

export interface Skill {
  id: number
  name: string
  category: string
}
export interface SkillResponse{
  skill: Skill
}

export interface AddSkillPayload {
  name: string
  category: string
}
export interface AddUserSkillResponse {
  id: string
}

export interface UserSkillResponse{
  skillId: string;
}