import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Career Applications' }

export default async function CareerApplicationsPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const applications = await prisma.careerApplication.findMany({
    where: session.role === 'MASTERADMIN'
      ? {}
      : { location: { in: session.allowedLocations } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-6">
        Career Applications
      </h1>

      {session.role === 'CLERK' && session.allowedLocations.length > 0 && (
        <p className="text-sm text-brand-gray mb-6">
          Showing applications for: <span className="font-semibold text-brand-black">{session.allowedLocations.join(', ')}</span>
        </p>
      )}

      {applications.length === 0 ? (
        <p className="text-brand-gray">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <p className="font-bold text-brand-black text-lg">
                    {a.firstName} {a.lastName}
                  </p>
                  <a href={`mailto:${a.email}`} className="text-sm text-brand-red hover:underline">
                    {a.email}
                  </a>
                  {a.phone && <p className="text-sm text-brand-gray">{a.phone}</p>}
                </div>
                <div className="text-right">
                  {a.location && (
                    <span className="inline-block text-xs font-bold uppercase tracking-wide bg-brand-black text-white px-3 py-1 rounded-full mb-1">
                      {a.location}
                    </span>
                  )}
                  <p className="text-xs text-brand-gray">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm border-t border-gray-100 pt-4">
                {a.birthdate && <Field label="Birthdate" value={a.birthdate} />}
                {(a.city || a.state) && (
                  <Field label="Location" value={[a.city, a.state, a.zip].filter(Boolean).join(', ')} />
                )}
                {a.lastEmployer && <Field label="Last Employer" value={a.lastEmployer} />}
                {a.lastJobTitle && <Field label="Last Title" value={a.lastJobTitle} />}
                {(a.lastJobFrom || a.lastJobTo) && (
                  <Field label="Employment Period" value={`${a.lastJobFrom ?? '?'} → ${a.lastJobTo ?? 'present'}`} />
                )}
                {a.lastJobReason && <Field label="Reason for Leaving" value={a.lastJobReason} />}
                {a.hearAbout && <Field label="Heard About Us" value={a.hearAbout} />}
              </div>

              {a.additionalInfo && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-1">About</p>
                  <p className="text-sm text-brand-black whitespace-pre-wrap">{a.additionalInfo}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-brand-gray">{label}</p>
      <p className="text-brand-black">{value}</p>
    </div>
  )
}
