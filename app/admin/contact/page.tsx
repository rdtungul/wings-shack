'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Session = { role: 'MASTERADMIN' | 'CLERK' }
type ContactSubmission = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  archived: boolean
  createdAt: string
}

const subjectLabels: Record<string, string> = {
  general: 'General Inquiry',
  catering: 'Catering / Party Pack',
  feedback: 'Feedback',
  careers: 'Careers',
  other: 'Other',
}

export default function ContactSubmissionsPage() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [tab, setTab] = useState<'active' | 'archived'>('active')
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
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
    fetch(`/api/admin/submissions/contact?archived=${tab === 'archived'}`)
      .then((r) => r.json())
      .then((data) => { setSubmissions(data); setLoading(false) })
  }, [session, tab])

  async function handleArchive(id: string, archive: boolean) {
    setBusy(id)
    await fetch(`/api/admin/submissions/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ archived: archive }),
    })
    setSubmissions((prev) => prev.filter((s) => s.id !== id))
    setBusy(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this submission? This cannot be undone.')) return
    setBusy(id)
    await fetch(`/api/admin/submissions/contact/${id}`, { method: 'DELETE' })
    setSubmissions((prev) => prev.filter((s) => s.id !== id))
    setBusy(null)
  }

  return (
    <div>
      <h1 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-6">
        Contact Submissions
      </h1>

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
      ) : submissions.length === 0 ? (
        <p className="text-brand-gray">No {tab} submissions.</p>
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
                <div className="flex flex-wrap items-start gap-2">
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
                  {session?.role === 'MASTERADMIN' && (
                    <div className="flex gap-1.5">
                      <button
                        disabled={busy === s.id}
                        onClick={() => handleArchive(s.id, !s.archived)}
                        className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-gray-300 text-brand-gray hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {s.archived ? 'Unarchive' : 'Archive'}
                      </button>
                      <button
                        disabled={busy === s.id}
                        onClick={() => handleDelete(s.id)}
                        className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
