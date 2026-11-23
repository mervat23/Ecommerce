"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import Style from "./MainSlider.module.css";

import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "bg-purple-50 text-purple-500",
  },
];

const slides = [
  {
    id: 1,
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    button1: "Order Now",
    button2: "Delivery Info",
  },
  {
    id: 2,
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    button1: "Shop Now",
    button2: "view details",
  },
  {
    id: 3,
    title: "Premium Quality Guaranteed",
    description: "fresh from farm to your table",
    button1: "Shop Now",
    button2: "Learn More",
  },
];

const MainSlider = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="w-full">

      {/* Slider */}
      <div className="relative">

       <Swiper
  spaceBetween={0}
  slidesPerView={1}
  loop={true}
  onSwiper={setSwiper}
  onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id}>
      <div className={`h-[400px] relative ${Style.test}`}>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-green-600/75"></div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="px-8 md:px-16 text-white">

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {slide.title}
            </h1>

            <p className="text-base font-medium mb-5">
              {slide.description}
            </p>

            <div className="flex gap-2">
              <Link
                href="/products"
                className="bg-white text-purple-600 px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                {slide.button1}
              </Link>

              <Link
                href="/delivery"
                className="border-2 border-white text-white px-5 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition"
              >
                {slide.button2}
              </Link>
            </div>

          </div>
        </div>

      </div>
    </SwiperSlide>
  ))}
</Swiper>

        {/* Previous Button */}
        <button
          onClick={() => swiper?.slidePrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={() => swiper?.slideNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => swiper?.slideToLoop(index)}
              className={`h-3 rounded-full transition-all ${
                activeSlide === index
                  ? "w-8 bg-white"
                  : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Features */}
      <section className="bg-gray-50 py-8 px-5 md:px-10">

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${feature.color}`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

    </div>
  );
};

export default MainSlider;
