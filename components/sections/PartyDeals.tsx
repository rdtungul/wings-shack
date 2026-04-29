import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { Check } from 'lucide-react'

const packs = [
  {
    size: '50 pc.',
    label: 'Tailgate',
    price: '$49.99',
    sauces: 'up to 2 sauces or rubs',
    features: ['Serves 5–8 people', 'Traditional or boneless', 'Your choice of sauces', 'Ready in 30 min'],
    highlight: false,
  },
  {
    size: '100 pc.',
    label: 'Game Day',
    price: '$89.99',
    sauces: 'up to 4 sauces or rubs',
    features: ['Serves 10–15 people', 'Traditional or boneless', 'Mix & match sauces', 'Ready in 45 min'],
    highlight: true,
  },
  {
    size: '250 pc.',
    label: 'Party',
    price: '$199.99',
    sauces: 'up to 6 sauces or rubs',
    features: ['Serves 25–35 people', 'Traditional or boneless', 'Full sauce variety', 'Call ahead to order'],
    highlight: false,
  },
]

export default function PartyDeals() {
  return (
    <section className="relative py-20 px-4 bg-brand-black overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/party-pack.png"
        alt="Wing Shack party pack"
        fill
        loading="lazy"
        className="object-cover object-center opacity-10"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          title="Party Packs"
          subtitle="Feed the whole crew. Perfect for game days, birthdays, corporate events, and every celebration."
          light
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.size}
              className={`rounded-2xl p-8 flex flex-col ${
                pack.highlight
                  ? 'bg-brand-red text-white ring-4 ring-brand-orange scale-105'
                  : 'bg-white/5 text-white border border-white/10'
              }`}
            >
              {pack.highlight && (
                <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-3">
                  Most Popular
                </span>
              )}
              <div className="font-display text-5xl uppercase tracking-wide leading-none mb-1">
                {pack.size}
              </div>
              <div className="font-bold text-lg mb-2 opacity-80">{pack.label} Pack</div>
              <div className="text-4xl font-bold mb-1">{pack.price}</div>
              <div className="text-sm opacity-60 mb-6">{pack.sauces}</div>

              <ul className="flex flex-col gap-2 flex-1">
                {pack.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={pack.highlight ? 'text-brand-yellow' : 'text-brand-orange'} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href="/contact-us"
                  variant={pack.highlight ? 'outline' : 'primary'}
                  className={`w-full ${pack.highlight ? 'border-white text-white hover:bg-white hover:text-brand-red' : ''}`}
                >
                  Order Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
