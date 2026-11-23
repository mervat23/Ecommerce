"use client"

import { useEffect, useState } from "react"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"

const inputClass =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"

const labelClass = "block text-sm text-slate-700 mb-2"
type FormData = { name: string; details: string; phone: string; city: string }

type Props = {
  buttonClassName: string
  buttonLabel?: string
  buttonIcon?: React.ReactNode
  title?: string
  submitLabel?: string
  initial?: FormData
  onSubmit: (form: FormData) => Promise<void>
}

const AddAddressModal = ({
  buttonClassName,
  buttonLabel,
  buttonIcon = <Plus size={20} />,
  title = "Add New Address",
  submitLabel = "Add Address",
  initial,
  onSubmit,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FormData>(
    initial ?? { name: "", details: "", phone: "", city: "" }
  )
 
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])
  useEffect(() => {
  if (open) setForm(initial ?? { name: "", details: "", phone: "", city: "" })
}, [open]) 

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
    
    await onSubmit(form)
      setForm({ name: "", details: "", phone: "", city: "" })
      setOpen(false)
    } catch (error) {
      toast.error("Failed to add address")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
  type="button"
  onClick={() => setOpen(true)}
  className={buttonClassName}
  aria-label={buttonLabel ?? title}
>
  {buttonIcon}
  {buttonLabel}
</button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] max-h-[95vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Address Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Home, Office"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="details" className={labelClass}>
                  Full Address
                </label>
                <textarea
                  id="details"
                  name="details"
                  required
                  rows={4}
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Street, building, apartment..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="01xxxxxxxxx"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Cairo"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-800 font-semibold py-3.5 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3.5 shadow-lg shadow-green-600/20 transition"
                >
                  {loading ? "Saving..." : submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddAddressModal
