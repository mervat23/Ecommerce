"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Truck,
  Gift,
  Phone,
  Mail,
  User,
  LogOut,
  Headset,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  UserRound,
  Package,
  MapPin,
  Settings,
} from "lucide-react";


import logo from "../../../../public/images/logo.svg";

import { cartContext } from "@/Context/CartContext";
import { wishlistContext } from "@/Context/WishlistContext";

import { getAllCategories } from "@/apis/category";
import type { Category } from "@/types/category.t";

const Navbar = () => {
  const { data: session, status } = useSession();

  const { totalCartItem } = useContext(cartContext);
  const { wishlistCount } = useContext(wishlistContext);

  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const userName =
    session?.user?.name ||
    session?.user?.email?.split("@")[0] ||
    "Account";
    const userEmail = session?.user?.email || "";

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="w-full bg-white sticky top-0 z-40">

      {/* ================= TOP BAR - DESKTOP ================= */}
      <div className="hidden lg:block border-b border-gray-200">
        <div className="w-[95%] mx-auto flex justify-between items-center py-3 text-sm text-slate-600">

          {/* Left Side */}
          <div className="flex items-center gap-5">

            <span className="flex items-center gap-2">
              <Truck size={15} className="text-green-600" />
              Free Shipping on Orders 500 EGP
            </span>

            <span className="flex items-center gap-2">
              <Gift size={15} className="text-green-600" />
              New Arrivals Daily
            </span>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <span className="flex items-center gap-2">
              <Phone size={14} />
              +1 (800) 123-4567
            </span>

            <span className="flex items-center gap-2">
              <Mail size={14} />
              support@freshcart.com
            </span>

            <div className="border-l h-5 border-gray-200" />

            {status === "authenticated" && (
              <>
                <span className="flex items-center gap-2">
                  <User size={15} />
                  {userName}
                </span>

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-2 hover:text-green-600 transition"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </>
            )}

            {status === "unauthenticated" && (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 hover:text-green-600 transition"
                >
                  <User size={15} />
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-2 hover:text-green-600 transition"
                >
                  <User size={15} />
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="border-b border-gray-100">

        <div className="w-[95%] mx-auto py-3 lg:py-4 flex items-center justify-between gap-5">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={logo}
              alt="FreshCart Logo"
              priority
              className="w-[130px] lg:w-[155px] h-auto"
            />
          </Link>

          {/* Search - Desktop Only */}
          <form
            action="/"
            method="GET"
            className="hidden lg:block w-full max-w-[400px] relative"
          >
            <input
              type="search"
              name="search"
              placeholder="Search for products, brands and more..."
              className="w-full border border-gray-200 rounded-full py-3 px-5 pr-14 outline-none focus:border-green-500 transition text-sm"
            />

            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
            >
              <Search size={19} />
            </button>
          </form>

          {/* Navigation Links - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-5 text-slate-800">

            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>

            <Link href="/shop" className="hover:text-green-600 transition">
              Shop
            </Link>

<div className="relative z-50">

  <button
    onClick={() => setCategoriesOpen(!categoriesOpen)}
    className="flex items-center gap-1 hover:text-green-600 transition"
  >
    Categories

    <ChevronDown
      size={16}
      className={`transition-transform duration-200 ${
        categoriesOpen ? "rotate-180" : ""
      }`}
    />
  </button>


{/* Dropdown Menu */}
{categoriesOpen && (
<div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-xl py-3 border border-gray-100 overflow-hidden">
    {/* All Categories */}
    <button
      onClick={() => {
        router.push("/categories");
        setCategoriesOpen(false);
      }}
      className="w-full text-left px-6 py-3 text-slate-600 hover:text-green-600 hover:bg-green-50 transition"
    >
      All Categories
    </button>

    {/* Selected Categories */}
    {categories
      .filter((category) =>
        [
          "Electronics",
          "Women's Fashion",
          "Men's Fashion",
          "Beauty & Health",
        ].includes(category.name.trim())
      )
      .map((category) => (
        <button
          key={category._id}
          onClick={() => {
            router.push(`/?category=${category._id}`);
            setCategoriesOpen(false);
          }}
          className="w-full text-left px-6 py-3 text-slate-600 hover:text-green-600 hover:bg-green-50 transition"
        >
          {category.name}
        </button>
      ))}

  </div>
)}


</div>

            <Link
              href="/brands"
              className="hover:text-green-600 transition"
            >
              Brands
            </Link>

          
          </nav>

          {/* Icons & Authentication */}
          <div className="flex items-center justify-center gap-4 lg:gap-5">

            {/* Support - Large Desktop */}
            <div className="hidden xl:flex items-center gap-2 border-r pr-5 border-gray-200">

              <div className="bg-green-50 text-green-600 rounded-full p-3">
                <Headset size={19} />
              </div>

              <div className="text-xs">
                <p className="text-gray-500">Support</p>
                <p className="font-semibold">24/7 Help</p>
              </div>

            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative text-slate-500 hover:text-green-600 transition"
            >
              <Heart size={23} />

              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] h-5 min-w-5 flex items-center justify-center">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-slate-500 hover:text-green-600 transition"
            >
              <ShoppingCart size={24} />

              {totalCartItem > 0 && (
                <Badge className="absolute -top-2 -right-3 bg-green-600 text-white text-[10px] h-5 min-w-5 flex items-center justify-center">
                  {totalCartItem}
                </Badge>
              )}
            </Link>

            {/* Authentication - Desktop Only */}
            <div className="hidden lg:block">

              {status === "unauthenticated" && (
                <Link href="/login">
                  <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
                    <User size={17} className="mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}


<div className="relative">

  {/* User Icon */}
  <button
    onClick={() => setAccountOpen(!accountOpen)}
    className="flex items-center justify-center text-gray-600 hover:text-green-600 transition"
    aria-label="Open account menu"
  >
    <UserRound size={23} />
  </button>

  {/* Dropdown Menu */}
  {accountOpen && status === "authenticated" && (
    <div className="absolute right-0 top-12 w-[255px] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">

      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">

        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <UserRound size={22} className="text-green-600" />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {userName}
          </h3>

          <p className="text-xs text-gray-400 truncate">
            {userEmail}
          </p>
        </div>

      </div>

      {/* Menu Links */}
      <div className="py-2">

        <Link
          href="/Profile"
          onClick={() => setAccountOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <UserRound size={17} />
          <span>My Profile</span>
        </Link>

        <Link
          href="/allOrders"
          onClick={() => setAccountOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <Package size={17} />
          <span>My Orders</span>
        </Link>

        <Link
          href="/wishlist"
          onClick={() => setAccountOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <Heart size={17} />
          <span>My Wishlist</span>
        </Link>

        <Link
          href="/addresses"
          onClick={() => setAccountOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <MapPin size={17} />
          <span>Addresses</span>
        </Link>

        <Link
          href="/settings"
          onClick={() => setAccountOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
        >
          <Settings size={17} />
          <span>Settings</span>
        </Link>

      </div>

      {/* Sign Out */}
      <div className="border-t border-gray-100 p-2">

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>

      </div>

    </div>
  )}

</div>


            </div>

            {/* Menu Toggle - Mobile & Tablet Only */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <Menu size={20} />
            </button>

          </div>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={closeMenu}
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-xl z-50 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b">

          <Image
            src={logo}
            alt="FreshCart Logo"
            className="w-[140px] h-auto"
          />

          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <X size={20} />
          </button>

        </div>

        {/* Mobile Search */}
        <form
          action="/"
          method="GET"
          className="p-5 border-b relative"
        >
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-xl py-3 px-4 pr-14 text-sm outline-none focus:border-green-500"
          />

          <button
            type="submit"
            className="absolute right-7 top-1/2 -translate-y-1/2 bg-green-600 text-white rounded-lg w-9 h-9 flex items-center justify-center"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-5 gap-6 text-slate-800 border-b">

          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/shop" onClick={closeMenu}>
            Shop
          </Link>

          <Link href="/" onClick={closeMenu}>
            Categories
          </Link>

          <Link href="/brands" onClick={closeMenu}>
            Brands
          </Link>

        </nav>

        {/* Wishlist & Cart */}
        <div className="flex flex-col p-5 gap-5 border-b">

          <Link
            href="/wishlist"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <span className="bg-red-50 text-red-500 rounded-full p-3">
              <Heart size={18} />
            </span>
            Wishlist
            {wishlistCount > 0 && (
              <span className="text-sm text-red-500">
                ({wishlistCount})
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <span className="bg-green-50 text-green-600 rounded-full p-3">
              <ShoppingCart size={18} />
            </span>
            Cart
            {totalCartItem > 0 && (
              <span className="text-sm text-green-600">
                ({totalCartItem})
              </span>
            )}
          </Link>

        </div>

        {/* Authentication */}
        <div className="p-5 flex flex-col gap-4">
          {/* Authentication Buttons */}
{status === "unauthenticated" && (
  <div className="flex gap-3 px-5 pb-5">
    <Link
      href="/login"
      className="flex-1 flex justify-center items-center
      bg-green-600 text-white font-semibold
      py-3 rounded-2xl hover:bg-green-700 transition"
    >
      Sign In
    </Link>

    <Link
      href="/register"
      className="flex-1 flex justify-center items-center
      bg-transparent text-green-600 font-semibold
      border border-green-600 py-3 rounded-2xl
      hover:bg-green-50 transition"
    >
      Sign Up
    </Link>
  </div>
)}

        

          {/* Support */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">

            <span className="bg-green-100 text-green-600 rounded-full p-3">
              <Headset size={18} />
            </span>

            <div className="text-sm">
              <p className="font-semibold">Need Help?</p>
              <p className="text-green-600">Contact Support</p>
            </div>

          </div>

        </div>

      </aside>

    </header>
  );
};

export default Navbar;



