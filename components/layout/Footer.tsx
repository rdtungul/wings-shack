import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { locations, hours, corporate } from '@/data/locations'

const quickLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About Us',      href: '/about-us' },
  { label: 'Menu',          href: '/menu' },
  { label: 'Services',      href: '/services' },
  { label: 'Contact Us',    href: '/contact-us' },
  { label: 'Privacy Policy',href: '/data-privacy-policy' },
]

export default function Footer() {
  const openLocation = locations.find((l) => l.status === 'open')

  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Wings Shack logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <span className="font-display text-3xl uppercase tracking-wide text-white leading-none">
                Wings Shack
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Serving the Midlands with championship wings for over 37 years.
              &ldquo;Winging it with Rocky!&rdquo;
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <a href={`tel:${corporate.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} />
                {corporate.phone}
              </a>
              <a href={`mailto:${corporate.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} />
                {corporate.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-white mb-4 text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-white mb-4 text-sm">Hours</h4>
            <ul className="flex flex-col gap-2">
              {Object.entries(hours).map(([day, time]) => (
                <li key={day} className="flex items-start gap-2 text-sm">
                  <Clock size={14} className="text-brand-red mt-0.5 shrink-0" />
                  <span>
                    <span className="text-white font-medium">{day}:</span>{' '}
                    <span className="text-white/70">{time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-white mb-4 text-sm">Locations</h4>
            <ul className="flex flex-col gap-4">
              {locations.map((loc) => (
                <li key={loc.name} className="text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-brand-red mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">{loc.name}</p>
                      <p className="text-white/60 text-xs mt-0.5">{loc.address}</p>
                      {loc.status !== 'open' && (
                        <span className="text-brand-orange text-xs font-semibold capitalize">
                          {loc.status === 'coming-soon' ? 'Coming Soon' : 'Opening Soon'}
                        </span>
                      )}
                      {loc.phone && (
                        <a href={`tel:${loc.phone}`} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mt-0.5">
                          <Phone size={11} /> {loc.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Wings Shack. All rights reserved.</p>
          <Link href="/data-privacy-policy" className="hover:text-white/70 transition-colors">
            Data Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
