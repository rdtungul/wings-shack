import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublic = createRouteMatcher(['/admin/login(.*)', '/api/admin/auth/resolve'])
const isApiRoute = createRouteMatcher(['/api/(.*)'])

export const proxy = clerkMiddleware(async (auth, req) => {
  if (isPublic(req)) return

  // API routes return 401 JSON — never redirect to login
  if (isApiRoute(req)) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return
  }

  await auth.protect()
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
