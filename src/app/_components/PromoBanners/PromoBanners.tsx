import Link from "next/link"
import { ArrowRight, Flame, Sparkles } from "lucide-react"

const banners = [
  {
    badge: "Deal of the Day",
    badgeIcon: Flame,
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    button: "Shop Now",
    gradient: "from-emerald-500 to-green-700",
    buttonText: "text-green-700",
  },
  {
    badge: "New Arrivals",
    badgeIcon: Sparkles,
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    button: "Explore Now",
    gradient: "from-orange-500 to-rose-500",
    buttonText: "text-orange-600",
  },
]

const PromoBanners = () => {
  return (
    <section className="w-[95%] lg:w-[90%] mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map(
          ({
            badge,
            badgeIcon: BadgeIcon,
            title,
            description,
            discount,
            code,
            button,
            gradient,
            buttonText,
          }) => (
            <div
              key={title}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 text-white`}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                  <BadgeIcon size={14} />
                  {badge}
                </span>

                <h3 className="mt-4 text-3xl font-bold">{title}</h3>
                <p className="mt-2 text-white/90">{description}</p>

                <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold">{discount}</span>
                  <span className="text-sm text-white/90">
                    Use code: <b className="text-white">{code}</b>
                  </span>
                </div>

                <Link
                  href="/"
                  className={`mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold ${buttonText} hover:bg-white/90 hover:gap-3 transition-all`}
                >
                  {button}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default PromoBanners