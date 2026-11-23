"use client"

import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { wishlistContext } from "@/Context/WishlistContext"
import { cartContext } from "@/Context/CartContext"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import Loading from "@/app/loading"
import { Heart, ArrowRight } from "lucide-react";

const Wishlist = () => {
  const { wishlist, isLoading, removeFromWishlist } =
    useContext(wishlistContext)

  const { addProductCart } = useContext<any>(cartContext)

  async function handleAddToCart(id: string) {
    try {
      const data = await addProductCart(id)

      if (data?.status === "success") {
        toast.success("Product added to cart")
      } else {
        toast.error("Failed to add product to cart")
      }
    } catch {
      toast.error("Failed to add product to cart")
    }
  }

  async function handleRemove(id: string) {
    try {
      await removeFromWishlist(id)
      toast.success("Product removed from Wishlist")
    } catch {
      toast.error("Failed to remove product")
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Wishlist</span>
      </div>

      {/* Wishlist Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          My Wishlist
        </h1>

        <p className="text-gray-500">
          {wishlist.length} items saved
        </p>
      </div>

     {wishlist.length === 0 ? (
  <div className="min-h-[500px] bg-[#fbfcfe] flex flex-col items-center text-center px-5 pt-20">

    {/* Heart Icon */}
    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
      <Heart
        size={32}
        className="text-gray-400"
        strokeWidth={2}
      />
    </div>

    {/* Empty Wishlist Message */}
    <h2 className="text-xl font-bold text-gray-900 mb-2">
      Your wishlist is empty
    </h2>

    <p className="text-sm text-gray-500 mb-6">
      Browse products and save your favorites here.
    </p>

    {/* Browse Products Button */}
    <Link
      href="/shop"
      className="w-full max-w-sm h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition"
    >
      Browse Products
      <ArrowRight size={19} />
    </Link>

  </div>
) : (

        <>
          {/* Wishlist Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">

              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {wishlist.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50"
                  >

                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">

                        <Link href={`/productDetails/${product.id}`}>
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="w-20 h-20 object-contain"
                          />
                        </Link>

                        <div>
                          <Link
                            href={`/productDetails/${product.id}`}
                            className="font-semibold hover:text-green-600"
                          >
                            {product.title}
                          </Link>

                          <p className="text-sm text-gray-500 mt-1">
                            {product.category.name}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-semibold">
                      {product.price} EGP
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {product.quantity > 0 ? (
                        <span className="text-green-600 font-medium">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        <Button
                          size="sm"
                          disabled={product.quantity <= 0}
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Add to Cart
                        </Button>

                        <button
                          onClick={() => handleRemove(product.id)}
                          title="Remove from Wishlist"
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={20} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Link
              href="/"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
         
        </>
      )}

    </div>
  )
}

export default Wishlist
