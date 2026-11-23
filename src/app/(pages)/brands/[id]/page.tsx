import { getSingleBrand } from "@/apis/brand"
import { getProductsByBrand } from "@/apis/product"
import type { Brand, Product } from "@/types/product.t"
import Image from "next/image"
import HomeCard from "@/app/_components/HomeCard/HomeCard"
import Link from "next/link"
import { Filter, Tag, X } from "lucide-react"
export const instant = false

type Props = {
  params: Promise<{ id: string }>
}

const BrandDetails = async ({ params }: Props) => {
  const { id } = await params

  const [brand, products]: [Brand, Product[]] = await Promise.all([
    getSingleBrand(id),
    getProductsByBrand(id)
  ])

  
  return (
  <>
    {/* Brand Header */}
    <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400">
      <div className="max-w-7xl mx-auto px-5 py-14">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-sm text-white/80 mb-7">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/brands">Brands</Link>
          <span>/</span>
          <span className="text-white font-semibold">
            {brand.name}
          </span>
        </div>

        {/* Brand Info */}
        <div className="flex items-center gap-5">

          <div className="relative w-16 h-16 bg-white/20 rounded-2xl p-3 shadow-lg">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain p-2"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              {brand.name}
            </h1>

            <p className="text-white mt-1">
              Shop {brand.name} products
            </p>
          </div>

        </div>
      </div>
    </div>
    <div className="w-full px-5 py-7">
  <div className="flex items-center justify-start gap-3 flex-wrap text-sm">

    <span className="flex items-center gap-2 text-gray-600">
      <Filter size={16} />
      Active Filters:
    </span>

    <div className="flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2">
      <Tag size={14} />
      <span>{brand.name}</span>

      <button aria-label="Remove filter">
        <X size={16} />
      </button>
    </div>

    <Link
      href="/products"
      className="text-gray-600 underline"
    >
      Clear all
    </Link>

  </div>
</div>

    {/* Products */}
    <div className="max-w-7xl mx-auto px-5 pb-10">

      <h2 className="text-xl  font-semibold mb-5 text-gray-500">
        Showing {products.length} products
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          {products.map((product) => (
            <HomeCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p>No products found for this brand.</p>
      )}

    </div>
  </>
)
}

export default BrandDetails
