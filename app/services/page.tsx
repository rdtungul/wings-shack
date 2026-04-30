import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { UtensilsCrossed, ShoppingBag, Bike, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Wing Shack offers dine-in, takeout, delivery, and catering services across South Carolina.',
}

const services = [
  {
    id: 'Dine-In',
    icon: UtensilsCrossed,
    title: 'Dine-In',
    description:
      'Come in and enjoy the full Wing Shack experience. Our casual, welcoming atmosphere is perfect for families, groups, and solo diners alike. Grab a booth and dig in.',
    features: ['Spacious seating', 'Family-friendly', 'All menu items available', 'Fresh sauces at every table'],
    cta: { label: 'Find a Location', href: '/contact-us' },
    image: '/images/flyer-menu.png',
  },
  {
    id: 'Takeout',
    icon: ShoppingBag,
    title: 'Takeout',
    description:
      'Call ahead or order in-store — your wings will be hot and ready when you are. Perfect for busy nights, last-minute lunches, or game-day pickups.',
    features: ['Call-ahead ordering', 'Fast pickup window', 'Secure packaging', 'Full menu available'],
    cta: { label: 'Call to Order', href: '/contact-us' },
    image: '/images/dine-in.jpeg',
  },
  {
    id: 'Delivery',
    icon: Bike,
    title: 'Delivery',
    description:
      'Can\'t make it in? We deliver! Check your delivery zone and get Wing Shack brought right to your door, piping hot and ready to eat.',
    features: ['Delivered hot & fresh', 'Check zone availability', 'Easy online ordering', 'Track your order'],
    cta: { label: 'Order Delivery', href: '/contact-us' },
    image: '/images/takeout.jpeg',
  },
  {
    id: 'Catering',
    icon: Users,
    title: 'Catering',
    description:
      'Feeding a crowd? Wing Shack catering is the move. From corporate lunches to wedding receptions, we bring the wings to you — any size, any event.',
    features: ['50–250+ piece packs', 'Multiple sauce options', 'Corporate & private events', 'Call ahead pricing'],
    cta: { label: 'Get a Quote', href: '/contact-us' },
    image: '/images/catering.png',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Header */}
      <div className="bg-brand-black py-20 px-4 text-center">
        <h1 className="font-display text-7xl md:text-8xl uppercase text-white tracking-wide leading-none">
          Our <span className="text-brand-red">Services</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          Wings your way — dine-in, takeout, delivery, or catering.
        </p>
      </div>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4 sm:px-8 lg:px-16 rounded-3xl mb-8 ${
                index % 2 === 0 ? 'bg-white' : 'bg-brand-cream'
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-20 h-20 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6">
                  <service.icon size={36} className="text-brand-red" />
                </div>
                <h2 className="font-display text-5xl uppercase tracking-wide text-brand-black leading-none mb-4">
                  {service.title}
                </h2>
                <p className="text-brand-gray leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-brand-gray">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href={service.cta.href} variant="primary">
                  {service.cta.label}
                </Button>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex items-center justify-center`}>
                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
