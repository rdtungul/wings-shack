'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { clsx } from 'clsx'

type AdminUser = { id: string; clerkId: string; name: string; role: 'MASTERADMIN' | 'CLERK'; allowedLocations: string[] }

const navLinks = [
  { href: '/admin', label: 'Dashboard', roles: ['MASTERADMIN', 'CLERK'] },
  { href: '/admin/contact', label: 'Contact Forms', roles: ['MASTERADMIN', 'CLERK'] },
  { href: '/admin/careers', label: 'Applications', roles: ['MASTERADMIN', 'CLERK'] },
  { href: '/admin/clerks', label: 'Manage Clerks', roles: ['MASTERADMIN'] },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
  }, [])

  // Don't render shell on login page
  if (pathname === '/admin/login') return <>{children}</>

  const links = user ? navLinks.filter((l) => l.roles.includes(user.role)) : []

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
          {user && (
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-brand-black">{user.name}</span>
              <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-red text-white">
                {user.role === 'MASTERADMIN' ? 'Master Admin' : 'Clerk'}
              </span>
              <button
                onClick={() => signOut({ redirectUrl: '/admin/login' })}
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-300 text-brand-gray hover:bg-brand-black hover:border-brand-black hover:text-white transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
