"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function onlinePaymentAction(cartId: string, value: object) {
  const token = await getMyToken()

  if (!token) {
    throw new Error("Login First")
  }

  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000"

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(baseUrl)}`,
    value,
    {
      headers: {
        token: token as string,
      },
    }
  )

  return data
}

