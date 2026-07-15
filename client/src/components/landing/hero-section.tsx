import { motion } from 'framer-motion'
import { ActionButton, Section, ProductScreenshotCard } from './landing-ui'

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pt-[96px] pb-[48px]">
      <div className="relative grid gap-16 lg:grid-cols-1 lg:text-center justify-items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 flex flex-col items-center max-w-[800px]"
        >
          <div className="space-y-6 flex flex-col items-center">
            <h1 className="font-semibold text-[40px] leading-[1.05] tracking-[-1.0px] text-[#f7f8f8] sm:text-[56px] sm:leading-[1.1] sm:tracking-[-1.8px] md:text-[80px] md:leading-[1.05] md:tracking-[-3.0px]">
              Trade skills.<br />Skip the invoice.
            </h1>
            <p className="max-w-[600px] text-[18px] leading-[1.5] tracking-[-0.1px] text-[#d0d6e0] sm:text-[20px] sm:leading-[1.4] sm:tracking-[-0.2px]">
              Value moves in a circle, not a straight line. Teach someone a skill, earn a credit, and spend it when you need help from someone else. No cash required.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center">
            <ActionButton to="/signup" variant="primary">
              Start swapping
            </ActionButton>
            <ActionButton href="#how-it-works" variant="secondary">
              See how it works
            </ActionButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[1000px] relative"
        >
          <ProductScreenshotCard className="relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#23252a] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#34343a]" />
                <div className="h-3 w-3 rounded-full bg-[#34343a]" />
                <div className="h-3 w-3 rounded-full bg-[#34343a]" />
              </div>
              <div className="text-[12px] text-[#8a8f98] font-mono">app.ripple.com/dashboard</div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#d0d6e0]">Balance:</span>
                <span className="inline-flex h-6 items-center rounded-full bg-[#141516] px-3 text-[12px] font-medium text-[#f7f8f8] border border-[#34343a]">
                  3 Credits
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                <h3 className="text-[16px] font-medium text-[#f7f8f8]">Recent Activity</h3>
                <div className="space-y-2">
                  {[
                    { title: 'Taught spreadsheet basics to David', time: '2 hours ago', amount: '+1 Credit', positive: true },
                    { title: 'Learned React routing from Sarah', time: 'Yesterday', amount: '-1 Credit', positive: false },
                    { title: 'Taught guitar tuning to Alex', time: '3 days ago', amount: '+1 Credit', positive: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-[8px] bg-[#141516] border border-[#23252a]">
                      <div>
                        <div className="text-[14px] text-[#f7f8f8]">{item.title}</div>
                        <div className="text-[12px] text-[#8a8f98] mt-1">{item.time}</div>
                      </div>
                      <div className={`text-[14px] font-medium ${item.positive ? 'text-[#27a644]' : 'text-[#f7f8f8]'}`}>
                        {item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-[16px] font-medium text-[#f7f8f8]">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] transition-colors">
                    <div className="text-[14px] font-medium text-[#ffffff]">Offer a skill</div>
                    <div className="text-[12px] text-[#ffffff]/80 mt-1">Earn more credits</div>
                  </button>
                  <button className="w-full text-left p-4 rounded-[8px] bg-[#18191a] border border-[#34343a] hover:bg-[#191a1b] transition-colors">
                    <div className="text-[14px] font-medium text-[#f7f8f8]">Request a skill</div>
                    <div className="text-[12px] text-[#8a8f98] mt-1">Spend your credits</div>
                  </button>
                </div>
              </div>
            </div>
          </ProductScreenshotCard>
        </motion.div>
      </div>
    </Section>
  )
}
