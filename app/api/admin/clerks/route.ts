import { NextRequest } from 'next/server'
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
    select: { id: true, username: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(clerks)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { username, email, name, password } = await req.json()

  if (!username || !email || !name || !password) {
    return Response.json({ error: 'All fields are required' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) {
    return Response.json({ error: 'Username already in use' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)
  const clerk = await prisma.user.create({
    data: { username, email, name, password: hashed, role: 'CLERK' },
    select: { id: true, username: true, email: true, name: true, createdAt: true },
  })

  return Response.json(clerk, { status: 201 })
}
