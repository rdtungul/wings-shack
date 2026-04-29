import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/testimonials'
import { Star } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="What Our Fans Say"
          subtitle="Don't take our word for it — here's what the Wings Shack family has to say."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 shadow-sm flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-brand-yellow fill-brand-yellow" />
                ))}
              </div>
              <blockquote className="text-brand-gray leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 pt-5 border-t border-brand-lightgray">
                <p className="font-bold text-brand-black">{t.name}</p>
                {t.location && (
                  <p className="text-sm text-brand-gray">{t.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
