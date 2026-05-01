'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Menu',     href: '/menu' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Contact',  href: '/contact-us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-brand-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Wing Shack"
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-semibold uppercase tracking-wide transition-colors duration-150',
                  pathname === link.href
                    ? 'text-brand-red'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button href="/menu" variant="primary" className="hidden md:inline-flex text-sm py-2 px-5">
              Order Now!
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-brand-black border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'py-3 px-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors',
                  pathname === link.href
                    ? 'text-brand-red bg-white/5'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3">
              <Button href="/menu" variant="primary" className="w-full text-sm py-3" onClick={() => setOpen(false)}>
                Order Now!
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
