"use client"

import React, {
  createContext,
  useEffect,
  useState,
} from "react"

import { useSession } from "next-auth/react"
import type { Product } from "@/types/product.t"

import { addToWishlistAction } from "@/WishlistAction/addToWishlist"
import { getWishlistAction } from "@/WishlistAction/getWishlist"
import { removeFromWishlistAction } from "@/WishlistAction/removeFromWishlist"

type WishlistContextType = {
  wishlist: Product[]
  wishlistCount: number
  isLoading: boolean
  getWishlist: () => Promise<void>
  addToWishlist: (id: string) => Promise<any>
  removeFromWishlist: (id: string) => Promise<any>
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  wishlistCount: 0,
  isLoading: false,
  getWishlist: async () => {},
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
})

const WishlistContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { status } = useSession()

  async function getWishlist() {
    setIsLoading(true)

    try {
      const data = await getWishlistAction()
      setWishlist(data.data ?? [])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function addToWishlist(id: string) {
    try {
      const data = await addToWishlistAction(id)
      await getWishlist()
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      const data = await removeFromWishlistAction(id)
      await getWishlist()
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getWishlist()
    }

    if (status === "unauthenticated") {
      setWishlist([])
    }
  }, [status])

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isLoading,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  )
}

export default WishlistContextProvider
