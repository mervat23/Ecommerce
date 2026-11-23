// "use server"
// import { cookies } from "next/headers";
// import { decode } from "next-auth/jwt";

// export async function getMyToken(){
//   const x=(await cookies()).get("next-auth.session-token")?.value

//   const token=await decode({
//     token:x,
//     secret:process.env.AUTH_SECRET!
//   })

//    return token?.token
// }


"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"

export async function getMyToken() {
  const session = await getServerSession(authOptions)

  if (!session?.token) {
    throw new Error("Login First")
  }

  return session.token as string
}
