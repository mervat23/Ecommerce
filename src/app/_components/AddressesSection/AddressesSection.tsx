"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { MapPin, Trash2, Phone, Building2,Pencil  } from "lucide-react"
import { toast } from "sonner"

import AddAddressModal from "../AddAddressModal/AddAddressModal"
import { addAddress, getAddresses, removeAddress, type Address } from "@/apis/address"

const AddressesSection = () => {
  const { data: session, status } = useSession()
  console.log("SESSION:", session)
  const token = (session as any)?.token ?? (session as any)?.user?.token ?? ""

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== "authenticated") return
    getAddresses(token)
      .then(setAddresses)
      .catch(() => toast.error("Failed to load addresses"))
      .finally(() => setLoading(false))
  }, [status, token])

  async function handleAdd(form: Omit<Address, "_id">) {
    try {
      setAddresses(await addAddress(token, form))
      toast.success("Address added successfully")
    } catch (e) {
      toast.error("Failed to add address")
      throw e 
    }
  }

  async function handleDelete(id: string) {
    try {
      setAddresses(await removeAddress(token, id))
      toast.success("Address deleted")
    } catch {
      toast.error("Failed to delete address")
    }
  }
  async function handleEdit(oldId: string, form: Omit<Address, "_id">) {
  try {
    await addAddress(token, form)                
    setAddresses(await removeAddress(token, oldId)) 
    toast.success("Address updated")
  } catch (e: any) {
    toast.error(e.message || "Failed to update address")
    throw e
  }
}

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your saved delivery addresses</p>
        </div>

        <AddAddressModal
          onSubmit={handleAdd}
          buttonLabel="Add Address"
          buttonClassName="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-green-600/20 transition"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : addresses.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl min-h-[350px] flex items-center justify-center p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <MapPin size={30} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Addresses Yet</h3>
            <p className="text-gray-500 max-w-sm mb-7">
              Add your first delivery address to make checkout faster and easier.
            </p>
            <AddAddressModal
              onSubmit={handleAdd}
              buttonLabel="Add Your First Address"
              buttonClassName="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((a) => (
            <div key={a._id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900">{a.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 break-words">{a.details}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Phone size={14} />{a.phone}</span>
                    <span className="flex items-center gap-2"><Building2 size={14} />{a.city}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
  <AddAddressModal
    title="Edit Address"
    submitLabel="Save Changes"
    buttonIcon={<Pencil size={16} />}
    buttonClassName="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 flex items-center justify-center transition"
    initial={{ name: a.name, details: a.details, phone: a.phone, city: a.city }}
    onSubmit={(form) => handleEdit(a._id, form)}
  />

  <button
    onClick={() => handleDelete(a._id)}
    aria-label="Delete address"
    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-500 text-slate-700 flex items-center justify-center transition"
  >
    <Trash2 size={16} />
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default AddressesSection