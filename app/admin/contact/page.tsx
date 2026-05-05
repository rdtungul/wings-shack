import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Contact Submissions' }

export default async function ContactSubmissionsPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const subjectLabels: Record<string, string> = {
    general: 'General Inquiry',
    catering: 'Catering / Party Pack',
    feedback: 'Feedback',
    careers: 'Careers',
    other: 'Other',
  }

  return (
    <div>
      <h1 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-6">
        Contact Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-brand-gray">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <p className="font-bold text-brand-black">{s.name}</p>
                  <a href={`mailto:${s.email}`} className="text-sm text-brand-red hover:underline">
                    {s.email}
                  </a>
                </div>
                <div className="text-right">
                  {s.subject && (
                    <span className="inline-block text-xs font-bold uppercase tracking-wide bg-brand-black text-white px-3 py-1 rounded-full mb-1">
                      {subjectLabels[s.subject] ?? s.subject}
                    </span>
                  )}
                  <p className="text-xs text-brand-gray">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-brand-black whitespace-pre-wrap">{s.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
