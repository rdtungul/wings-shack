import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(_req: Request, ctx: RouteContext<'/api/admin/clerks/[id]/sign-in-token'>) {
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
  const signInToken = await client.signInTokens.createSignInToken({
    userId: user.clerkId,
    expiresInSeconds: 86400, // 24 hours
  })

  return Response.json({ token: signInToken.token })
}
