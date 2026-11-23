"use client"

import Loading from "../../loading"
import { cartContext } from "@/Context/CartContext"
import { CartProduct } from "@/types/cart.t"
import { Button } from "@base-ui/react/button"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  PackageOpen,
  ArrowRight,
} from "lucide-react";

const Cart = () => {
  const {
    totalCartPrice,
    products,
    isLoading,
    deleteCartItem,
    updateCartCount,
  } = useContext<any>(cartContext)

  const shipping = totalCartPrice >= 500 ? 0 : 50
  const total = totalCartPrice + shipping
  const remaining = Math.max(0, 500 - totalCartPrice)

  const totalItems = products.reduce(
    (total: number, product: CartProduct) => total + product.count,
    0
  )

  if (isLoading) return <Loading />

 return (
    <div className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="max-w-[1250px] mx-auto">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Shopping Cart</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-100 p-3 rounded-xl">
            <ShoppingCart className="text-green-600" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
           <p className="text-gray-500 mt-1">
  You have {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
</p>
          </div>
        </div>

        {products.length === 0 ? (
  <div className="bg-white min-h-[500px] flex flex-col items-center text-center px-5 py-10">

    {/* Cart Icon */}
    <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center mb-8">
      <PackageOpen size={50} className="text-gray-300" />
    </div>

    {/* Empty Cart Message */}
    <h2 className="text-2xl font-bold text-gray-900 mb-3">
      Your cart is empty
    </h2>

    <p className="text-gray-500 leading-relaxed mb-9">
      Looks like you haven't added anything to your cart yet.
      <br />
      Start exploring our products!
    </p>

    {/* Start Shopping Button */}
    <Link
      href="/"
      className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg shadow-green-100"
    >
      Start Shopping
      <ArrowRight size={20} />
    </Link>

    {/* Popular Categories */}
    <div className="w-full max-w-md border-t border-gray-100 mt-12 pt-8">
      <p className="text-gray-400 mb-5">
        Popular Categories
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {["Electronics", "Fashion", "Home", "Beauty"].map((category) => (
          <Link
            key={category}
            href="/categories"
            className="bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-700 px-4 py-2 rounded-full text-sm transition"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>

  </div>
) : (
 
// )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Products - Left Side */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {products.map((product: CartProduct) => (
                <div
                  key={product.product.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-5"
                >

                  {/* Product Image */}
                  <div className="relative w-full sm:w-36 h-40 sm:h-36 shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={product.product.imageCover}
                      alt={product.product.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 640px) 100vw, 144px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <p className="text-sm text-green-600 font-medium mb-2">
                        {product.product.category?.name}
                      </p>

                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {product.product.title}
                      </h3>

                      <p className="text-green-600 font-bold text-xl">
                        {product.price} EGP
                      </p>
                    </div>

                    {/* Quantity and Delete */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                      <div className="flex items-center border bg-gray-100 border-gray-200 rounded-lg overflow-hidden">

                        <button
                          type="button"
                          onClick={() =>
                            product.count > 1 &&
                            updateCartCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          disabled={product.count <= 1}
                          className="p-2 bg-white hover:bg-gray-100 disabled:opacity-40"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="px-4 font-semibold">
                          {product.count}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="p-2 text-white bg-green-600 hover:bg-green-800"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      <div className="flex items-center gap-4">

                        <p className="font-bold text-gray-800">
                          {(product.price * product.count).toFixed(2)} EGP
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            deleteCartItem(product.product.id)
                          }
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                          title="Remove product"
                        >
                          <Trash2 size={19} />
                        </button>
                    

                      </div>

                    </div>
                   
                  </div>

                </div>
              ))}

{/* Cart Actions */}
<div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-2">

  {/* Continue Shopping */}
  <Link
    href="/"
    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
  >
    <span>←</span>
    Continue Shopping
  </Link>

  {/* Clear All Items */}
  <button
    type="button"
    onClick={async () => {
      for (const product of products) {
        await deleteCartItem(product.product.id)
      }
    }}
    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
  >
    <Trash2 size={16} />
    <span>Clear all items</span>
  </button>

</div>

            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1 w-full">

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-5">

                <h2 className="text-2xl font-bold mb-2">
                  Order Summary
                </h2>

                <p className="text-gray-500 mb-6">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                </p>

                {/* Free Shipping */}
                {remaining > 0 ? (
                  <div className="bg-green-50 text-green-700 p-3 rounded-md mb-6 text-sm">
                    Add {remaining} EGP for free shipping
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-700 p-3 rounded-md mb-6 text-sm">
                    Congratulations! You get free shipping.
                  </div>
                )}

                {/* Price Details */}
                <div className="space-y-4 border-b pb-5">

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{totalCartPrice} EGP</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `${shipping} EGP`}
                    </span>
                  </div>

                </div>

                {/* Total */}
                <div className="flex justify-between font-bold text-lg py-5">
                  <span>Total</span>
                  <span className="text-green-600">
                    {total} EGP
                  </span>
                </div>

                {/* Promo Code */}
                <div className="mb-5">
                  <label className="block font-medium mb-2">
                    Apply Promo Code
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="min-w-0 w-full border rounded-md px-3 py-2 outline-none focus:border-green-500"
                    />

                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-md">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Checkout */}
                <Link
                  href="/payment"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
                >
                  Secure Checkout
                </Link>

                {/* Benefits */}
                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <p>🔒 Secure Payment</p>
                  <p>🚚 Fast Delivery</p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Cart