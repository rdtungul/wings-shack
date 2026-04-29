export type Location = {
  name: string
  address: string
  phone?: string | null
  email?: string | null
  facebook?: string | null
  status: 'open' | 'opening-soon' | 'coming-soon'
}

export const locations: Location[] = [
  {
    name: 'Cayce, SC',
    address: '1305 Knox Abbott Drive, Cayce SC 29033',
    phone: '803-661-6896',
    email: 'wingshack.cayce@gmail.com',
    facebook: 'Wings Shack - Cayce',
    status: 'open',
  },
  {
    name: 'Lancaster, SC',
    address: '1352 Reece Road, Lancaster, SC 29720',
    email: 'wingshack.lancaster@gmail.com',
    facebook: 'Wings Shack - Lancaster SC',
    status: 'opening-soon',
  },
  {
    name: 'Garners Ferry, SC',
    address: '7924 Garners Ferry Road, Columbia, SC 29209',
    phone: null,
    status: 'coming-soon',
  },
  {
    name: 'Winnsboro, SC',
    address: 'Winnsboro, SC',
    status: 'coming-soon',
  },
]

export const hours: Record<string, string> = {
  'Mon–Thu': '11:00 AM – 8:00 PM',
  'Fri–Sat': '11:00 AM – 9:00 PM',
  'Sunday':  '11:00 AM – 6:00 PM',
}

export const corporate = {
  phone: '877-430-0101',
  email: 'corporate@wings-shack.com',
  website: 'wings-shack.com',
}
