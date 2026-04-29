import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { locations, hours } from '@/data/locations'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { clsx } from 'clsx'

const statusLabel: Record<string, string> = {
  open: 'Open Now',
  'opening-soon': 'Opening Soon',
  'coming-soon': 'Coming Soon',
}

const statusColor: Record<string, string> = {
  open: 'bg-green-100 text-green-700',
  'opening-soon': 'bg-brand-yellow/20 text-amber-700',
  'coming-soon': 'bg-brand-gray/10 text-brand-gray',
}

export default function LocationsStrip() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Find Us Near You"
          subtitle="Wing Shack is growing across South Carolina. Find your nearest location."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="bg-brand-lightgray rounded-2xl p-6 flex flex-col gap-4"
            >
              <div>
                <span
                  className={clsx(
                    'inline-block text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1 mb-3',
                    statusColor[loc.status]
                  )}
                >
                  {statusLabel[loc.status]}
                </span>
                <h3 className="font-display text-2xl uppercase tracking-wide text-brand-black">
                  {loc.name}
                </h3>
              </div>

              <div className="flex flex-col gap-2 text-sm text-brand-gray flex-1">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-brand-red mt-0.5 shrink-0" />
                  <span>{loc.address}</span>
                </div>
                {loc.phone && (
                  <a href={`tel:${loc.phone}`} className="flex items-center gap-2 hover:text-brand-red transition-colors">
                    <Phone size={14} className="text-brand-red shrink-0" />
                    {loc.phone}
                  </a>
                )}
                {loc.email && (
                  <a href={`mailto:${loc.email}`} className="flex items-center gap-2 hover:text-brand-red transition-colors truncate">
                    <Mail size={14} className="text-brand-red shrink-0" />
                    <span className="truncate">{loc.email}</span>
                  </a>
                )}
              </div>

              {loc.status === 'open' && (
                <div className="border-t border-brand-gray/20 pt-4">
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-gray mb-2 uppercase tracking-wide">
                    <Clock size={12} /> Hours
                  </div>
                  {Object.entries(hours).map(([day, time]) => (
                    <div key={day} className="flex justify-between text-xs text-brand-gray">
                      <span>{day}</span>
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/contact-us" variant="outline">
            View All Locations
          </Button>
        </div>
      </div>
    </section>
  )
}
