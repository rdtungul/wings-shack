import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wings-shack.com'),
  title: {
    default: 'Wing Shack — Best Wings in the Country',
    template: '%s | Wing Shack',
  },
  description:
    'Wing Shack has been serving championship wings in South Carolina for over 37 years. Traditional & boneless wings, 26 sauces, 10 dry rubs, pizza cones, and party packs.',
  keywords: ['wings', 'chicken wings', 'South Carolina', 'Cayce', 'Lancaster', 'Columbia', 'Wing Shack'],
  openGraph: {
    title: 'Wing Shack — Best Wings in the Country',
    description: 'Wing Shack has been serving championship wings in South Carolina for over 37 years.',
    images: [{ url: '/opengraph-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-brand-offwhite font-sans text-brand-black">
        {children}
      </body>
    </html>
  )
}
