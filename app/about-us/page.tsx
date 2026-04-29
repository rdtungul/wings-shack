import type { Metadata } from 'next'
import Image from 'next/image'
import Testimonials from '@/components/sections/Testimonials'
import Button from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn the story of Wings Shack — 37+ years of championship wings in South Carolina's Midlands.",
}

const features = [
  '26 signature sauces & 10 dry rubs made in-house',
  'Fresh, never frozen wings — cooked to order',
  'Family-friendly atmosphere with dine-in seating',
  'Party packs for any size gathering',
  'Pizza cones, loaded taters, and specialty sides',
  'Multiple Midlands locations & growing',
]

const fanFavorites = [
  { name: 'Mango Habanero Wings',   image: '/images/wings-sauce.jpg' },
  { name: 'Smoke N\' Gamecock BBQ', image: '/images/wings-closeup.jpeg' },
  { name: 'Parmesan Garlic Wings',  image: '/images/wings-platter.jpeg' },
  { name: 'Pizza Cones',            image: '/images/pizza-cone.jpg' },
  { name: 'Loaded Tater Tots',      image: '/images/sweet-potato-fries.jpg' },
  { name: 'Lemon Pepper Wings',     image: '/images/wing-flavors.jpg' },
]

export default function AboutPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <div className="bg-brand-black py-20 px-4 text-center">
        <h1 className="font-display text-7xl md:text-8xl uppercase text-white tracking-wide leading-none">
          About <span className="text-brand-red">Wings Shack</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          37+ years of serving the Midlands with championship wings.
        </p>
      </div>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl uppercase tracking-wide text-brand-black leading-none mb-6">
              Winging It Since 1987
            </h2>
            <div className="space-y-4 text-brand-gray leading-relaxed">
              <p>
                Wings Shack was born out of a simple belief: great wings should be accessible, affordable,
                and absolutely delicious. Since 1987, we&apos;ve been perfecting our craft in the heart of
                South Carolina&apos;s Midlands — and our community keeps coming back for more.
              </p>
              <p>
                What started as a single location in Cayce has grown into a beloved regional brand,
                with new locations opening across the state. Our mascot Rocky the Rooster has become
                a symbol of the bold, no-fuss wing culture we champion every day.
              </p>
              <p>
                We offer 26 signature sauces and 10 dry rubs — from crowd-pleasers like Honey Mustard
                and Southern BBQ to heat-seekers like Nuclear and Devil Dust. There&apos;s something
                for every palate at Wings Shack.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-brand-cream">
            <div className="relative h-64 w-full">
              <Image
                src="/images/winging-with-rocky.jpg"
                alt="Winging it with Rocky — Wings Shack mascot"
                fill
                loading="lazy"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-brand-black/30" />
            </div>
          </div>
          <div className="bg-brand-cream rounded-2xl p-10 text-center">
            <div className="font-display text-9xl text-brand-red leading-none">37+</div>
            <div className="font-display text-3xl uppercase text-brand-black mt-2">Years of Wings</div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white rounded-xl p-4">
                <div className="font-display text-4xl text-brand-red">26</div>
                <div className="text-sm text-brand-gray">Signature Sauces</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="font-display text-4xl text-brand-red">10</div>
                <div className="text-sm text-brand-gray">Dry Rubs</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="font-display text-4xl text-brand-red">4</div>
                <div className="text-sm text-brand-gray">SC Locations</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="font-display text-4xl text-brand-red">1M+</div>
                <div className="text-sm text-brand-gray">Wings Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Than Just Wings */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">More Than Wings</p>
            <h2 className="font-display text-5xl md:text-6xl uppercase tracking-wide text-brand-black leading-none mb-8">
              The Full Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-brand-red mt-0.5 shrink-0" />
                <span className="text-brand-gray">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fan Favorites */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3 text-center">Customer Picks</p>
          <h2 className="font-display text-5xl md:text-6xl uppercase tracking-wide text-brand-black text-center leading-none mb-12">
            Fan Favorites
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {fanFavorites.map((item) => (
              <div
                key={item.name}
                className="group bg-brand-lightgray rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-semibold text-brand-black text-sm p-3 text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Careers */}
      <section id="Career" className="scroll-mt-24 py-20 px-4 bg-brand-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl uppercase text-white tracking-wide leading-none mb-4">
            Join Our <span className="text-brand-red">Flock</span>
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Wings Shack is always looking for passionate people to join our growing team.
            Whether you&apos;re in the kitchen or front-of-house, we&apos;d love to have you.
          </p>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-left">
            <h3 className="font-bold text-white text-xl mb-6">Apply Now</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-brand-red"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-brand-red"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-brand-red"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-brand-red"
              />
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-brand-red">
                <option value="">Preferred Location</option>
                <option value="cayce">Cayce, SC</option>
                <option value="lancaster">Lancaster, SC</option>
                <option value="garners-ferry">Garners Ferry, SC</option>
                <option value="winnsboro">Winnsboro, SC</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us a little about yourself..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-brand-red resize-none"
              />
              <Button variant="primary" type="submit" className="w-full py-4">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
