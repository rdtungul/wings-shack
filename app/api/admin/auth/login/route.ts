import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken, cookieOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return Response.json({ error: 'Username and password are required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signToken({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  })

  const opts = cookieOptions()
  const res = Response.json({ ok: true, role: user.role })
  res.headers.set(
    'Set-Cookie',
    `${opts.name}=${token}; HttpOnly; Path=${opts.path}; Max-Age=${opts.maxAge}; SameSite=${opts.sameSite}${opts.secure ? '; Secure' : ''}`,
  )
  return res
}
