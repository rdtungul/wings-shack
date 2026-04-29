import { clsx } from 'clsx'

type CardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl overflow-hidden shadow-sm',
        hover && 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
