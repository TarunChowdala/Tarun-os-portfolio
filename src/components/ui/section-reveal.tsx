import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div'
}

const ease = [0.22, 1, 0.36, 1] as const

/** Fade + slight rise + scale 0.98→1, once. */
export function SectionReveal({
  children,
  className,
  id,
  as = 'section',
}: SectionRevealProps) {
  const reduced = usePrefersReducedMotion()
  const Comp = motion[as]

  if (reduced) {
    const Tag = as
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    )
  }

  return (
    <Comp
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </Comp>
  )
}
