import { auth, clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  let user = await prisma.user.findUnique({ where: { clerkId: userId } })

  if (!user) {
    // Auto-promote the very first Clerk user as MASTERADMIN
    const masterCount = await prisma.user.count({ where: { role: 'MASTERADMIN' } })
    if (masterCount > 0) {
      return Response.json({ error: 'Not provisioned' }, { status: 403 })
    }
    const client = await clerkClient()
    const clerkUser = await client.users.getUser(userId)
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? null
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'Master Admin'

    user = await prisma.user.create({
      data: { clerkId: userId, name, email, role: 'MASTERADMIN', allowedLocations: [] },
    })
  }

  return Response.json(user)
}
