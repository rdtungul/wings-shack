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
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red text-brand-black hover:bg-brand-black hover:text-white',
  secondary:
    'bg-brand-orange text-white hover:bg-brand-black hover:text-white',
  outline:
    'border-2 border-brand-red text-brand-red hover:bg-brand-black hover:text-white',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export default function Button({
  variant = 'primary',
  href,
  className,
  children,
  onClick,
  type = 'button',
  disabled,
  loading,
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
    <button type={type} onClick={onClick} disabled={disabled || loading} className={classes}>
      {loading && <Spinner />}
      {children}
    </button>
  )
}
