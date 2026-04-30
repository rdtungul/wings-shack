import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const featured = [
  {
    title: 'Garbage Fries',
    description: 'Our loaded fry masterpiece — piled high and packed with flavor.',
    badge: 'Must Try',
    price: '$9.99',
    image: '/images/butterfly-fries.png',
  },
  {
    title: 'Mango Habanero Wings',
    description: 'Sweet heat that builds with every bite — one of our most-ordered sauces.',
    badge: 'Fan Favorite',
    price: 'Ask in store',
    image: '/images/wings-sauce.jpg',
  },
  {
    title: 'Sweet Potato Fries',
    description: 'Golden, crispy sweet potato fries — a perfect sweet-and-savory side.',
    badge: 'Popular',
    price: '$4.99',
    image: '/images/sweet-potato-fries.jpg',
  },
  {
    title: 'Mozzarella Sticks',
    description: 'Crispy on the outside, melty on the inside. Available in 3 or 6 pc.',
    badge: 'Crowd Pleaser',
    price: 'From $3.99',
    image: '/images/mozzarella-sticks.jpg',
  },
  {
    title: 'Brownie',
    description: 'Rich, fudgy brownie — add your choice of caramel, chocolate, or raspberry drizzle.',
    badge: 'Sweet Treat',
    price: '$3.29',
    image: '/images/brownie.png',
  },
  {
    title: 'Lemon Pepper Wings',
    description: 'Tangy lemon zest meets bold pepper — a classic Wing Shack dry rub favorite.',
    badge: 'Classic',
    price: 'Ask in store',
    image: '/images/wings-closeup.jpeg',
  },
]

export default function FeaturedMenu() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Fan Favorites"
          subtitle="Start here. These are the menu items our regulars can't live without."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.title}
              className="group bg-brand-lightgray rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-brand-black">
                    {item.title}
                  </h3>
                  <Badge variant="red" className="shrink-0 mt-1">{item.badge}</Badge>
                </div>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">{item.description}</p>
                <p className="font-bold text-brand-red text-lg">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/menu" variant="primary" className="px-10 py-4 text-base">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
