import Link from "next/link";
import {
  UserRound,
  MapPin,
  Settings,
  ChevronRight,
} from "lucide-react";

import AddressesSection from "../_components/AddressesSection/AddressesSection"

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/*  Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-400">
        <div className="max-w-7xl mx-auto px-5 py-7">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm text-white/80 mb-7">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">
              My Account
            </span>
          </div>

          {/* Header Info */}
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
              <UserRound size={32} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                My Account
              </h1>

              <p className="text-white mt-1">
                Manage your addresses and account settings
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Account Content */}
      <div className="max-w-7xl mx-auto px-5 py-8">

        <div className="grid grid-cols-1 md:grid-cols-[290px_1fr] gap-8">

          {/* Sidebar */}
          <aside className="h-fit bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">
                My Account
              </h2>
            </div>

            <div className="p-2">

              {/* My Addresses */}
              <Link
                href="/profile"
                className="flex items-center justify-between gap-3 p-4 rounded-xl bg-green-50 text-green-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center">
                    <MapPin size={19} className="text-white" />
                  </div>

                  <span className="font-medium">
                    My Addresses
                  </span>
                </div>

                <ChevronRight size={19} />
              </Link>

              {/* Settings */}
              <Link
                href="/settings"
                className="flex items-center justify-between gap-3 p-4 rounded-xl text-gray-600 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Settings size={19} className="text-gray-500" />
                  </div>

                  <span>Settings</span>
                </div>

                <ChevronRight size={19} className="text-gray-400" />
              </Link>

            </div>
          </aside>

         
          <main>
  <AddressesSection />
</main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
