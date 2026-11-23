export async function getAllBrands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  const { data } = await response.json();
  return data;
}

export async function getSingleBrand(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch brand");
  }

  const { data } = await response.json();
  return data;
}
