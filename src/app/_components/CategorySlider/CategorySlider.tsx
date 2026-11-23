import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/types/category.t"

const CategorySlider = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="w-[95%] lg:w-[90%] mx-auto my-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-800">
          <span className="w-1 h-9 rounded-full bg-green-600" />
          <span>
            Shop By <span className="text-green-600">Category</span>
          </span>
        </h2>

        <Link
          href="/categories"
          className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:gap-3 transition-all"
        >
          View All Categories
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/?category=${category._id}`}
            className="group bg-white rounded-lg shadow-sm border border-gray-100 py-4 px-2 flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={category.image}
                alt={category.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-3 text-slate-700 text-center group-hover:text-green-600 transition">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategorySlider