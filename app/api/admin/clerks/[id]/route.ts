import { NextRequest } from 'next/server'
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

  await prisma.user.delete({ where: { id } })
  return Response.json({ ok: true })
}
