// Replaced by Clerk authentication — see /admin/login
export async function POST() {
  return Response.json({ error: 'Use Clerk sign-in' }, { status: 410 })
}
