import { clsx } from 'clsx'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

type ButtonProps = {
  variant?: ButtonVariant
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red text-white hover:bg-brand-darkred',
  secondary:
    'bg-brand-orange text-white hover:bg-orange-600',
  outline:
    'border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white',
}

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-3 font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer'

export default function Button({
  variant = 'primary',
  href,
  className,
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = clsx(base, variantClasses[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
