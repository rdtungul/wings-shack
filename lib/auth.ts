import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export type AdminSession = {
  id: string
  clerkId: string
  name: string
  email: string | null
  role: 'MASTERADMIN' | 'CLERK'
  allowedLocations: string[]
}

export async function getSession(): Promise<AdminSession | null> {
  const { userId } = await auth()
  if (!userId) return null

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return null

  return user as AdminSession
}
