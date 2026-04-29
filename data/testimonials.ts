export type Testimonial = {
  name: string
  location?: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Janelle R.',
    location: 'Cayce, SC',
    quote:
      'Hands down the best wings in the Midlands! The sauce variety is incredible and the portions are so generous. We order from Wings Shack at least twice a month.',
    rating: 5,
  },
  {
    name: 'Marco D.',
    location: 'Columbia, SC',
    quote:
      'I got the party pack for our Super Bowl party and everyone was raving. 100 wings, perfectly sauced, hot and fresh. Will absolutely be ordering again for the next big game!',
    rating: 5,
  },
  {
    name: 'Trisha G.',
    location: 'Lancaster, SC',
    quote:
      "Wings Shack is a staple for our family. The kids love the nuggets and my husband and I always fight over the last Mango Habanero wing. So glad they're expanding!",
    rating: 5,
  },
]
