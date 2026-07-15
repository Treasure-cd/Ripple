import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Plus,
  Search,
  X,
  GraduationCap,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getSkills, useAddSkill, useAddUserSkill } from '../../hooks/useSkill'
import { useAuthStore } from '../../store/auth-store'
import type { Skill, SkillIntent, ProficiencyLevel } from '../../types/skill'

type AddSkillModalProps = {
  isOpen: boolean
  onClose: () => void
  existingSkills?: any[]
}

type Step = 'search' | 'config' | 'submitting' | 'error' | 'success'

type SelectedSkill = {
  id?: number
  name: string
}

export default function AddSkillModal({ isOpen, onClose, existingSkills = [] }: AddSkillModalProps) {
  const token = useAuthStore((state) => state.accessToken)
  const { data: globalCatalog = [], isLoading: isLoadingCatalog } = useQuery(getSkills(token))
  const addSkillMutation = useAddSkill(token)
  const addUserSkillMutation = useAddUserSkill(token)

  const [step, setStep] = useState<Step>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill | null>(null)
  const [intent, setIntent] = useState<SkillIntent>('Teach')
  const [proficiency, setProficiency] = useState<ProficiencyLevel>('Intermediate')
  const [rate, setRate] = useState('')
  const [category, setCategory] = useState('Frontend')
  const [errorMsg, setErrorMsg] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  const normalizeCategory = (value: string) => {
    if (value === 'Design') return 'Design'
    if (value === 'Language') return 'Language'
    return 'Programming'
  }

  const normalizeProficiency = (value: ProficiencyLevel) => {
    return value === 'Advanced' ? 'Expert' : value
  }

  const skillAlreadyExists = (name: string) =>
    existingSkills.some((skill) => skill.name.toLowerCase() === name.toLowerCase())

  useEffect(() => {
    if (!isOpen) return

    setStep('search')
    setSearchQuery('')
    setSelectedSkill(null)
    setIntent('Teach')
    setProficiency('Intermediate')
    setRate('')
    setCategory('Frontend')
    setErrorMsg('')

    const id = window.setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)

    return () => window.clearTimeout(id)
  }, [isOpen])

  if (!isOpen) return null

  const filteredCatalog = globalCatalog.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const exactMatch = filteredCatalog.find(
    (skill) => skill.name.toLowerCase() === searchQuery.toLowerCase(),
  )
  const showCreateNew = searchQuery.trim().length > 0 && !exactMatch

  const handleSelectSkill = (skill: Skill) => {
    if (skillAlreadyExists(skill.name)) {
      setErrorMsg(`You already have "${skill.name}" in your profile.`)
      return
    }

    setErrorMsg('')
    setSelectedSkill(skill)
    setStep('config')
  }

  const handleCreateNew = () => {
    const newName = searchQuery.trim()

    if (skillAlreadyExists(newName)) {
      setErrorMsg(`You already have "${newName}" in your profile.`)
      return
    }

    setErrorMsg('')
    setSelectedSkill({ name: newName })
    setStep('config')
  }

  const handleSubmit = async () => {
    if (!selectedSkill) return

    setStep('submitting')
    setErrorMsg('')

    try {
      let finalSkillId = selectedSkill.id

      if (!finalSkillId) {
        const createRes = await addSkillMutation.mutateAsync({
          name: selectedSkill.name,
          category: normalizeCategory(category),
        })
        finalSkillId = createRes.id
      }

      await addUserSkillMutation.mutateAsync({
        skillId: finalSkillId,
        intent,
        proficiencyLevel: normalizeProficiency(proficiency),
        hourlyRate: rate ? parseFloat(rate) : undefined,
      })

      setStep('success')
      window.setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err: any) {
      setStep('error')
      setErrorMsg(err.message || 'Failed to add skill.')
    }
  }

  const isSubmitting = step === 'submitting'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010102]/80 px-4 py-6 backdrop-blur-[4px]">
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isSubmitting) onClose()
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative z-10 flex w-full max-w-2xl max-h-[88vh] flex-col overflow-hidden rounded-[16px] border border-[#23252a] bg-[#0f1011] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
      >
        {/* Accent Bar */}
        <div className="h-1 bg-[#5e6ad2]" />

        <div className="flex items-start justify-between gap-4 border-b border-[#23252a] px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#141516] border border-[#34343a] text-[#5e6ad2]">
              <Plus className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {step === 'config' && (
                  <button
                    onClick={() => setStep('search')}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#23252a] bg-[#141516] text-[#8a8f98] transition hover:border-[#3e3e44] hover:text-[#f7f8f8]"
                    aria-label="Back to search"
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <h2 className="truncate text-[16px] font-semibold text-[#f7f8f8]">
                  {step === 'search' ? 'Add a skill' : selectedSkill?.name}
                </h2>
              </div>
              <p className="mt-0.5 text-[13px] text-[#8a8f98]">
                {step === 'search'
                  ? 'Find a skill you teach, or add a new one to Ripple.'
                  : 'Set how you want to use this skill in your profile.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[#8a8f98] transition hover:bg-[#141516] hover:text-[#f7f8f8] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {step === 'search' && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8f98]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search skills, like React or Figma"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setErrorMsg('')
                  }}
                  className="h-12 w-full rounded-[8px] border border-[#34343a] bg-[#141516] pl-10 pr-4 text-[14px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e69d1]/50"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 rounded-[8px] border border-[#23252a] bg-[#010102] px-4 py-3 text-[14px] text-[#e5484d]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="overflow-hidden rounded-[8px] border border-[#23252a] bg-[#141516]">
                <div className="flex items-center justify-between border-b border-[#23252a] px-4 py-3 bg-[#0f1011]">
                  <p className="text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">Skill catalog</p>
                  <p className="text-[12px] text-[#62666d]">
                    {searchQuery ? `${filteredCatalog.length} matches` : 'All skills'}
                  </p>
                </div>

                <div className="max-h-[420px] overflow-y-auto">
                  {isLoadingCatalog ? (
                    <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 py-12 text-[#8a8f98]">
                      <Loader2 className="h-5 w-5 animate-spin text-[#5e6ad2]" />
                      <span className="text-[14px]">Loading skills...</span>
                    </div>
                  ) : filteredCatalog.length > 0 || showCreateNew ? (
                    <ul className="divide-y divide-[#23252a]">
                      {filteredCatalog.map((skill) => (
                        <li key={skill.id}>
                          <button
                            onClick={() => handleSelectSkill(skill)}
                            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#18191a] focus:bg-[#18191a] focus:outline-none"
                            type="button"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-[14px] font-medium text-[#f7f8f8]">{skill.name}</p>
                              <p className="mt-1 text-[12px] text-[#8a8f98]">{skill.category}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-[#62666d]" />
                          </button>
                        </li>
                      ))}

                      {showCreateNew && (
                        <li>
                          <button
                            onClick={handleCreateNew}
                            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-[#18191a] focus:bg-[#18191a] focus:outline-none"
                            type="button"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[#0f1011] border border-[#23252a] text-[#5e6ad2]">
                              <Plus className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[14px] font-medium text-[#5e6ad2]">Create "{searchQuery}"</p>
                              <p className="mt-1 text-[12px] text-[#8a8f98]">Add it to the Ripple catalog</p>
                            </div>
                          </button>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f1011] border border-[#23252a] text-[#8a8f98]">
                        <Search className="h-5 w-5" />
                      </div>
                      <div className="max-w-xs space-y-1">
                        <p className="text-[14px] font-medium text-[#f7f8f8]">Nothing here yet</p>
                        <p className="text-[13px] text-[#8a8f98]">
                          Search for a skill you want to teach or learn.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {(step === 'config' || step === 'submitting' || step === 'error' || step === 'success') && (
            <div className="flex flex-col gap-5">
              <div className="rounded-[8px] border border-[#23252a] bg-[#141516] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-medium tracking-[0.4px] uppercase text-[#8a8f98]">Selected skill</p>
                    <h3 className="mt-2 text-[16px] font-semibold text-[#f7f8f8]">{selectedSkill?.name}</h3>
                  </div>
                  <span className="rounded-[4px] border border-[#34343a] bg-[#0f1011] px-2 py-1 text-[12px] font-medium text-[#8a8f98]">
                    {selectedSkill?.id ? 'From catalog' : 'New skill'}
                  </span>
                </div>
              </div>

              {!selectedSkill?.id && (
                <div className="space-y-3 rounded-[8px] border border-[#23252a] bg-[#141516] p-4">
                  <label className="text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-12 w-full rounded-[8px] border border-[#34343a] bg-[#0f1011] px-3 text-[14px] text-[#f7f8f8] outline-none transition focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e69d1]/50"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Language">Language</option>
                    <option value="Design">Design</option>
                    <option value="API">API</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              <div className="space-y-3 rounded-[8px] border border-[#23252a] bg-[#141516] p-4">
                <label className="text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">What do you want to do?</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setIntent('Teach')}
                    className={`flex items-center gap-3 rounded-[8px] border px-4 py-3 text-left transition ${
                      intent === 'Teach'
                        ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-[#f7f8f8]'
                        : 'border-[#34343a] bg-[#0f1011] text-[#8a8f98] hover:border-[#3e3e44] hover:text-[#f7f8f8]'
                    }`}
                    type="button"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-[6px] ${
                        intent === 'Teach' ? 'bg-[#5e6ad2] text-[#ffffff]' : 'bg-[#18191a] border border-[#34343a] text-[#8a8f98]'
                      }`}
                    >
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold">Teach</p>
                      <p className={`text-[12px] ${intent === 'Teach' ? 'text-[#f7f8f8]/80' : 'text-[#62666d]'}`}>Offer your time and earn credits</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setIntent('Learn')}
                    className={`flex items-center gap-3 rounded-[8px] border px-4 py-3 text-left transition ${
                      intent === 'Learn'
                        ? 'border-[#5e6ad2] bg-[#5e6ad2]/10 text-[#f7f8f8]'
                        : 'border-[#34343a] bg-[#0f1011] text-[#8a8f98] hover:border-[#3e3e44] hover:text-[#f7f8f8]'
                    }`}
                    type="button"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-[6px] ${
                        intent === 'Learn' ? 'bg-[#5e6ad2] text-[#ffffff]' : 'bg-[#18191a] border border-[#34343a] text-[#8a8f98]'
                      }`}
                    >
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold">Learn</p>
                      <p className={`text-[12px] ${intent === 'Learn' ? 'text-[#f7f8f8]/80' : 'text-[#62666d]'}`}>Spend credits on something you need</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-3 rounded-[8px] border border-[#23252a] bg-[#141516] p-4">
                <label className="text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">Proficiency level</label>
                <select
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value as ProficiencyLevel)}
                  className="h-12 w-full rounded-[8px] border border-[#34343a] bg-[#0f1011] px-3 text-[14px] text-[#f7f8f8] outline-none transition focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e69d1]/50"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {intent === 'Teach' && (
                <div className="space-y-3 rounded-[8px] border border-[#23252a] bg-[#141516] p-4">
                  <label className="flex items-center justify-between text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">
                    <span>Hourly rate</span>
                    <span className="text-[12px] font-normal text-[#62666d]">Optional, in credits</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#8a8f98]">
                      C
                    </span>
                    <input
                      type="number"
                      placeholder="50"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      min="0"
                      className="h-12 w-full rounded-[8px] border border-[#34343a] bg-[#0f1011] pl-10 pr-4 text-[14px] text-[#f7f8f8] placeholder-[#62666d] outline-none transition focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e69d1]/50"
                    />
                  </div>
                </div>
              )}

              {step === 'error' && errorMsg && (
                <div className="flex items-center gap-2 rounded-[8px] border border-[#23252a] bg-[#010102] px-4 py-3 text-[14px] text-[#e5484d]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {step === 'success' && (
                <div className="flex items-center gap-2 rounded-[8px] border border-[#23252a] bg-[#010102] px-4 py-3 text-[14px] font-medium text-[#27a644]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Skill added successfully.
                </div>
              )}

              {step !== 'success' && (
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    onClick={() => setStep('search')}
                    disabled={isSubmitting}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-[8px] border border-[#23252a] bg-[#0f1011] px-4 text-[14px] font-medium text-[#f7f8f8] transition hover:bg-[#18191a] disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#5e6ad2] px-4 text-[14px] font-medium text-[#ffffff] transition hover:bg-[#828fff] disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : step === 'error' ? (
                      'Try again'
                    ) : (
                      'Add skill'
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
