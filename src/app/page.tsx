import {
  getAllProducts,
  getProductsByCategory
} from "../apis/product";

import {
  getSingleCategory
} from "../apis/category";

import type { Product } from "@/types/product.t";
import type { Category } from "@/types/category.t";

import HomeCard from "./_components/HomeCard/HomeCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import Categories from "./_components/Categories/Categories";
import Newsletter from "./_components/Newsletter/Newsletter";
import PromoBanners from "./_components/PromoBanners/PromoBanners";

import Image from "next/image";
import Link from "next/link";
import { Filter, Tag, X, PackageOpen } from "lucide-react";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

const Products = async ({ searchParams }: Props) => {
  const { category } = await searchParams;

  const [data, categoryDetails]: [Product[], Category | null] =
    category
      ? await Promise.all([
          getProductsByCategory(category),
          getSingleCategory(category)
        ])
      : [await getAllProducts(), null];

  return (
    <>
      {!category ? (
        <>
          <MainSlider />
          <Categories />
          <PromoBanners />
        </>
      ) : (
        <>
          {/* Category Header */}
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400">
            <div className="max-w-7xl mx-auto px-5 py-14">

              {/* Breadcrumbs */}
              <div className="flex items-center gap-3 text-sm text-white/80 mb-7">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/categories">Categories</Link>
                <span>/</span>
                <span className="text-white font-semibold">
                  {categoryDetails?.name || "Category"}
                </span>
              </div>

              {/* Category Info */}
              <div className="flex items-center gap-5">

                <div className="relative w-16 h-16 bg-white/20 rounded-2xl p-3 shadow-lg">
                  {categoryDetails?.image && (
                    <Image
                      src={categoryDetails.image}
                      alt={categoryDetails.name}
                      fill
                      className="object-contain p-2"
                    />
                  )}
                </div>

                <div>
                  <h1 className="text-4xl font-bold text-white">
                    {categoryDetails?.name || "Category Products"}
                  </h1>

                  <p className="text-white mt-1">
                    Browse products in {categoryDetails?.name}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="w-full px-5 py-7">
            <div className="flex items-center justify-start gap-3 flex-wrap text-sm">

              <span className="flex items-center gap-2 text-gray-600">
                <Filter size={16} />
                Active Filters:
              </span>

              <div className="flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2">
                <Tag size={14} />

                <span>{categoryDetails?.name || "Category"}</span>

                <Link href="/" aria-label="Remove filter">
                  <X size={16} />
                </Link>
              </div>

              <Link
                href="/"
                className="text-gray-600 underline"
              >
                Clear all
              </Link>

            </div>
          </div>
        </>
      )}

  
{category && (!data || data.length === 0) ? (

  /* Empty State */
  <section className="min-h-[60vh] flex items-center justify-center px-5">
    <div className="flex flex-col items-center text-center">

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <PackageOpen size={32} className="text-gray-400" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        No Products Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 mb-7">
        No products match your current filters.
      </p>

     
      <Link
        href="/shop"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        View All Products
      </Link>

    </div>
  </section>

) : (

  /* Products Grid */
  <div className="my-10">

    <div className="flex ms-10 mb-5">
      <div className="w-1.5 h-9 bg-green-600 rounded-full"></div>

      <h1 className="text-3xl text-green-700 mb-5 ms-10">
        {category ? "Category Products" : "Featured Products"}
      </h1>
    </div>

    <div className="w-full md:w-[90%] mx-auto px-5">

      <h2 className="text-xl font-semibold mb-5 text-gray-500">
        Showing {data?.length || 0} products
      </h2>

      <div className="bg-green-100 grid grid-cols-12 gap-3">
        {data?.map((product: Product) => (
          <HomeCard
            product={product}
            key={product._id}
          />
        ))}
      </div>

    </div>
  </div>

)}

      {!category && <Newsletter />}
    </>
  );
};

export default Products;


