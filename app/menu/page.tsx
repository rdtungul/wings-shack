import type { Metadata } from 'next'
import { menuData, sauces, dryRubs } from '@/data/menu'
import MenuCategory from '@/components/menu/MenuCategory'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Wings Shack menu — wings, meal deals, sides, pizzas, pizza cones, desserts, drinks, and party packs.',
}

export default function MenuPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Header */}
      <div className="bg-brand-black py-20 px-4 text-center">
        <h1 className="font-display text-7xl md:text-8xl uppercase text-white tracking-wide leading-none">
          Our <span className="text-brand-red">Menu</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          26 sauces. 10 dry rubs. Something for everyone.
        </p>
      </div>

      {/* Category nav */}
      <div className="sticky top-16 z-40 bg-white border-b border-brand-lightgray shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {menuData.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-2 rounded-full text-sm font-semibold text-brand-gray hover:text-brand-red hover:bg-brand-red/5 transition-colors whitespace-nowrap"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {menuData.map((category) => (
            <MenuCategory key={category.id} category={category} />
          ))}
        </div>

        {/* Sauces & Rubs */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div id="sauces" className="scroll-mt-24">
            <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-4">
              Signature Sauces
              <span className="text-brand-gray text-2xl ml-2">({sauces.length})</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {sauces.map((sauce) => (
                <span
                  key={sauce}
                  className="bg-brand-red/10 text-brand-red text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {sauce}
                </span>
              ))}
            </div>
          </div>

          <div id="dry-rubs" className="scroll-mt-24">
            <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-4">
              Dry Rubs
              <span className="text-brand-gray text-2xl ml-2">({dryRubs.length})</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {dryRubs.map((rub) => (
                <span
                  key={rub}
                  className="bg-brand-orange/10 text-brand-orange text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {rub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
