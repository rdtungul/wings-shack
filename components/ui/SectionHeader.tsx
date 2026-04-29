import { clsx } from 'clsx'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx(centered && 'text-center', className)}>
      <h2
        className={clsx(
          'font-display text-5xl md:text-6xl uppercase tracking-wide leading-none',
          light ? 'text-white' : 'text-brand-black'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'mt-4 text-lg max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-white/80' : 'text-brand-gray'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
