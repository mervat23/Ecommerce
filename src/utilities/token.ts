
"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth"

export async function getMyToken() {
  const session = await getServerSession(authOptions)

  console.log("SERVER SESSION CHECK:", {
    hasSession: !!session,
    hasUser: !!session?.user,
    hasToken: !!session?.token,
  })

  if (!session?.token) {
    throw new Error("Login First - Server session has no token")
  }

  return session.token as string
}
