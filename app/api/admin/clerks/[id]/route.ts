import { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/admin/clerks/[id]'>) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user || user.role !== 'CLERK') {
    return Response.json({ error: 'Clerk not found' }, { status: 404 })
  }

  const client = await clerkClient()
  await client.users.deleteUser(user.clerkId)
  await prisma.user.delete({ where: { id } })

  return Response.json({ ok: true })
}

export async function PATCH(_req: NextRequest, ctx: RouteContext<'/api/admin/clerks/[id]'>) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const { allowedLocations } = await _req.json()

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user || user.role !== 'CLERK') {
    return Response.json({ error: 'Clerk not found' }, { status: 404 })
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { allowedLocations: allowedLocations ?? [] },
    select: { id: true, clerkId: true, email: true, name: true, allowedLocations: true, createdAt: true },
  })

  return Response.json(updated)
}
