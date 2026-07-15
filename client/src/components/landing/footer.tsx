export function Footer() {
  return (
    <footer className="bg-[#010102] px-8 py-[64px] border-t border-[#23252a]">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex items-center gap-2 text-[#f7f8f8] font-semibold tracking-tight">
          <div className="h-5 w-5 rounded-full bg-[#5e6ad2]" />
          Ripple
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <div className="text-[13px] font-medium text-[#f7f8f8]">Product</div>
            <a href="#" className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">How it works</a>
            <a href="#" className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">Discover skills</a>
            <a href="#" className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">Pricing</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-[13px] font-medium text-[#f7f8f8]">Company</div>
            <a href="#" className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">About</a>
            <a href="#" className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">Blog</a>
            <a href="#" className="text-[12px] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
