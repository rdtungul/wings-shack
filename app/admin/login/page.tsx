'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Login failed')
      router.push(params.get('next') ?? '/admin')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-4 shadow-2xl">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray mb-1.5">
          Username
        </label>
        <input
          type="text"
          required
          autoComplete="username"
          value={form.username}
          onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
          className="w-full border border-brand-lightgray rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red"
          placeholder="username"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray mb-1.5">
          Password
        </label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          className="w-full border border-brand-lightgray rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red"
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-red text-brand-black font-bold uppercase tracking-wide rounded-full py-3 hover:bg-brand-black hover:text-white transition-colors disabled:opacity-60 cursor-pointer"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl uppercase text-white tracking-wide">
            Wing <span className="text-brand-red">Shack</span>
          </h1>
          <p className="text-white/50 text-sm mt-2 uppercase tracking-widest">Admin Portal</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
