import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { HTMLAttributes, ReactNode } from 'react'

type SectionProps = HTMLAttributes<HTMLElement>

type ActionButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'inverse'
}

const buttonVariants = {
  primary:
    'bg-[#5e6ad2] text-[#ffffff] hover:bg-[#828fff] focus:ring-2 focus:ring-[#5e69d1]/50 outline-none',
  secondary:
    'bg-[#0f1011] text-[#f7f8f8] border border-[#23252a] hover:bg-[#141516]',
  tertiary:
    'bg-[#010102] text-[#f7f8f8] hover:bg-[#0f1011]',
  inverse:
    'bg-[#ffffff] text-[#000000] hover:bg-[#f5f6f6]',
} as const

export function Section({ className = '', children, ...props }: SectionProps) {
  return (
    <section className={`py-[96px] ${className}`} {...props}>
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function SectionEyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`font-medium text-[13px] leading-[1.3] tracking-[0.4px] text-[#8a8f98] ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionHeading({
  title,
  description,
  className = '',
}: {
  title: ReactNode
  description?: ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className="font-semibold text-[40px] leading-[1.15] tracking-[-1.0px] text-[#f7f8f8] sm:text-[56px] sm:leading-[1.10] sm:tracking-[-1.8px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-[18px] leading-[1.5] tracking-[-0.1px] text-[#d0d6e0]">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function SectionCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[12px] border border-[#23252a] bg-[#0f1011] p-[24px] ${className}`}
    >
      {children}
    </div>
  )
}

export function ProductScreenshotCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[16px] border border-[#23252a] bg-[#0f1011] p-[24px] ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffffff]/10 to-transparent opacity-50" />
      {children}
    </div>
  )
}

export function ActionButton({
  children,
  className = '',
  href,
  to,
  variant = 'primary',
}: ActionButtonProps) {
  const buttonClassName = [
    'inline-flex items-center justify-center rounded-[8px] px-[14px] py-[8px] text-[14px] font-medium leading-[1.2] tracking-0 transition-colors',
    buttonVariants[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <span className={buttonClassName}>
      {children}
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-flex">
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {content}
      </a>
    )
  }
  
  return <button className="inline-flex">{content}</button>
}
