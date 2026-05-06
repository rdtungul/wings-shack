import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher(['/admin/login(.*)'])

export const proxy = clerkMiddleware(async (auth, req) => {
  if (isPublic(req)) return
  await auth.protect()
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
