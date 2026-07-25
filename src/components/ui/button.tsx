import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useMagnetic } from '@/hooks/useMagnetic'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background,box-shadow,border-color,color,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer will-change-transform [transition:transform_0.25s_cubic-bezier(0.22,1,0.36,1),background_0.3s,box-shadow_0.3s,border-color_0.3s,color_0.3s,filter_0.3s] [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-white/90 shadow-[0_0_24px_-6px_rgba(255,255,255,0.25)] hover:shadow-[0_0_32px_-4px_rgba(255,255,255,0.35)]',
        accent:
          'bg-[var(--color-accent)] text-[var(--color-bg)] hover:brightness-110 glow-accent',
        ghost:
          'bg-transparent text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)] hover:bg-white/5',
        outline:
          'border border-[var(--color-border-strong)] bg-white/[0.03] text-[var(--color-fg)] hover:bg-white/[0.06] hover:border-white/25 hover:shadow-[0_0_24px_-8px_var(--color-accent-glow)]',
        glass:
          'glass text-[var(--color-fg)] hover:bg-white/[0.08] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, onPointerMove, onPointerLeave, ...props }, ref) => {
    const mag = useMagnetic(0.22)

    const setRefs = (node: HTMLButtonElement | null) => {
      mag.ref.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    return (
      <button
        ref={setRefs}
        className={cn(buttonVariants({ variant, size, className }))}
        onPointerMove={(e) => {
          if (magnetic) mag.onPointerMove(e)
          onPointerMove?.(e)
        }}
        onPointerLeave={(e) => {
          if (magnetic) mag.onPointerLeave()
          onPointerLeave?.(e)
        }}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
