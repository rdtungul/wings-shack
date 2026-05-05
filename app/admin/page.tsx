import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const [contactCount, careerCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.careerApplication.count(),
  ])

  const stats = [
    { label: 'Contact Submissions', value: contactCount, href: '/admin/contact' },
    { label: 'Career Applications', value: careerCount, href: '/admin/careers' },
  ]

  return (
    <div>
      <h1 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-2">Dashboard</h1>
      <p className="text-brand-gray text-sm mb-8">Welcome back, {session.name}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow block"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-2">{s.label}</p>
            <p className="font-display text-5xl text-brand-black">{s.value}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
