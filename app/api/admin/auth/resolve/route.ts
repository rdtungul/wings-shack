import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// Resolves a username to the user's primary email so Clerk can authenticate them.
// Email is always a valid sign-in identifier; username requires a Clerk dashboard setting.
export async function POST(req: NextRequest) {
  const { identifier } = await req.json()
  if (!identifier) return Response.json({ identifier }, { status: 200 })

  // If it already looks like an email, pass it through unchanged
  if (identifier.includes('@')) return Response.json({ identifier })

  try {
    const user = await prisma.user.findFirst({
      where: { username: identifier },
      select: { email: true },
    })
    return Response.json({ identifier: user?.email ?? identifier })
  } catch {
    return Response.json({ identifier })
  }
}
