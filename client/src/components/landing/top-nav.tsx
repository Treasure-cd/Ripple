import { ActionButton } from './landing-ui'

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 flex h-[56px] w-full items-center justify-between bg-[#010102] px-6 border-b border-[#23252a]">
      <div className="flex items-center gap-2 text-[#f7f8f8] font-semibold tracking-tight">
        <div className="h-5 w-5 rounded-full bg-[#5e6ad2]" />
        Ripple
      </div>
      <div className="flex items-center gap-3">
        <ActionButton to="/login" variant="secondary">
          Sign in
        </ActionButton>
        <ActionButton to="/signup" variant="primary">
          Get started
        </ActionButton>
      </div>
    </nav>
  )
}
