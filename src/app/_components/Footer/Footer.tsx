
import Link from "next/link";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headset,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import logo from "../../../../public/images/logo.svg";
import Image from "next/image";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Contact us anytime",
  },
];

const footerLinks = [
  {
    title: "Shop",
    links: [
      "All Products",
      "Categories",
      "Brands",
      "Electronics",
      "Men's Fashion",
      "Women's Fashion",
    ],
  },
  {
    title: "Account",
    links: [
      "My Account",
      "Order History",
      "Wishlist",
      "Shopping Cart",
      "Sign In",
      "Create Account",
    ],
  },
  {
    title: "Support",
    links: [
      "Contact Us",
      "Help Center",
      "Shipping Info",
      "Returns & Refunds",
      "Track Order",
    ],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto">

      {/* Benefits */}
      <div className="bg-green-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 xl:grid-cols-5">

          {/* Brand */}
          <div>
            <Link href="/"
    className="inline-flex rounded-lg bg-white px-4 py-2 text-2xl font-bold text-slate-800">
        
             <Image
                          src={logo}
                          alt="FreshCart Logo"
                          priority
                          className="w-[155px] h-auto"
                        />
                    </Link>

            <p className="mt-7 leading-6 text-slate-400">
              FreshCart is your one-stop destination for quality products.
              From fashion to electronics, we bring you the best brands
              at competitive prices with a seamless shopping experience.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-3">
                <Phone size={17} className="text-green-500" />
                +1 (800) 123-4567
              </p>

              <p className="flex items-center gap-3">
                <Mail size={17} className="text-green-500" />
                support@freshcart.com
              </p>

              <p className="flex items-center gap-3">
                <MapPin size={17} className="shrink-0 text-green-500" />
                123 Commerce Street, New York, NY 10001
              </p>
            </div>

        <div className="mt-7 flex gap-3">
  {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
    (Icon, index) => (
      <Link
        key={index}
        href="#"
        className="flex size-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-green-600 hover:text-white"
      >
        <Icon size={18} />
      </Link>
    )
  )}
</div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-lg font-semibold">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-400 transition hover:text-green-500"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 FreshCart. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2">
                <CreditCard size={16} /> Visa
              </span>

              <span className="flex items-center gap-2">
                <CreditCard size={16} /> Mastercard
              </span>

              <span className="flex items-center gap-2">
                <CreditCard size={16} /> PayPal
              </span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
