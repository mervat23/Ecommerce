"use client"

import { useState } from "react"
import { Mail, Leaf, Truck, Tag, ArrowRight, Smartphone, Star } from "lucide-react"
import { FaApple, FaGooglePlay } from "react-icons/fa"
import { toast } from "sonner"

const perks = [
  { icon: Leaf, label: "Fresh Picks Weekly" },
  { icon: Truck, label: "Free Delivery Codes" },
  { icon: Tag, label: "Members-Only Deals" },
]

const Newsletter = () => {
  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("Thanks for subscribing!")
    setEmail("")
  }

  return (
    <section className="w-[95%] lg:w-[90%] mx-auto my-16">
      <div className="rounded-[2.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_380px] gap-10 items-center">
          {/* ===== Left: Newsletter ===== */}
          <div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white flex items-center justify-center shadow-md">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide text-green-700">
                  NEWSLETTER
                </p>
                <p className="text-xs text-slate-500">50,000+ subscribers</p>
              </div>
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Get the Freshest Updates
              <span className="block text-green-600">Delivered Free</span>
            </h2>

            <p className="mt-4 text-slate-500 text-lg">
              Weekly recipes, seasonal offers &amp; exclusive member perks.
            </p>

            {/* Perks */}
            <div className="mt-6 flex flex-wrap gap-3">
              {perks.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white border border-emerald-100 rounded-full pl-2 pr-4 py-2 text-sm text-slate-700 shadow-sm"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Icon size={15} />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-white border-2 border-emerald-100 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition text-slate-700 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold rounded-2xl px-8 py-4 shadow-lg shadow-green-600/20 transition"
              >
                Subscribe
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-400">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          <div className="hidden lg:block w-px h-full bg-emerald-100" />

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-7 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 text-xs font-semibold px-3 py-1">
              <Smartphone size={12} />
              MOBILE APP
            </span>

            <h3 className="mt-5 text-2xl font-bold">Shop Faster on Our App</h3>
            <p className="mt-3 text-sm text-slate-400">
              Get app-exclusive deals &amp; 15% off your first order.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center gap-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition px-5 py-3"
              >
                <FaApple size={24} />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase text-slate-400">
                    Download on
                  </p>
                  <p className="font-semibold">App Store</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition px-5 py-3"
              >
                <FaGooglePlay size={22} />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase text-slate-400">
                    Get it on
                  </p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <span className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} fill="currentColor" />
                ))}
              </span>
              4.9 · 100K+ downloads
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter