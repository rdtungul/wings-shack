import { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clerks = await prisma.user.findMany({
    where: { role: 'CLERK' },
    select: { id: true, clerkId: true, email: true, name: true, username: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(clerks)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { firstName, lastName, username: rawUsername, email, password } = await req.json()
  const username = rawUsername?.trim().toLowerCase()

  if (!firstName || !lastName || !username || !email || !password) {
    return Response.json({ error: 'All fields are required' }, { status: 400 })
  }

  const client = await clerkClient()

  let clerkUser
  try {
    clerkUser = await client.users.createUser({
      emailAddress: [email],
      username,
      password,
      firstName,
      lastName,
      skipPasswordChecks: true,
    })
  } catch (err: unknown) {
    console.error('Clerk createUser error:', JSON.stringify(err, null, 2))
    const clerkErr = err as { errors?: Array<{ message: string; longMessage?: string }> }
    const msg = clerkErr.errors?.[0]?.longMessage ?? clerkErr.errors?.[0]?.message ?? (err instanceof Error ? err.message : 'Failed to create user')
    return Response.json({ error: msg }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const clerk = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      name: `${firstName} ${lastName}`,
      username,
      email,
      passwordHash,
      role: 'CLERK',
      allowedLocations: [],
    },
    select: { id: true, clerkId: true, email: true, name: true, username: true, createdAt: true },
  })

  return Response.json(clerk, { status: 201 })
}
