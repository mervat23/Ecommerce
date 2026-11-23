export async function getAllProducts() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const { data } = await response.json();
  return data;
}

export async function getSingleProduct(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const { data } = await response.json();
  return data;
}

export async function getProductsByBrand(brandId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch brand products");
  }

  const { data } = await response.json();
  return data;
}

export async function getProductsByCategory(categoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const { data } = await response.json();
  return data;
}
