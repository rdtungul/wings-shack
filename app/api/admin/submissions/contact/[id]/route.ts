import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, ctx: RouteContext<'/api/admin/submissions/contact/[id]'>) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const { archived } = await req.json()

  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { archived },
  })

  return Response.json(updated)
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/admin/submissions/contact/[id]'>) {
  const session = await getSession()
  if (!session || session.role !== 'MASTERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  await prisma.contactSubmission.delete({ where: { id } })

  return Response.json({ ok: true })
}
