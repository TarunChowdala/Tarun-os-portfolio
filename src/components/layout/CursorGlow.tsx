import { motion } from 'framer-motion'
import { useCursorGlow } from '@/hooks/useCursorGlow'

/** Soft blue glow that follows the pointer — desktop only. */
export function CursorGlow() {
  const { point, visible } = useCursorGlow(true)

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[45] mix-blend-screen"
      style={{
        left: 0,
        top: 0,
        width: 320,
        height: 320,
        marginLeft: -160,
        marginTop: -160,
        background:
          'radial-gradient(circle, rgba(91,159,212,0.16) 0%, rgba(91,159,212,0.04) 35%, transparent 70%)',
        willChange: 'transform, opacity',
      }}
      animate={{
        x: point.x,
        y: point.y,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 140, damping: 28, mass: 0.4 }}
    />
  )
}
