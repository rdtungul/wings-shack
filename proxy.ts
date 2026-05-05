import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PUBLIC_ADMIN = ['/admin/login']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (PUBLIC_ADMIN.some((p) => pathname.startsWith(p))) return NextResponse.next()

  const token = req.cookies.get('ws_admin_token')?.value
  const session = token ? await verifyToken(token) : null

  if (!session) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Only masteradmin can access /admin/clerks
  if (pathname.startsWith('/admin/clerks') && session.role !== 'MASTERADMIN') {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
