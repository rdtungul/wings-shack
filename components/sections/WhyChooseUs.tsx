import SectionHeader from '@/components/ui/SectionHeader'
import { DollarSign, Zap, MapPin } from 'lucide-react'

const reasons = [
  {
    icon: DollarSign,
    title: 'Affordable',
    description:
      "Great wings shouldn't break the bank. Our prices keep the whole crew fed without the guilt — from single orders to 250-piece party packs.",
  },
  {
    icon: Zap,
    title: 'Fast & Fresh',
    description:
      'Every order is made fresh to order. No heat lamps, no shortcuts — just hot, crispy wings from our kitchen to your hands.',
  },
  {
    icon: MapPin,
    title: 'Convenient',
    description:
      'Multiple locations across the Midlands with dine-in, takeout, and delivery options. Wing Shack is always close by.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Why Wing Shack?"
          subtitle="We've been the Midlands' go-to wing spot for over 37 years — and here's why."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-5">
                <reason.icon size={28} className="text-brand-red" />
              </div>
              <h3 className="font-display text-3xl uppercase tracking-wide text-brand-black mb-3">
                {reason.title}
              </h3>
              <p className="text-brand-gray leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
