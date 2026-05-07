'use client'

import { useEffect, useState } from 'react'
import { SignIn, useSignIn } from '@clerk/nextjs'

const inputCls =
  'w-full border border-brand-lightgray rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red bg-white text-brand-black'
const labelCls = 'block text-xs font-bold uppercase tracking-widest text-brand-gray mb-1.5'

function ManualLoginForm({ onBack }: { onBack: () => void }) {
  const { signIn } = useSignIn()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Resolve username → email (Clerk needs email if username sign-in isn't enabled)
      const resolved = await fetch('/api/admin/auth/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      }).then((r) => r.json()).then((d) => d.identifier as string).catch(() => identifier)

      // Single step: identifier + password together completes the sign-in
      const { error: createErr } = await signIn.create({ identifier: resolved, password })
      if (createErr) { setError(createErr.message ?? 'Invalid credentials'); return }

      // Activate session — decorateUrl handles Safari ITP
      const { error: finalErr } = await signIn.finalize({
        navigate: ({ decorateUrl }) => { window.location.href = decorateUrl('/admin') },
      })
      if (finalErr) { setError(finalErr.message ?? 'Sign-in failed') }
    } catch (err: unknown) {
      const msg = (err as { errors?: Array<{ message: string }> }).errors?.[0]?.message
        ?? (err instanceof Error ? err.message : null)
        ?? 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-4 shadow-2xl">
      <div>
        <label className={labelCls}>Email or Username</label>
        <input
          type="text"
          required
          autoComplete="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="admin@wingshack.com or username"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={inputCls}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-red text-white font-bold uppercase tracking-wide rounded-full py-3 hover:bg-brand-black transition-colors disabled:opacity-60 cursor-pointer"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-xs text-brand-gray hover:text-brand-black transition-colors cursor-pointer pt-1"
      >
        ← Back to Clerk sign-in
      </button>
    </form>
  )
}

function TokenSignIn({ token }: { token: string }) {
  const { signIn } = useSignIn()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token || !signIn) return
    signIn.create({ strategy: 'ticket', ticket: token })
      .then(({ error: createErr }) => {
        if (createErr) { setError(createErr.message ?? 'Invalid or expired link'); return }
        return signIn.finalize({
          navigate: ({ decorateUrl }) => { window.location.href = decorateUrl('/admin') },
        })
      })
      .then((result) => {
        if (result && result.error) setError(result.error.message ?? 'Sign-in failed')
      })
      .catch((err: unknown) => {
        const msg = (err as { errors?: Array<{ message: string }> }).errors?.[0]?.message
          ?? (err instanceof Error ? err.message : null)
          ?? 'Sign-in failed'
        setError(msg)
      })
  }, [token, signIn])

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-3">
      {error ? (
        <>
          <p className="text-sm text-red-600">{error}</p>
          <p className="text-xs text-brand-gray">This link may have expired. Ask an admin for a new one.</p>
        </>
      ) : (
        <p className="text-sm text-brand-gray">Signing you in…</p>
      )}
    </div>
  )
}

export default function AdminLoginPage() {
  const [token, setToken] = useState<string | null>(null)
  const [mode, setMode] = useState<'clerk' | 'manual'>('clerk')

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token')
    if (t) setToken(t)
  }, [])

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl uppercase text-white tracking-wide">
            Wing <span className="text-brand-red">Shack</span>
          </h1>
          <p className="text-white/50 text-sm mt-2 uppercase tracking-widest">Admin Portal</p>
        </div>

        {token ? (
          <TokenSignIn token={token} />
        ) : mode === 'clerk' ? (
          <>
            <SignIn
              routing="hash"
              fallbackRedirectUrl="/admin"
              appearance={{
                elements: {
                  card: 'bg-white rounded-2xl shadow-2xl',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'hidden',
                  dividerRow: 'hidden',
                  footerAction: 'hidden',
                },
              }}
            />
            <div className="text-center mt-4">
              <button
                onClick={() => setMode('manual')}
                className="text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer uppercase tracking-widest"
              >
                Sign in manually
              </button>
            </div>
          </>
        ) : (
          <ManualLoginForm onBack={() => setMode('clerk')} />
        )}

      </div>
    </div>
  )
}
