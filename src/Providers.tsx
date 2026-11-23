"use client"

import { SessionProvider } from "next-auth/react"
import CartContextProvider from "./Context/CartContext"
import WishlistContextProvider from "./Context/WishlistContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          {children}
        </WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  )
}

export default Providers

