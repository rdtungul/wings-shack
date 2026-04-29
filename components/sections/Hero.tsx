import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Hero background image */}
      <Image
        src="/images/hero-wings.jpeg"
        alt="Wings Shack wings"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-brand-black/70"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">
          South Carolina&apos;s Favorite Since 1987
        </p>
        <h1 className="font-display text-7xl sm:text-8xl md:text-9xl uppercase leading-none text-white mb-6">
          Winging It{' '}
          <span className="text-brand-red">With Rocky</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          26 signature sauces. 10 dry rubs. Traditional &amp; boneless wings, party packs,
          pizza cones, and more — all made fresh to order.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/menu" variant="primary" className="text-base px-8 py-4">
            See Our Menu
          </Button>
          <Button href="/contact-us" variant="outline" className="text-base px-8 py-4 border-white text-white hover:bg-white hover:text-brand-black">
            Find a Location
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  )
}
