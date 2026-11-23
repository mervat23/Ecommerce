export async function getAllCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const { data } = await response.json();
  return data;
}

export async function getSingleCategory(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  const { data } = await response.json();
  return data;
}
