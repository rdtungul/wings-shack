import { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

// Resolves a username to the user's primary email so Clerk can authenticate them.
// Email is always a valid sign-in identifier; username requires a Clerk dashboard setting.
export async function POST(req: NextRequest) {
  const { identifier } = await req.json()
  if (!identifier) return Response.json({ identifier }, { status: 200 })

  // If it already looks like an email, pass it through unchanged
  if (identifier.includes('@')) return Response.json({ identifier })

  try {
    const client = await clerkClient()
    const results = await client.users.getUserList({ username: [identifier] })
    const user = results.data[0]
    const email = user?.emailAddresses?.[0]?.emailAddress
    return Response.json({ identifier: email ?? identifier })
  } catch {
    return Response.json({ identifier })
  }
}
