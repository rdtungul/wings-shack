// Replaced by Clerk — signOut() is called client-side via useClerk()
export async function POST() {
  return Response.json({ error: 'Use Clerk sign-out' }, { status: 410 })
}
