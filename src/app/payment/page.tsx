"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cartContext } from "@/Context/CartContext"
import { cashPaymentAction } from "@/PaymentAction/CashPayment"
import { onlinePaymentAction } from "@/PaymentAction/OnlinePayment"
import { CartProduct } from "@/types/cart.t"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useRef, useState } from "react"
import { toast } from "sonner"

const Payment = () => {
  const {
    cartId,
    afterPayment,
    products,
    totalCartPrice,
  } = useContext<any>(cartContext)

  const router = useRouter()

  const details = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)
  const city = useRef<HTMLInputElement>(null)

  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isLoading, setIsLoading] = useState(false)

  const totalItems = products.reduce(
    (total: number, item: CartProduct) => total + item.count,
    0
  )

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const address = details.current?.value.trim()
    const phoneNumber = phone.current?.value.trim()
    const cityName = city.current?.value.trim()

    if (!address || !phoneNumber || !cityName) {
      toast.error("Please fill in all shipping information")
      return
    }

    if (!/^01[0125][0-9]{8}$/.test(phoneNumber)) {
      toast.error("Please enter a valid Egyptian phone number")
      return
    }

    const value = {
      shippingAddress: {
        details: address,
        phone: phoneNumber,
        city: cityName,
      },
    }

    setIsLoading(true)

    try {
      if (paymentMethod === "cash") {
        await cashPaymentAction(cartId, value)

        afterPayment()
        toast.success("Order placed successfully")
        router.push("/allOrders")
      } else {
        const data = await onlinePaymentAction(cartId, value)

        if (data.status === "success" && data.session?.url) {
          window.location.href = data.session.url
        } else {
          toast.error("Unable to start online payment")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-green-600">Cart</Link>
          <span>/</span>
          <span className="text-green-600">Checkout</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Complete Your Order
          </h1>
          <p className="text-gray-500">
            Review your items and complete your purchase
          </p>

          <Link
            href="/cart"
            className="mt-4 inline-block text-sm font-semibold text-green-600 hover:underline"
          >
            ← Back to Cart
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">Your cart is empty</h2>
            <Link href="/" className="text-green-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePayment}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

              {/* Left Side */}
              <div className="space-y-6 lg:col-span-2">

                {/* Shipping Address */}
                <section className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                    Shipping Address
                  </h2>

                  <p className="mb-6 text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>

                  <div className="mb-5 rounded-lg bg-green-50 p-4">
                    <h3 className="mb-1 font-semibold text-gray-800">
                      Delivery Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>

                  <div className="mb-5">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      ref={city}
                      id="city"
                      placeholder="Enter your city"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <Label htmlFor="details">Street Address *</Label>
                    <Input
                      ref={details}
                      id="details"
                      placeholder="Enter your street address"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      ref={phone}
                      id="phone"
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className="mt-2"
                      required
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Egyptian numbers only
                    </p>
                  </div>
                </section>

                {/* Payment Method */}
                <section className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                    Payment Method
                  </h2>

                  <p className="mb-6 text-sm text-gray-500">
                    Choose how you'd like to pay
                  </p>

                  {/* Cash */}
                  <label
                    className={`mb-4 flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
                      paymentMethod === "cash"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="mt-1 accent-green-600"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Cash on Delivery
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                  </label>

                  {/* Online */}
                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
                      paymentMethod === "online"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="mt-1 accent-green-600"
                    />

                    <div className="w-full">
                      <h3 className="font-semibold text-gray-800">
                        Pay Online
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <Image
                          src="https://img.icons8.com/color/48/visa.png"
                          alt="Visa"
                          width={40}
                          height={30}
                        />
                        <Image
                          src="https://img.icons8.com/color/48/mastercard.png"
                          alt="Mastercard"
                          width={40}
                          height={30}
                        />
                        <Image
                          src="https://img.icons8.com/color/48/amex.png"
                          alt="Amex"
                          width={40}
                          height={30}
                        />
                      </div>
                    </div>
                  </label>

                  <div className="mt-5 rounded-lg bg-blue-50 p-4">
                    <h3 className="font-semibold text-gray-800">
                      Secure & Encrypted
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </section>
              </div>

              {/* Right Side - Order Summary */}
              <aside className="lg:col-span-1">
                <div className="rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-5">

                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                    Order Summary
                  </h2>

                  <p className="mb-6 text-sm text-gray-500">
                    {totalItems} items
                  </p>

                  {/* Products */}
                  <div className="space-y-5">
                    {products.map((item: CartProduct) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
                            {item.product.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-gray-800">
                          {(item.price * item.count).toLocaleString()} EGP
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="my-6" />

                  {/* Totals */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>{totalCartPrice.toLocaleString()} EGP</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600">
                        FREE
                      </span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>
                        {totalCartPrice.toLocaleString()} EGP
                      </span>
                    </div>
                  </div>

                  {/* Place Order */}
                  <Button
                    type="submit"
                    className="mt-6 w-full bg-green-600 py-6 text-base font-semibold text-white hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>

                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg">🔒</p>
                      <p className="text-xs text-gray-500">Secure</p>
                    </div>

                    <div>
                      <p className="text-lg">🚚</p>
                      <p className="text-xs text-gray-500">Fast Delivery</p>
                    </div>

                    <div>
                      <p className="text-lg">↩️</p>
                      <p className="text-xs text-gray-500">Easy Returns</p>
                    </div>
                  </div>
                </div>
              </aside>

            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Payment

