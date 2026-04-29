import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const featured = [
  {
    title: 'Traditional Wings',
    description: 'Bone-in wings tossed in your choice of 26 sauces or 10 dry rubs.',
    badge: 'Fan Favorite',
    price: 'From $8.99',
    image: '/images/wings-sauce.jpg',
  },
  {
    title: 'Boneless Wings',
    description: 'All the flavor, none of the bones. Perfect for quick snacking.',
    badge: 'Popular',
    price: 'From $9.99',
    image: '/images/wings-closeup.jpeg',
  },
  {
    title: '100 pc. Party Pack',
    description: 'Feed the whole crew. Choose up to 4 sauces or rubs.',
    badge: 'Game Day',
    price: '$89.99',
    image: '/images/party-pack.png',
  },
  {
    title: 'Pizza Cones',
    description: 'A Wings Shack original — pizza in a crispy waffle cone. Kids love it!',
    badge: 'Unique',
    price: 'From $5.99',
    image: '/images/pizza-cone.jpg',
  },
  {
    title: 'Meal Deals',
    description: 'Wings + fries, celery, dressing & a drink. The full experience.',
    badge: 'Best Value',
    price: 'From $12.99',
    image: '/images/wings-platter.jpeg',
  },
  {
    title: 'Boulders',
    description: 'Jumbo-sized bone-in wings for the serious wing lover.',
    badge: 'Go Big',
    price: 'From $10.99',
    image: '/images/restaurant-interior.jpg',
  },
]

export default function FeaturedMenu() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Fan Favorites"
          subtitle="Start here. These are the dishes our regulars can't live without."
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
