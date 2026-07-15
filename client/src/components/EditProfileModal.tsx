import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, X, AlertCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth-store'
import { updateUser } from '../../hooks/updateUser'

type EditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  user: any
}

export default function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const token = useAuthStore((state) => state.accessToken)

  // Create a safe default for mutation options in case hook is broken
  const updateMutation = useMutation(updateUser(token))

  const [name, setName] = useState('')
  const [github, setGithub] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || '')
      setGithub(user.social_links[0] || '')
      setErrorMsg('')
    }
  }, [isOpen, user])

  if (!isOpen) return null

  const handleSubmit = async () => {
    setErrorMsg('')
    try {
      await updateMutation.mutateAsync({
        name,
        social_links: [
          ...user.social_links,
          github,
        ],
      })
      onClose()
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile.')
    }
  }

  const isSubmitting = updateMutation.isPending

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
        className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-[16px] border border-[#23252a] bg-[#0f1011] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between border-b border-[#23252a] px-6 py-5">
          <h2 className="text-[18px] font-medium text-[#f7f8f8]">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#8a8f98] hover:bg-[#141516] hover:text-[#f7f8f8] transition-colors"
            disabled={isSubmitting}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-[8px] border border-[#23252a] bg-[#010102] px-4 py-3 text-[14px] text-[#27a644]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-[8px] border border-[#34343a] bg-[#141516] px-4 py-3 text-[14px] text-[#f7f8f8] outline-none transition-colors focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e69d1]/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-medium tracking-[0.4px] text-[#8a8f98]">
              GitHub URL
            </label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/username"
              className="w-full rounded-[8px] border border-[#34343a] bg-[#141516] px-4 py-3 text-[14px] text-[#f7f8f8] outline-none transition-colors focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e69d1]/50"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#23252a] px-6 py-5 bg-[#141516]">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-[8px] border border-[#23252a] bg-[#0f1011] px-[14px] py-[8px] text-[14px] font-medium text-[#f7f8f8] hover:bg-[#18191a] transition-colors disabled:opacity-50"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !name.trim()}
            className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-[8px] bg-[#5e6ad2] px-[14px] py-[8px] text-[14px] font-medium text-[#ffffff] hover:bg-[#828fff] transition-colors focus:ring-2 focus:ring-[#5e69d1]/50 outline-none disabled:opacity-50"
            type="button"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Save changes'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
