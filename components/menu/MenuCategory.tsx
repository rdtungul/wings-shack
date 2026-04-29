import MenuItem from './MenuItem'
import type { MenuCategory as MenuCategoryType } from '@/data/menu'

type MenuCategoryProps = {
  category: MenuCategoryType
}

export default function MenuCategory({ category }: MenuCategoryProps) {
  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black">
          {category.title}
        </h2>
        {category.subtitle && (
          <p className="text-brand-gray mt-1">{category.subtitle}</p>
        )}
      </div>
      <div>
        {category.items.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}
