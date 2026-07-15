import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
  Pencil,
  UserCog,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import AddSkillModal from './AddSkillModal'
import EditProfileModal from './EditProfileModal'
import { Section, SectionCard } from './landing/landing-ui'
import { getUserSkills, getSkills } from '../../hooks/useSkill'
import { useAuthStore } from '../../store/auth-store'

export default function Profile({
  user,
  generateAvatar,
  joinDate,
}: {
  user: any
  generateAvatar: (name: string) => string
  joinDate: string
}) {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const token = useAuthStore((state) => state.accessToken)
  const { data: rawUserSkills = [] } = useQuery(getUserSkills(token))
  const { data: globalCatalog = [] } = useQuery(getSkills(token))

  const mySkills = rawUserSkills.map((us) => {
    const matchedSkill = globalCatalog.find((s) => s.id === us.skill_id)
    return {
      ...us,
      name: matchedSkill?.name || 'Unknown Skill',
      proficiency: us.proficiency_level,
    }
  })

  const teachSkills = mySkills.filter((s) => s.intent === 'Teach')
  const learnSkills = mySkills.filter((s) => s.intent === 'Learn')

  if (!user) return null

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#010102] font-sans selection:bg-[#5e6ad2]/20 selection:text-[#ffffff]">
      <Section className="!pt-12 pb-24">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Header Card (LinkedIn Style) */}
          <SectionCard className="!p-0 overflow-hidden border-[#23252a]">
            {/* Cover Photo Area */}
            <div className="relative h-[160px] bg-[#141516] border-b border-[#23252a]" />

            <div className="relative px-6 pb-8 sm:px-10">
              {/* Avatar overlaying the cover photo */}
              <div className="absolute -top-[60px] left-6 sm:left-10">
                <div className="relative">
                  <img
                    src={generateAvatar(user.name)}
                    alt={user.name}
                    className="h-[120px] w-[120px] rounded-full border-4 border-[#0f1011] bg-[#18191a] object-cover"
                  />
                  <button
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#23252a] text-[#f7f8f8] transition-colors hover:bg-[#34343a] border border-[#0f1011]"
                    aria-label="Edit Avatar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Actions row right below cover photo, aligned right */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#141516] border border-[#23252a] px-[14px] py-[8px] text-[14px] font-medium text-[#f7f8f8] hover:bg-[#18191a] transition-colors"
                  aria-label="Edit Profile"
                >
                  <UserCog className="h-4 w-4 text-[#8a8f98]" />
                  Edit Profile
                </button>
              </div>

              {/* Profile Info */}
              <div className="mt-4">
                <h1 className="text-[32px] font-semibold leading-[1.2] tracking-[-1.0px] text-[#f7f8f8]">
                  {user.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-6 text-[14px] text-[#8a8f98]">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joined {joinDate}
                  </span>
                  {user.social_links.length === 0 ? (
                    <a
                      href={user.social_links[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[#f7f8f8] transition-colors hover:text-[#5e6ad2]"
                    >
                      <FaGithub className="h-4 w-4" />
                      github.com/{user.social_links.github.split('/').pop()}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-[#62666d]">
                      <FaGithub className="h-4 w-4" />
                      GitHub not connected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Wallet Balance Card */}
          <SectionCard className="!p-8 sm:!p-10 border-[#23252a]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[14px] font-medium tracking-[0.4px] text-[#8a8f98] uppercase">
                  Wallet Balance
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-[48px] font-semibold leading-[1.1] tracking-[-1.8px] text-[#f7f8f8]">
                    {user.cached_balance}
                  </span>
                  <span className="text-[16px] font-medium text-[#8a8f98]">
                    Credits available
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-[1.5] text-[#d0d6e0]">
                  Use credits to request skills from others. Earn more by sharing your knowledge.
                </p>
              </div>
              <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#5e6ad2] px-[16px] py-[10px] text-[14px] font-medium text-[#ffffff] transition-colors hover:bg-[#828fff] focus:ring-2 focus:ring-[#5e69d1]/50 outline-none">
                Top up balance
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </SectionCard>

          {/* Skills Card */}
          <SectionCard className="!p-8 sm:!p-10 border-[#23252a]">
            <div className="flex items-center justify-between border-b border-[#23252a] pb-6">
              <h2 className="text-[20px] font-medium leading-[1.25] tracking-[-0.4px] text-[#f7f8f8]">
                Skills
              </h2>
              <button
                onClick={() => setIsSkillModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-[8px] border border-[#23252a] bg-[#141516] px-[12px] py-[6px] text-[14px] font-medium text-[#f7f8f8] hover:bg-[#18191a] transition-colors"
              >
                <Pencil className="h-3.5 w-3.5 text-[#8a8f98]" />
                Edit Skills
              </button>
            </div>

            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-[15px] font-medium text-[#f7f8f8]">
                  <GraduationCap className="h-4 w-4 text-[#8a8f98]" />
                  What I can teach
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  {teachSkills.length > 0 ? (
                    teachSkills.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-[6px] border border-[#23252a] bg-[#141516] px-4 py-3"
                      >
                        <span className="text-[15px] font-medium text-[#f7f8f8]">
                          {s.name}
                        </span>
                        <span className="text-[13px] text-[#8a8f98]">
                          {s.proficiency}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[14px] text-[#62666d]">
                      You haven't listed any skills to teach yet.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[15px] font-medium text-[#f7f8f8]">
                  <BookOpen className="h-4 w-4 text-[#8a8f98]" />
                  What I want to learn
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  {learnSkills.length > 0 ? (
                    learnSkills.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-[6px] border border-[#23252a] bg-[#010102] px-4 py-3"
                      >
                        <span className="text-[15px] font-medium text-[#f7f8f8]">
                          {s.name}
                        </span>
                        <span className="text-[13px] text-[#8a8f98]">
                          {s.proficiency}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[14px] text-[#62666d]">
                      You haven't listed any skills to learn yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Profile Checklist Card */}
          <SectionCard className="!p-8 sm:!p-10 border-[#23252a]">
            <div className="flex items-center justify-between border-b border-[#23252a] pb-6">
              <h2 className="text-[20px] font-medium leading-[1.25] tracking-[-0.4px] text-[#f7f8f8]">
                Profile Checklist
              </h2>
              <span className="rounded-[4px] bg-[#141516] border border-[#23252a] px-[8px] py-[4px] text-[12px] font-medium text-[#8a8f98]">
                2 Tasks remaining
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <button className="flex w-full items-center justify-between rounded-[8px] border border-[#23252a] bg-[#141516] p-5 text-left transition-colors hover:border-[#3e3e44]">
                <div className="space-y-1">
                  <p className="text-[15px] font-medium text-[#f7f8f8]">Add your bio</p>
                  <p className="text-[14px] text-[#8a8f98]">
                    Introduce yourself and share a brief overview of your expertise.
                  </p>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#23252a] bg-[#0f1011] text-[#f7f8f8]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>

              <button
                onClick={() => setIsSkillModalOpen(true)}
                className="flex w-full items-center justify-between rounded-[8px] border border-[#23252a] bg-[#141516] p-5 text-left transition-colors hover:border-[#3e3e44]"
              >
                <div className="space-y-1">
                  <p className="text-[15px] font-medium text-[#f7f8f8]">
                    List skills to share
                  </p>
                  <p className="text-[14px] text-[#8a8f98]">
                    Add at least 3 skills you are comfortable teaching to others.
                  </p>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#23252a] bg-[#0f1011] text-[#f7f8f8]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            </div>
          </SectionCard>

        </div>
      </Section>

      <AddSkillModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        existingSkills={mySkills}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </main>
  )
}
