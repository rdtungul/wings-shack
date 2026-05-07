'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AdminClerk = {
  id: string
  clerkId: string
  email: string | null
  name: string
  username: string | null
  createdAt: string
}

const emptyForm = {
  firstName: '', lastName: '', username: '', email: '', password: '',
}

export default function ManageClerksPage() {
  const router = useRouter()
  const [clerks, setClerks] = useState<AdminClerk[]>([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchClerks() {
    const res = await fetch('/api/admin/clerks')
    if (res.status === 403) { router.push('/admin'); return }
    if (res.ok) setClerks(await res.json())
  }

  useEffect(() => { fetchClerks() }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch('/api/admin/clerks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          username: form.username.trim(),
          email: form.email,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to add clerk')
      setSuccess(`Clerk "${form.firstName} ${form.lastName}" added.`)
      setForm(emptyForm)
      fetchClerks()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove clerk "${name}"?`)) return
    const res = await fetch(`/api/admin/clerks/${id}`, { method: 'DELETE' })
    if (res.ok) fetchClerks()
  }

  async function handleCopyLoginLink(id: string) {
    const res = await fetch(`/api/admin/clerks/${id}/sign-in-token`, { method: 'POST' })
    if (!res.ok) { alert('Failed to generate login link.'); return }
    const { token } = await res.json()
    const url = `${window.location.origin}/admin/login?token=${token}`
    await navigator.clipboard.writeText(url)
    alert('Login link copied to clipboard. Share it with the clerk — valid for 24 hours.')
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red'
  const labelCls = 'block text-xs font-bold uppercase tracking-widest text-brand-gray mb-1'

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-6">
        Manage Clerks
      </h1>

      {/* Add clerk form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold text-lg text-brand-black mb-4">Add New Clerk</h2>
        <form onSubmit={handleAdd} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>First Name</label>
              <input name="firstName" type="text" required value={form.firstName} onChange={handleChange} placeholder="Jane" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input name="lastName" type="text" required value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Email</label>
            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@wingshack.com" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Username</label>
            <input name="username" type="text" required value={form.username} onChange={handleChange} placeholder="janeclerk" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Password</label>
            <input name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} placeholder="Min 8 characters" className={inputCls} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-brand-red text-brand-black font-bold uppercase tracking-wide text-sm rounded-full px-6 py-2.5 hover:bg-brand-black hover:text-white transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Adding…' : 'Add Clerk'}
          </button>
        </form>
      </div>

      {/* Clerk list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-brand-black">Current Clerks ({clerks.length})</h2>
        </div>
        {clerks.length === 0 ? (
          <p className="px-6 py-8 text-brand-gray text-sm">No clerks added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {clerks.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-semibold text-brand-black text-sm">{c.name}</p>
                  {c.username && <p className="text-xs text-brand-gray font-mono">@{c.username}</p>}
                  {c.email && <p className="text-xs text-brand-gray">{c.email}</p>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleCopyLoginLink(c.id)}
                    className="text-xs font-bold uppercase tracking-wide text-brand-gray hover:text-brand-black transition-colors cursor-pointer"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="text-xs font-bold uppercase tracking-wide text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
