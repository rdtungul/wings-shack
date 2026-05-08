import { auth, clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  let user = await prisma.user.findUnique({ where: { clerkId: userId } })

  if (!user) {
    const client = await clerkClient()
    const clerkUser = await client.users.getUser(userId)
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? null
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'Admin'

    // First-ever user becomes MASTERADMIN; all subsequent ones become CLERK
    const masterCount = await prisma.user.count({ where: { role: 'MASTERADMIN' } })
    const role = masterCount === 0 ? 'MASTERADMIN' : 'CLERK'

    user = await prisma.user.create({
      data: { clerkId: userId, name, email, username: clerkUser.username ?? null, role, allowedLocations: [] },
    })
  }

  return Response.json(user)
}
