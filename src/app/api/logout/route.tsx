import { cookies } from "next/headers"

export async function POST() {
  const cookiesStore = await cookies()
  cookiesStore.delete('session')
  return Response.json({ message: 'Logged out' })
}