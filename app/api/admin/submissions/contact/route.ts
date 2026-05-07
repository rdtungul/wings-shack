import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const archived = new URL(req.url).searchParams.get('archived') === 'true'

  const submissions = await prisma.contactSubmission.findMany({
    where: { archived },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(submissions)
}
