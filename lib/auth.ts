import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-secret-change-me')
const COOKIE = 'ws_admin_token'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export type JwtPayload = {
  id: string
  username: string
  name: string
  role: 'MASTERADMIN' | 'CLERK'
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as JwtPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<JwtPayload | null> {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export function cookieOptions(maxAge = MAX_AGE) {
  return {
    name: COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  }
}
