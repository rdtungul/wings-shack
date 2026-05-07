import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const archived = new URL(req.url).searchParams.get('archived') === 'true'

  const applications = await prisma.careerApplication.findMany({
    where: {
      archived,
      ...(session.role === 'CLERK' ? { location: { in: session.allowedLocations } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(applications)
}
