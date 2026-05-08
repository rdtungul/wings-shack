import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json()
  if (!identifier || !password) {
    return Response.json({ error: 'Missing credentials' }, { status: 400 })
  }

  const id = identifier.trim().toLowerCase()

  // Look up user by username or email (case-insensitive)
  const user = await prisma.user.findFirst({
    where: id.includes('@')
      ? { email: { equals: id, mode: 'insensitive' } }
      : { username: { equals: id, mode: 'insensitive' } },
    select: { clerkId: true, passwordHash: true, role: true },
  })

  if (!user?.passwordHash) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Create a Clerk sign-in token for this user
  const res = await fetch('https://api.clerk.com/v1/sign_in_tokens', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: user.clerkId, expires_in_seconds: 300 }),
  })

  if (!res.ok) {
    return Response.json({ error: 'Could not create sign-in token' }, { status: 500 })
  }

  const { token } = await res.json()
  return Response.json({ token })
}
