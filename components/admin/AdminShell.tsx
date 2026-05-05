'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'

type Session = { id: string; username: string; name: string; role: 'MASTERADMIN' | 'CLERK' }

const navLinks = [
  { href: '/admin', label: 'Dashboard', roles: ['MASTERADMIN', 'CLERK'] },
  { href: '/admin/contact', label: 'Contact Forms', roles: ['MASTERADMIN', 'CLERK'] },
  { href: '/admin/careers', label: 'Applications', roles: ['MASTERADMIN', 'CLERK'] },
  { href: '/admin/clerks', label: 'Manage Clerks', roles: ['MASTERADMIN'] },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then(setSession)
  }, [])

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Don't render shell on login page
  if (pathname === '/admin/login') return <>{children}</>

  const links = session ? navLinks.filter((l) => l.roles.includes(session.role)) : []

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-brand-black flex flex-col transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:relative lg:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/admin" className="block">
            <span className="font-display text-3xl uppercase text-white tracking-wide">
              Wing <span className="text-brand-red">Shack</span>
            </span>
            <span className="block text-white/40 text-xs uppercase tracking-widest mt-0.5">Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setSidebarOpen(false)}
              className={clsx(
                'block px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wide transition-colors',
                pathname === l.href
                  ? 'bg-brand-red text-brand-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-6 py-5 border-t border-white/10">
          {session && (
            <p className="text-xs text-white/50 mb-3 truncate">
              <span className="text-white/80 font-semibold">{session.name}</span>
              <br />
              {session.role === 'MASTERADMIN' ? 'Master Admin' : 'Clerk'}
            </p>
          )}
          <button
            onClick={logout}
            className="w-full text-sm font-bold uppercase tracking-wide text-white/60 hover:text-white transition-colors text-left cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between lg:justify-end">
          <button
            className="lg:hidden text-brand-black"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
          {session && <span className="text-sm text-brand-gray">{session.name}</span>}
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
