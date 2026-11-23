import { getAllBrands } from "@/apis/brand"
import type { Brand } from "@/types/product.t"
import Image from "next/image"
import Link from "next/link"
import { Tags } from "lucide-react"
export const instant = false

const Brands = async () => {
  const brands: Brand[] = await getAllBrands()

  return (
    <>
      {/* Header */}
      <section className="w-full min-h-[224px] bg-gradient-to-r from-purple-600 to-purple-400 text-white">
        <div className="max-w-[1250px] mx-auto px-5 py-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm mb-7">
            <Link href="/" className="hover:text-purple-100">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold">Brands</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-5">
            <div className="w-[66px] h-[66px] rounded-2xl bg-white/20 flex items-center justify-center shadow-md">
              <Tags size={36} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                Top Brands
              </h1>
              <p className="text-base md:text-lg">
                Shop from your favorite brands
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Brands */}
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

          {brands.map((brand) => (
            <Link
              href={`/brands/${brand._id}`}
              key={brand._id}
              className="border rounded-lg p-4 flex flex-col items-center gap-3 hover:shadow-lg transition"
            >
              <div className="relative w-full h-32">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>

              <h2 className="font-semibold text-center">
                {brand.name}
              </h2>
            </Link>
          ))}

        </div>
      </div>
    </>
  )
}

export default Brands

