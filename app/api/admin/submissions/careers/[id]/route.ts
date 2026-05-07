import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, ctx: RouteContext<'/api/admin/submissions/careers/[id]'>) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await ctx.params
  const { archived } = await req.json()

  // CLERKs may only archive applications for their allowed locations
  if (session.role === 'CLERK') {
    const app = await prisma.careerApplication.findUnique({ where: { id } })
    if (!app || !session.allowedLocations.includes(app.location ?? '')) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const updated = await prisma.careerApplication.update({
    where: { id },
    data: { archived },
  })

  return Response.json(updated)
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/admin/submissions/careers/[id]'>) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  await prisma.careerApplication.delete({ where: { id } })

  return Response.json({ ok: true })
}
