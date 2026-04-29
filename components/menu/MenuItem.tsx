import { clsx } from 'clsx'

type MenuItemProps = {
  name: string
  price: string
  description?: string
  className?: string
}

export default function MenuItem({ name, price, description, className }: MenuItemProps) {
  return (
    <div className={clsx('border-b border-brand-lightgray py-3 flex justify-between items-start gap-4', className)}>
      <div>
        <p className="font-semibold text-brand-black">{name}</p>
        {description && (
          <p className="text-sm text-brand-gray mt-0.5">{description}</p>
        )}
      </div>
      <span className="font-bold text-brand-red whitespace-nowrap">{price}</span>
    </div>
  )
}
