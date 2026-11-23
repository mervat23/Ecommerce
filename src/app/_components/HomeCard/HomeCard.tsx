"use client"

import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { Heart, RefreshCw, Eye } from "lucide-react"
import { IoIosStar, IoIosStarOutline } from "react-icons/io"
import { toast } from "sonner"

import type { Product } from "@/types/product.t"
import CartBtn from "../CartBtn/CartBtn"
import { wishlistContext } from "@/Context/WishlistContext"

const HomeCard = ({ product }: { product: Product }) => {
  const { wishlist, addToWishlist } = useContext(wishlistContext)

  const isFavorite = wishlist.some(
    (item) => item._id === product._id || item.id === product.id
  )

  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price
  const finalPrice = hasDiscount ? product.priceAfterDiscount! : product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - finalPrice) / product.price) * 100)
    : 0

  async function handleWishlist() {
    if (isFavorite) {
      toast.info("Product already exists in Wishlist")
      return
    }
    try {
      await addToWishlist(product.id)
      toast.success("Product added to Wishlist")
    } catch (error) {
      toast.error("Failed to add product to Wishlist")
    }
  }

  const iconBtn =
    "w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-slate-600 hover:text-green-600 transition"

  return (
    <div className="products col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <div className="group bg-white border border-gray-200 rounded-xl p-3 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Image area */}
        <div className="relative bg-[#e5e5e5] rounded-md overflow-hidden">
          {hasDiscount && (
            <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{discountPercent}%
            </span>
          )}

          {/* Action icons */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            <button
              onClick={handleWishlist}
              className={iconBtn}
              title="Add to Wishlist"
              aria-label="Add to Wishlist"
            >
              <Heart
                size={18}
                className={isFavorite ? "text-red-500 fill-red-500" : ""}
              />
            </button>

            <button className={iconBtn} title="Compare" aria-label="Compare">
              <RefreshCw size={18} />
            </button>

            <Link
              href={`/productDetails/${product.id}`}
              className={iconBtn}
              title="Quick view"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </Link>
          </div>

          <Link href={`/productDetails/${product.id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-[220px] object-contain mix-blend-multiply"
            />
          </Link>
        </div>

        {/* Info */}
        <div className="mt-4 flex-1 flex flex-col">
          <p className="text-xs text-slate-500">{product.category.name}</p>

          <Link href={`/productDetails/${product.id}`}>
            <h3 className="mt-1 text-base text-slate-800 line-clamp-2 min-h-[48px] hover:text-green-600 transition">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= Math.round(product.ratingsAverage) ? (
                  <IoIosStar key={star} size={18} />
                ) : (
                  <IoIosStarOutline key={star} size={18} />
                )
              )}
            </div>
            <span className="text-xs text-slate-500">
              {product.ratingsAverage} ({product.ratingsQuantity})
            </span>
          </div>

          {/* Price + Add to cart */}
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className={`font-bold text-lg ${
                  hasDiscount ? "text-green-600" : "text-slate-900"
                }`}
              >
                {finalPrice} EGP
              </span>

              {hasDiscount && (
                <span className="text-sm text-slate-500 line-through">
                  {product.price} EGP
                </span>
              )}
            </div>

            <CartBtn id={product.id}  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCard