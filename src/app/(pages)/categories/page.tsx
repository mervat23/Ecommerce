import Image from "next/image"
import Link from "next/link"
import { getAllCategories } from "@/apis/category"
import type { Category } from "@/types/category.t"
import { Layers } from "lucide-react";
export const instant = false

const CategoriesPage = async () => {
  const categories: Category[] = await getAllCategories()

  return (
      <>
      {/* Categories Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-600 to-green-400 py-14 md:py-16">
        <div className="w-[95%] lg:w-[90%] mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>

            <span>/</span>

            <span className="text-white font-semibold">
              Categories
            </span>
          </div>

          {/* Heading */}
          <div className="flex items-center gap-5">

            {/* Icon */}
            <div className="w-16 h-16 md:w-[66px] md:h-[66px] bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Layers size={32} className="text-white" />
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                All Categories
              </h1>

              <p className="text-white/90 text-sm md:text-base">
                Browse our wide range of product categories
              </p>
            </div>

          </div>
        </div>
      </section>

    <main className="w-[95%] lg:w-[90%] mx-auto my-12">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {categories.map((category) => (
  
          <Link
  key={category._id}
  href={`/?category=${category._id}`}
  className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[280px]"
>
  {/* Square Image */}
  <div className="w-full aspect-square overflow-hidden bg-gray-100 rounded-lg">
    <Image
      src={category.image}
      alt={category.name}
      width={300}
      height={300}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Category Name */}
  <p className="mt-4 text-slate-700 text-center font-medium group-hover:text-green-600 transition">
    {category.name}
  </p>
</Link>
        ))}
      </div>

    </main>
    </>
  )
}

export default CategoriesPage

