import { clsx } from 'clsx'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'red' | 'orange' | 'yellow' | 'gray'
  className?: string
}

const variantClasses = {
  red:    'bg-brand-red text-white',
  orange: 'bg-brand-orange text-white',
  yellow: 'bg-brand-yellow text-brand-black',
  gray:   'bg-brand-lightgray text-brand-gray',
}

export default function Badge({ children, variant = 'red', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
