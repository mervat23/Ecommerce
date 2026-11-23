import Link from "next/link"
import { PackageOpen } from "lucide-react"

import { getAllProducts } from "@/apis/product"
import { Product } from "@/types/product.t"
import HomeCard from "../../_components/HomeCard/HomeCard"
export const instant = false

const Shop = async () => {
  const data: Product[] = await getAllProducts()

  return (
    <>
     
      <section className="w-full min-h-[224px] bg-gradient-to-r from-green-600 to-green-400 text-white">
        <div className="max-w-[1250px] mx-auto px-5 py-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm mb-7">
            <Link href="/" className="hover:text-green-100">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold">All Products</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-5">
            <div className="w-[66px] h-[66px] rounded-2xl bg-white/20 flex items-center justify-center shadow-md">
              <PackageOpen size={36} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                All Products
              </h1>
              <p className="text-base md:text-lg">
                Explore our complete product collection
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Products */}
      <div className="my-10">
        <div className="w-full md:w-[90%] mx-auto px-5">

          <p className="mb-5 text-gray-500">
            Showing {data?.length ?? 0} products
          </p>

          <div className="bg-green-100 grid grid-cols-12 gap-3">
            {data?.map((product: Product) => (
              <HomeCard product={product} key={product._id} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Shop
