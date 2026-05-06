'use client'

import { useState } from 'react'
import { SignIn, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const inputCls =
  'w-full border border-brand-lightgray rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red bg-white text-brand-black'
const labelCls = 'block text-xs font-bold uppercase tracking-widest text-brand-gray mb-1.5'

function ManualLoginForm({ onBack }: { onBack: () => void }) {
  const { signIn, isLoaded, setActive } = useSignIn()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError(null)
    try {
      const result = await signIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/admin')
      } else {
        setError('Sign-in incomplete. Please try again.')
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: Array<{ message: string }> }
      setError(clerkErr.errors?.[0]?.message ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-4 shadow-2xl">
      <div>
        <label className={labelCls}>Email</label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@wingshack.com"
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

export default function AdminLoginPage() {
  const [mode, setMode] = useState<'clerk' | 'manual'>('clerk')

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl uppercase text-white tracking-wide">
            Wing <span className="text-brand-red">Shack</span>
          </h1>
          <p className="text-white/50 text-sm mt-2 uppercase tracking-widest">Admin Portal</p>
        </div>

        {mode === 'clerk' ? (
          <>
            <SignIn
              routing="hash"
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
