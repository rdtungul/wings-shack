import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(submissions)
}
