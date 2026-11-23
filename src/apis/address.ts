const BASE = "https://ecommerce.routemisr.com/api/v1/addresses"

export type Address = {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

export type AddressForm = Omit<Address, "_id">

export async function getAddresses(token: string): Promise<Address[]> {
  const res = await fetch(BASE, { headers: { token } })
  if (!res.ok) throw new Error("Failed to load addresses")
  const json = await res.json()
  return json.data
}

export async function addAddress(token: string, body: AddressForm): Promise<Address[]> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error("Failed to add address")
  const json = await res.json()
  return json.data
}

export async function removeAddress(token: string, id: string): Promise<Address[]> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE", headers: { token } })
  if (!res.ok) throw new Error("Failed to delete address")
  const json = await res.json()
  return json.data
}