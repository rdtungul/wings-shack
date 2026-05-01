import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const rolleteQaku = localFont({
  src: '../public/fonts/RolleteQaku-Regular.woff',
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: {
    default: 'Wing Shack — Best Wings in the Midlands',
    template: '%s | Wing Shack',
  },
  description:
    'Wing Shack has been serving championship wings in South Carolina for over 37 years. Traditional & boneless wings, 26 sauces, 10 dry rubs, pizza cones, and party packs.',
  keywords: ['wings', 'chicken wings', 'South Carolina', 'Cayce', 'Lancaster', 'Columbia', 'Wing Shack'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rolleteQaku.variable}`}>
      <body className="bg-brand-offwhite font-sans text-brand-black flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
