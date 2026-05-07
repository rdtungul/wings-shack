'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Session = { role: 'MASTERADMIN' | 'CLERK'; allowedLocations: string[] }
type CareerApplication = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string | null
  state: string | null
  zip: string | null
  birthdate: string
  lastEmployer: string | null
  lastJobTitle: string | null
  lastJobFrom: string | null
  lastJobTo: string | null
  lastJobReason: string | null
  location: string | null
  hearAbout: string | null
  additionalInfo: string | null
  archived: boolean
  createdAt: string
}

export default function CareerApplicationsPage() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [tab, setTab] = useState<'active' | 'archived'>('active')
  const [applications, setApplications] = useState<CareerApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => { if (!u) router.push('/admin/login'); else setSession(u) })
  }, [router])

  useEffect(() => {
    if (!session) return
    setLoading(true)
    fetch(`/api/admin/submissions/careers?archived=${tab === 'archived'}`)
      .then((r) => r.json())
      .then((data) => { setApplications(data); setLoading(false) })
  }, [session, tab])

  async function handleArchive(id: string, archive: boolean) {
    setBusy(id)
    await fetch(`/api/admin/submissions/careers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ archived: archive }),
    })
    setApplications((prev) => prev.filter((a) => a.id !== id))
    setBusy(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this application? This cannot be undone.')) return
    setBusy(id)
    await fetch(`/api/admin/submissions/careers/${id}`, { method: 'DELETE' })
    setApplications((prev) => prev.filter((a) => a.id !== id))
    setBusy(null)
  }

  return (
    <div>
      <h1 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-6">
        Career Applications
      </h1>

      {session?.role === 'CLERK' && session.allowedLocations.length > 0 && (
        <p className="text-sm text-brand-gray mb-4">
          Showing applications for:{' '}
          <span className="font-semibold text-brand-black">{session.allowedLocations.join(', ')}</span>
        </p>
      )}

      {session?.role === 'MASTERADMIN' && (
        <div className="flex gap-2 mb-6">
          {(['active', 'archived'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                tab === t
                  ? 'bg-brand-black text-white'
                  : 'bg-white text-brand-gray border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t === 'active' ? 'Active' : 'Archived'}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-brand-gray">Loading…</p>
      ) : applications.length === 0 ? (
        <p className="text-brand-gray">No {tab} applications.</p>
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
                <div className="flex flex-wrap items-start gap-2">
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
                  {session?.role === 'MASTERADMIN' && (
                    <div className="flex gap-1.5">
                      <button
                        disabled={busy === a.id}
                        onClick={() => handleArchive(a.id, !a.archived)}
                        className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-gray-300 text-brand-gray hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {a.archived ? 'Unarchive' : 'Archive'}
                      </button>
                      <button
                        disabled={busy === a.id}
                        onClick={() => handleDelete(a.id)}
                        className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
