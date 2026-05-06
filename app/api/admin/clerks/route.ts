import { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clerks = await prisma.user.findMany({
    where: { role: 'CLERK' },
    select: { id: true, clerkId: true, email: true, name: true, allowedLocations: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(clerks)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { firstName, lastName, email, password, allowedLocations } = await req.json()

  if (!firstName || !lastName || !email || !password) {
    return Response.json({ error: 'All fields are required' }, { status: 400 })
  }

  const client = await clerkClient()

  let clerkUser
  try {
    clerkUser = await client.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create user'
    return Response.json({ error: msg }, { status: 400 })
  }

  const clerk = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      name: `${firstName} ${lastName}`,
      email,
      role: 'CLERK',
      allowedLocations: allowedLocations ?? [],
    },
    select: { id: true, clerkId: true, email: true, name: true, allowedLocations: true, createdAt: true },
  })

  return Response.json(clerk, { status: 201 })
}
